import React, { useEffect, useState } from 'react'
import { AdminSideBar } from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../Dashboard/Dashboard'
import { Orders } from '../Orders/Orders'
import { Menu } from '../Menu/Menu'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { Events } from '../Events/Events'
import { RestaurantDetails } from './RestaurantDetails'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'
import { Navbar } from '../Navbar/Navbar'
import { getIngredientCategory, getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action'
// import { Navbar } from '../../component/Navbar/Navbar'

export const Admin = () => {

    const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const {restaurant}=useSelector(store=>store)
    
    // const handleClose=()=>{
        
    // }

    useEffect(()=>{
        dispatch(getRestaurantsCategory({
            jwt,
            restaurantId: restaurant.usersRestaurant?.id
        }))
        dispatch(fetchRestaurantsOrder({
            jwt,
            restaurantId: restaurant.usersRestaurant?.id
        }))
        dispatch(getIngredientsOfRestaurant({
            jwt, 
            id:restaurant.usersRestaurant?.id
        }))
        dispatch(getIngredientCategory({
            id:restaurant.usersRestaurant?.id,
            jwt
        }))
    }, [])

  return (
    <div>
        {/* <Navbar handleOpenSideBar={handleOpenSideBar}/> */}
        {/* <Navbar/> */}
        <div className='lg:flex justify-between'>
            <div className="sticky h-[80vh] lg:w-[20%]">
                <AdminSideBar handleClose={handleCloseSideBar} open={openSideBar}/>
            </div>
            <div className='lg:w-[80%]'>
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/menu' element={<Menu/>}/>
                    <Route path='/category' element={<FoodCategory/>}/>
                    <Route path='/ingredients' element={<Ingredients/>}/>
                    <Route path='/event' element={<Events/>}/>
                    <Route path='/details' element={<RestaurantDetails/>}/>
                    <Route path='/add-menu' element={<CreateMenuForm/>}/>
                </Routes>
            </div>
        </div>
    </div>
  )
}
