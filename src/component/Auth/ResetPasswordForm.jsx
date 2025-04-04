import { Password } from '@mui/icons-material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../State/Authentication/Action'
import { Alert, Button, TextField } from '@mui/material';


const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirmed password is required"),
  });


export const ResetPasswordForm = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const token=searchParams.get("token")

    const initialValues={
        password:"",
        confirmedPassword:""
    }

    const handleSubmit=(values, {setSubmitting})=>{
        console.log(values);
        if(values.password===values.confirmedPassword){
            console.log("password Match")
        }else{
            console.log("Password not matched");
            alert("Password not matched. Please check and try again.");
            return;
        }
        const data={
            password: values.password,
            token
        }
        dispatch(resetPassword({navigate, data}))
        setSubmitting(false);
    }
  return (
    <div>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <Form className='space-y-5'>
            {/* {errors.general && <Alert severity="error">{errors.general}</Alert>} */}
                <div className='space-y-5'>
                    <div>
                        <Field
                            as={TextField}
                            name="password"
                            placeholder="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                        <ErrorMessage
                            name='password'
                            component="div"
                            className='text-red-500'
                        />
                    </div>
                    <div>
                    <Field
                        as={TextField}
                        name="confirmedPassword"
                        placeholder="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                    <ErrorMessage
                        name='confirmedPassword'
                        component="div"
                        className='text-red-500'
                    />
                    </div>
                </div>
                <Button
                    sx={{ padding: ".8rem 0rem" }}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Reset Password
                </Button>
            </Form>

        </Formik>
    </div>
  )
}
