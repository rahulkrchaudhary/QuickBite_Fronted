import React, { useEffect } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Margin } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearCartAction } from '../component/State/Cart/Action';

export const PaymentSuccess = () => {

    const navigate=useNavigate()
    // const navigateTohome=navigate("/")
    const dispatch=useDispatch()

    // dispatch(()=>{
    //   dispatch(clearCartAction())
    // })
    useEffect(()=>{
      dispatch(clearCartAction())
    }, [])
  return (
    <div className='min-h-screen px-5'>
        <div className='flex flex-col items-center justify-center h-[90vh]'>
            <Card className='box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                <TaskAltIcon sx={{fontSize:"5rem", color: green[500]}}/>
                <h1 className='py-5 text-2xl font-semibold'>Order Success</h1>
                <p className='py-3 text-center text-gray-400'>Thank You for Trusting Our Platform</p>
                <p className='py-3 text-center text-gray-400'>Sit Back and Relax, Your Order is on the Way</p>
                <Button onClick={()=>navigate("/")} variant="contained" className='py-5' sx={{margin:"1rem 0rem"}}>Go To Home</Button>
            </Card>
        </div>
    </div>
  )
}
