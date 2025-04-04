import React from 'react'
import { AddressCard } from '../Cart/AddressCard'
import { useSelector } from 'react-redux'

export const Address = () => {

  const {auth}=useSelector(store=>store)

  return (
    <div>
      <h1 className='flex justify-center py-5 text-xl font-semibold'>Address</h1>
      <div className='flex flex-wrap justify-center pt-10 gap-5'>
        { 
          auth.user?.addresses.map((item)=><AddressCard item={item}/>)
        }
      </div>
    </div>
  )
}
