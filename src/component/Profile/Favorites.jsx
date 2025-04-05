import React from 'react'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

export const Favorites = () => {
  const {auth}=useSelector(store=>store)
  console.log("auth", auth)
  return (
    <div>
      <h1 className='py-5 text-xl text-center font-semibold'>My Favorites</h1>
      <div className='flex flex-wrap justify-center pt-10 gap-5'>
        {
          auth.favorites.map((item)=><RestaurantCard item={item}/>)
        }
      </div>
    </div>
  )
}
