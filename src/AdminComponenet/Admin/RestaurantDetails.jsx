import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRestaurant, updateRestaurantStatus } from '../../component/State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';

export const RestaurantDetails = () => {

  const dispatch = useDispatch()
  const navigate=useNavigate()

  const {restaurant}=useSelector(store=>store)
  console.log("fetched restaurant",restaurant)

  const handleRestaurantStatus=()=>{
    dispatch(updateRestaurantStatus({
      restaurantId:restaurant.usersRestaurant.id,
      jwt:localStorage.getItem("jwt")
    }))
  }
  const handleDeleteRestaurant = () => {
    dispatch(deleteRestaurant({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: localStorage.getItem("jwt")
    })).then(() => {
      // localStorage.clear("jwt")
      navigate("/");  // Navigate after successful deletion
    }).catch((err) => {
      console.error("Error deleting restaurant:", err);
    });
  };

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gsp-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>{restaurant.usersRestaurant?.name}</h1>
        <div>
          <Button 
            color={!restaurant.usersRestaurant?.open?"primary":"error"} 
            className='py-[1rem] px-[1rem] rounded-lg' 
            variant='contained' 
            onClick={handleRestaurantStatus} 
            size="large"
          >
            {restaurant.usersRestaurant?.open?"Close":"Open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={
              <div className="flex flex-row justify-between items-center">
                <span className="text-gray-300">Restaurant</span>
                <Button onClick={handleDeleteRestaurant} variant='contained' className="ml-10" color='primary'>Delete Restaurant</Button>
                </div>
              // <span className='text-gray-300'>Restaurant</span>
              }
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.owner.fullname}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.open?
                      <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span>
                      :<span className='px-5 py-2 rounded-full bg-red-400 text-gray-50'>Closed</span>
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Address</span>}/>
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Country</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.country}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>PIN Code</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>
                <div className='flex'>
                  {/* <p className='w-48'>Street Address</p> */}
                  <p className='w-48'>Landmark</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Contact Information</span>}/>
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48 flex'>
                    <EmailIcon/>
                    <p className='ml-3'>Email</p>
                  </p>
                  {/* <p className='w-48'>Email </p> */}
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48 flex'>
                    <PhoneIcon/>
                    <p className='ml-3'>Mobile</p>
                  </p>
                  {/* <p className='w-48'>Moblie</p> */}
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.mobile}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Social Media</p>
                  <div className='flex text-gray-400 items-center pb-3 gap-5'>
                    <span className='pr-5'>
                      { restaurant.usersRestaurant?.contactInformation?.instagram && <a className='' href={restaurant.usersRestaurant?.contactInformation?.instagram}>
                        <InstagramIcon sx={{fontSize:"2rem"}} />
                      </a>}
                      {restaurant.usersRestaurant?.contactInformation?.twitter && <a className='ml-3' href={restaurant.usersRestaurant?.contactInformation?.twitter}>
                        <XIcon sx={{fontSize:"2rem"}}/>
                      </a>}
                      {restaurant.usersRestaurant?.contactInformation?.facebook && <a className='ml-3' href={restaurant.usersRestaurant?.contactInformation?.facebook}>
                        <FacebookIcon sx={{fontSize:"2rem"}}/>
                      </a>}
                      {restaurant.usersRestaurant?.contactInformation?.linkedin && <a className='ml-3' href={restaurant.usersRestaurant?.contactInformation?.linkedin}>
                        <LinkedInIcon sx={{fontSize:"2rem"}}/>
                      </a>}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
 