import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateRestaurantForm } from '../AdminComponenet/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../AdminComponenet/Admin/Admin'
import { useSelector } from 'react-redux'
import { Navbar } from '../AdminComponenet/Navbar/Navbar'

export const AdminRoute = () => {
  const {restaurant} =useSelector(store=>store)
  console.log("restaurant ---->=====", restaurant)
  return (
    <div>
        <Navbar/>
        <Routes>
        {/* <Route path="/*" element={false? <CreateRestaurantForm/> : <Admin/>}></Route> */}
            <Route path="/*" element={!restaurant.usersRestaurant? <CreateRestaurantForm/> : <Admin/>}></Route>
        </Routes>
    </div>
  )
}
