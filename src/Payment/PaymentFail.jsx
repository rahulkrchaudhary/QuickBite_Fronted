import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

export const PaymentFail = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-[90vh]'>
            <Card className='box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                <ErrorIcon sx={{fontSize:"5rem", color: red[500]}}/>
                <h1 className='py-5 text-2xl font-semibold'>Order Failed</h1>
                <p className='py-3 text-center text-gray-400'>Payment Failed</p>
                {/* <p className='py-3 text-center text-gray-400'>Sit Back and Relax, Your Order is on the Way</p> */}
                <Button onClick={()=>navigate("/")} variant="contained" className='py-5' sx={{margin:"1rem 0rem"}}>Go To Home</Button>
            </Card>
        </div>
    </div>
  )
}
