import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEventAction } from '../../component/State/Restaurant/Action';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export const EventCard = ({item}) => {
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt")
  const handleDeleteEvent = () => {
    dispatch(deleteEventAction({
      eventId: item.id,
      jwt
    }))
  };
  return (
    <div>
        <Card sx={{width: 345}}>
            <CardMedia 
                sx={{height: 345,
                    '&:hover' : {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.5s ease-in-out'
                    }
                }}
                image={item.image}
            title="green iguana"
            >

            </CardMedia>
            <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.restaurant.name}
          </Typography>
          <div className="py-2 space-y-2">
            {/* <p>{item.location}</p> */}
            <div className='flex flex-row'>
              <LocationOnIcon/>
              <p className='ml-2'>{item.location}</p>
            </div>
            <p className="text-sm text-blue-500">{
                new Date(item?.startedAt).toLocaleString('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              }</p>
            <p className="text-sm text-red-500">{
              new Date(item?.endsAt).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            }</p>
          </div>
        </CardContent>
    {<CardActions>
          <IconButton onClick={handleDeleteEvent} aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>
        </CardActions>}
        </Card>
    </div>
  )
}
