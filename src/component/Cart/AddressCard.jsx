import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

export const AddressCard = ({item, showButton, handleSelectAddress}) => {
  
  return (
    <Card className="flex-gap-5 w-64 p-5">
        <div className='space-y-3 text-gray-500'>
          <div className='flex'>
            <HomeIcon/>
            <h1 className='font-semibold text-lg text-white ml-2'>Home</h1>
          </div>
            <p>{item.streetAddress}, {item.postalCode}, {item.stateProvince}, {item.country}</p>
            { showButton && 
              (<Button 
                variant='outlined' 
                fullWidth 
                onClick={()=>handleSelectAddress(item)}
              >
                Select
              </Button>)
            }
        </div>
    </Card>
  )
}
