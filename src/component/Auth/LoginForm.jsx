import { Alert, Button, TextField, Typography } from '@mui/material'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'

const initialValues={
    email:"",
    password:""
}

const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
});


export const LoginForm = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {error} = useSelector((state)=> state.auth)

    const handleSubmit= async (values)=>{
        if (!values.email.includes("@") || values.password.length < 5) {
            alert("Invalid email or password. Please check and try again.");
            // setSubmitting(false);
            return;
        }
        dispatch(loginUser({userData:values, navigate}))
    }
  return (
    <div>
        <Typography variant='h5' className='text-center'>
            Login
        </Typography>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        {error && typeof error === "string" && <Alert severity="error">{error}</Alert>}
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form>
                <Field 
                    as={TextField} 
                    name="email" 
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    helperText={<ErrorMessage name="email" component="div" style={{ color: "red" }} />}
                    />
                <Field 
                    as={TextField} 
                    name="password" 
                    label="Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    helperText={<ErrorMessage name="password" component="div" style={{ color: "red" }} />}
                    />
                <Button sx={{mt:2, padding:'1rem'}} fullWidth type='submit' variant='contained'>Login</Button>
            </Form>
        </Formik>
        <Typography variant='body2' align='center' sx={{mt:3}}>
            Don't have account?
            <Button size='small' onClick={()=>navigate("/account/register")}>
                register
            </Button>
        </Typography>
    </div>
  )
}
