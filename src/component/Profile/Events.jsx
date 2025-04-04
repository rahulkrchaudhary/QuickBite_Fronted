import React, { useEffect } from 'react'
import { EventCard } from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../State/Restaurant/Action'

export const Events = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
 
  const {restaurant,auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getAllEvents({
      jwt: jwt || auth.jwt
    }))
  }, [])

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {restaurant.events.map((item)=><EventCard item={item}/>)}
    </div>
  )
}
