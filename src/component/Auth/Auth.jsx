import { Alert, Box, Button, Modal, Snackbar, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { style } from '../Cart/Cart';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { ResetPasswordRequest } from './ResetPasswordRequest';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useSelector } from 'react-redux';



export const Auth = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const {auth}= useSelector(store=>store)

    const [openSnackBar,setOpenSnackBar]=useState(false);
    useEffect(()=>{
        if(auth.success || auth.error){ 
            setOpenSnackBar(true)
        }
    },[])
    // auth.success, auth.error
    const handleCloseSnackBar=()=>{
        setOpenSnackBar(false)
    }

    const handleOnClose=()=>{
        navigate("/")
    }
  return (
    <>
        <Modal 
            onClose={handleOnClose} 
            open={
                location.pathname==="/account/register"||
                location.pathname==="/account/login" ||
                location.pathname==="/account/reset-password" ||
                location.pathname==="/account/reset-password-request"
            }
        >
            <Box sx={style}>
                {/* {location.pathname==="/account/register" ? <RegisterForm/>:<LoginForm/>} */}
                {location.pathname === "/account/register" ? (
                <RegisterForm />
                ) : location.pathname === "/account/login" ? (
                <LoginForm />
                ) : location.pathname === "/account/reset-password" ? <ResetPasswordForm/>: (
                <ResetPasswordRequest />
                )}
                <div className='flex justify-center mt-5'>
                    {location.pathname==="/account/reset-password-request" || location.pathname==="/account/reset-password" ? (
                        <Button onClick={()=>navigate("/account/login")}>
                            Go Back To Login
                        </Button>
                    ):(
                        <Button onClick={()=>navigate("/account/reset-password-request")}>
                            Forgot Password
                        </Button>
                    )}
                    <Snackbar
                        sx={{ zIndex: 50 }}
                        open={openSnackBar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackBar}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <Alert severity={auth.error?"Error":"Success"} sx={{ width: "100%" }}>
                            {auth.success?.message || auth.error?.message}
                        </Alert>
                    </Snackbar>
                </div>
            </Box>

        </Modal>
    </>
  )
}
