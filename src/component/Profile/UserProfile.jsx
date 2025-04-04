import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, logout } from '../State/Authentication/Action';

export const UserProfile = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {auth}=useSelector(store=>store)
  const jwt=localStorage.getItem("jwt")
  
  const handleLogout=()=>{
    dispatch(logout())
    navigate("/")
  }
  const handledelete=()=>{
    // dispatch(logout())
    dispatch(deleteUser({
      userId: auth.user?.id,
      jwt: jwt || auth.jwt
    }))
    navigate("/")
  }

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col justify-center items-center'>
        <AccountCircleIcon sx={{fontSize:"9rem"}}/>
        <h1 className='py-5 text-2xl font-semibold'>{auth.user?.fullname}</h1>
        <p>Email: {auth.user?.email}</p>
        <Button variant='contained' onClick={handleLogout} sx={{margin:"2rem 0rem"}}>Log out</Button>
        {/* <Button variant='contained' onClick={handledelete} sx={{margin:"2rem 0rem"}}>Delete Account</Button> */}
      </div>
    </div>
  )
}
