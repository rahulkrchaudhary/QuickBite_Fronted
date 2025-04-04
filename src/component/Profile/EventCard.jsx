import React from 'react'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = ({item}) => {
  return (
    <div>
        <Card sx={{width:345}}>
            <CardMedia 
                // image='https://images.pexels.com/photos/5778904/pexels-photo-5778904.jpeg?auto=compress&cs=tinysrgb&w=600'
                image={item.image}
                    sx={{height:345}}
            />
            <CardContent>
                <Typography variant='h5'>
                {item.name}
                </Typography>
                <Typography variant='body2'>
                    {item.restaurant.name}
                </Typography>
                <div className='py-2 space-y-2'>
                    <div className='flex flex-row'>
                        <LocationOnIcon/>
                        <p className='ml-2'>{item.location}</p>
                    </div>
                    <p className='text-sm text-blue-500'>{item?.startedAt}</p>
                    <p className='text-sm text-red-500'>{item?.endsAt}</p>
                </div>
            </CardContent>
            {/* {true && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>} */}
        </Card>
    </div>
  )
}
