import { Card, Button } from '@mui/material'
import React from 'react'

export const OrderCard = ({item, order}) => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img 
                className='h-16 w-16'
                // src="https://b.zmtcdn.com/data/o2_assets/bf2d0e73add1c206aeeb9fec762438111727708719.png" 
                src={item.food.images[0]}
                alt="" />
            <div className=''>
                <p>{item.food.name}</p>
                <p>₹ {item.totalPrice}</p>
            </div>
        </div>
        <div>
            <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
        </div>
    </Card>
  )
}
