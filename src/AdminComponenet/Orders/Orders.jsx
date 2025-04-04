import { FormControl, Radio, RadioGroup, Typography, Card, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { OrderTable } from './OrderTable'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'


const orderStatus=[
  {label:"All ", value:"all"},
  {label:"Pending", value:"PENDING"},
  {label:"Completed", value:"COMPLETED"},
]
export const Orders = () => {
  // const [filterValue, setFilterValue]=useState()
  // const handleFilter=(e, value)=>{
  //   setFilterValue(value)
  // }
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        orderStatus: filterValue,
        jwt: auth.jwt || jwt,
      })
    );
  }, [auth.jwt, filterValue]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete("order_status");
    } else searchParams.set("order_status", e.target.value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <div  className='px-2'>
      <Card className='p-5'>
        <Typography sx={{padding: "1rem"}} variant='h5'>
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup 
            onChange={handleFilter} 
            row 
            name='category' 
            value={filterValue || "all"}
          >
            {orderStatus.map((item, index)=><FormControlLabel
            // key={item.label}
            key={index}
            value={item.value}
            control={<Radio/>}
            label={item.label}
            sx={{color:'gray'}}
            />)}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable name={"All Orders"}/>
    </div>
  )
}
