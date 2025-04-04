import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../../component/Navbar/Navbar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "../../quickbiteLogo.png"
import FastfoodIcon from '@mui/icons-material/Fastfood'; // You can replace this with any icon


export const Navbar = () => {
    const {auth, cart}=useSelector(store=>store)
    const navigate=useNavigate();

    const handleAvatarClick=()=>{
        if(auth.user?.role==="ROLE_CUSTOMER"){
            navigate("/my-profile")
        }else{
            navigate("/admin/restaurant")
        }
    }
  return (
    <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#925d5d] lg:px-20 flex justify-between'>
        {/* <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'> */}
        <div className='lg:mr-10 cursor-pointer flex flex-col items-center space-x-4'>
            <div className="flex items-center space-x-2"> 
                {/* Icon before "QuickBite" */}
                <div onClick={() => navigate("/")}>
                    {/* <img src={"quickbiteLogo.png"} alt="Image" width={30} height={30} /> */}
                    <img src={logo} alt="Image" width={30} height={30} />

                </div>
                <li onClick={() => navigate("/")} className='logo font-semibold text-gray-300 text-3xl'>
                    QuickBite
                </li>
            </div>
            <p className='text-gray-100 text-md'>
                Quick Cravings, QuickBite!
            </p>
        </div>

        <div className='flex items-center space-x-2 lg:space-x-10'>
            <div className=''>
                {auth.user? (
                    <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white", color:pink.A400}}>
                        {auth.user?.fullname[0].toUpperCase()}
                    </Avatar>
                    ):( 
                        <IconButton onClick={()=>navigate("/account/login")}>
                            <Person/>
                        </IconButton>
                    )
                }
            </div>
        </div>
    </div>
  )
}
