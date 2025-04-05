import { Card, IconButton, Chip } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';

export const RestaurantCard = ({item, open}) => {
  
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)

  const handleAddToFavorite=()=>{
    dispatch(addToFavorite({restaurantId:item.id, jwt}))
  }
  const handleNavigateToRestaurant=()=>{
    if(item.open){
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
  }

  return (
    <Card onClick={handleNavigateToRestaurant} className="w-[18rem] shadow-lg rounded-lg">
      <div className={`${true ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[0]}
          alt="Restaurant"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={open ? 'success' : 'error'}
          label={open ? 'Open' : 'Closed'}
        />
      </div>
      <div className='p-4 textPart lg:flex w-full justify-between'>
        <div className='space-y-1'>
          <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>
              {item.name || item.title}
          </p>
          <p className='text-gray-500 text-5m'>
            {item.description}
          </p>

        </div>
        <div>
          {auth.user && <IconButton onClick={handleAddToFavorite}>
            {isPresentInFavorites(auth.favorites, item) ? <FavoriteIcon color='primary'/> : <FavoriteBorderIcon/>}
          </IconButton>}
        </div>

      </div>

    </Card>
  )
}
