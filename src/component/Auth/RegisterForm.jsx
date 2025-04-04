import { Button, TextField, Typography } from '@mui/material'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Action';

const initialValues={
    fullname:"",
    email:"",
    password:"",
    role:"ROLE_CUSTOMER"
}

const validationSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 8 characters")
      .required("Password is required"),
      role: Yup.string().required("Type is required"),
});

export const RegisterForm = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=(values)=>{
        if (!values.fullname || !values.email || !values.password || !values.role) {
            alert("Please fill in all the required fields before submitting.");
            return;
        }
        // console.log("form values", values)
        dispatch(registerUser({userData: values, navigate}))
    }
  return (
    <div>
        <Typography variant='h5' className='text-center'>
            Register
        </Typography>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {({errors, touched})=>(
            <Form>
                <Field 
                    as={TextField} 
                    name="fullname" 
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="email"
                    error={touched.fullname && Boolean(errors.fullname)}
                    helperText={<ErrorMessage name="fullname" component="div" style={{ color: 'red' }} />}
                />
                <Field 
                    as={TextField} 
                    name="email" 
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" component="div" style={{ color: 'red' }} />}
                />
                <Field 
                    as={TextField} 
                    name="password" 
                    label="Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" component="div" style={{ color: 'red' }} />}
                />
                <FormControl fullWidth margin="normal" error={touched.role && Boolean(errors.role)}>
                    <InputLabel id="role-simple-select-label">Role</InputLabel>
                    <Field
                        as={Select}
                        labelId="role-simple-select-label"
                        id="role-simple-select"
                        name="role"
                        label="Role"
                    >
                        <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                        <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                    </Field>
                    <ErrorMessage name="role" component="div" style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }} />
                </FormControl>

                <Button sx={{mt:2, padding:'1rem'}} fullWidth type='submit' variant='contained'>Register</Button>
            </Form>
            )}
        </Formik>
        <Typography variant='body2' align='center' sx={{mt:3}}>
            If have an account already?
            <Button size='small' onClick={()=>navigate("/account/login")}>
                Login
            </Button>
        </Typography>
    </div>
  )
}
