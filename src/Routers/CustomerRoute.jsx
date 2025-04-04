import React from 'react'
import { Navbar } from '../component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../component/Home/Home'
import { RestaurantDetails } from '../component/Restaurant/RestaurantDetails'
import { Cart } from '../component/Cart/Cart'
import { Profile } from '../component/Profile/Profile'
import { Auth } from '../component/Auth/Auth'
import { PaymentSuccess } from '../Payment/PaymentSuccess'
import PasswordChangeSuccess from '../component/Auth/PasswordChangeSuccess'
import Search from '../component/Search/Search'
import { PaymentFail } from '../Payment/PaymentFail'

export const CustomerRoute = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/account/:register' element={<Home/>}/>
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/my-profile/*' element={<Profile/>}/>
        <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
        <Route path='/password-change-success' element={<PasswordChangeSuccess/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/payment/fail/' element={<PaymentFail/>}/>

      </Routes>
      <Auth/>
    </div>
  )
}

