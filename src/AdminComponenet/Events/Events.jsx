import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getRestaurantEvents } from '../../component/State/Restaurant/Action';
import { CreateEvent } from './CreateEvent';
import { EventCard } from './EventCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Events = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {restaurant}=useSelector(store=>store)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    dispatch(getRestaurantEvents({
      restaurantId: restaurant.usersRestaurant?.id,
      jwt: jwt
    }))
  }, [])

  console.log("event wala restaurant", restaurant)
  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>Create New Event</Button>
      </div>
      <div className="mt-5 px-5 flex flex-wrap gap-5">
        {restaurant.restaurantsEvents.map((item) => (
          <EventCard item={item} />
        ))}
        {/* <div>
          <img
          className="rounded-md w-[25rem] h-[25-rem] object-cover"
            src="https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div> */}
      </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateEvent/>
          </Box>
        </Modal>
    </div>
  )
}


