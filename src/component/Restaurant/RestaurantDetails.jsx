// import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { MenuCard } from './MenuCard';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
// import { getMenuItemsByRestaurantId } from '../State/Menu/Action';

// // const categories=[
// //     "pizza",
// //     "biryani",
// //     "burger",
// //     "moms",
// //     "sandwich"
// // ]
// const foodTypes=[
//     {label:"All", value:"all"},
//     {label:"veg", value:"vegetarian"},
//     {label:"Non-veg", value:"non_vegetarian"},
//     {label:"Seasonal", value:"seasonal"}
// ]
// // const menu=[1,1,1,1,1,1]

// export const RestaurantDetails = () => {

//     const navigate =useNavigate()
//     const dispatch=useDispatch()
//     const jwt=localStorage.getItem("jwt")
//     const {auth, restaurant, menu}=useSelector(store=>store)
//     console.log("menu", menu)

//     const [foodType, setFoodType]=useState("all")
//     const {id, city}=useParams()

//     const [selectedCategory, setSelectedCategory]=useState("")



//     const handleFilter=(e)=>{
//         setFoodType(e.target.value)
//         console.log(e.target.value, e.target.name)
//     }

//     const handleFilterCategory=(e, value)=>{
//         setSelectedCategory(value)
//         console.log(e.target.value, e.target.name, value)
//     }
    
//     console.log("particular restaurant---> ",restaurant)
//     useEffect(()=>{
//         dispatch(getRestaurantById({jwt, restaurantId:id}))
//         dispatch(getRestaurantsCategory({jwt, restaurantId:id}))
//     },[])

//     useEffect(()=>{
//         dispatch(getMenuItemsByRestaurantId({
//             jwt, 
//             restaurantId:id, 
//             vegetarian:foodType==="vegetarian", 
//             nonveg: foodType==="Non_vegetarian", 
//             seasonal:foodType==="seasonal", 
//             foodCategory:selectedCategory
//         }))
//     }, [selectedCategory, foodType])
//   return (
//     <div className='px-5 lg:px-20'>
//         <section>
//             <h3 className='text-gray-500 py-2 mt-5'>Home</h3>
//             <div>
//                 <Grid container spacing={2}>
//                     {/* <Grid item xs={12}>
//                         <img 
//                             className='w-50 h-50 object-cover' 
//                             src="https://media.weddingz.in/photologue/images/meghana-foods-indira-nagar-bangalore.jpg" 
//                             alt="" />
//                     </Grid> */}
//                     <Grid item xs={12} lg={6}>
//                         <img 
//                             className='w-full h-[40vh] object-cover' 
//                             // className='aspect-1/3 object-cover ...'
//                             // src="https://images.venuebookingz.com/18104-1515154374-wm-meghana-foods-5.JPG" 
//                             // src='https://www.indian-travel-places.com/wp-content/uploads/2023/10/meghana-foods-bellandur-bangalore.png'
//                             src={restaurant.restaurant?.images[0]}
//                             // src={restaurant.usersRestaurant?.images[0]}
//                             alt="" />
//                     </Grid>
//                     <Grid item xs={12} lg={6}>
//                         <img 
//                             className='w-full h-[40vh] object-cover' 
//                             // className='aspect-1/0 object-cover ...'
//                             // src="https://suruchitra.wordpress.com/wp-content/uploads/2017/10/meghana-foods-jayanagar-bangalore-e1507789998545.jpg" 
//                             src={restaurant.restaurant?.images[1]}
//                             // src={restaurant.usersRestaurant?.images[1]}
//                             alt="" />
//                     </Grid>
//                 </Grid>
//             </div>
//             <div className='pt-3 pb-5'>
//                 <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
//                 <p className='text-gray-500 flex items-center gap-3'>
//                     <span>
//                         {restaurant.restaurant?.description}
//                         {/* {restaurant.usersRestaurant?.description} */}
//                     </span>
//                 </p>
//                 <div className='space-y-3 mt-3'>
//                     <p className='text-gray-500 flex items-center gap-3'>
//                         <LocationOnIcon/>
//                         <span>{restaurant.restaurant?.address.city}</span>
//                     </p>
//                     <p className='text-gray-500 flex items-center gap-3'>
//                         <CalendarTodayIcon/>
//                         {/* <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span> */}
//                         <span>{restaurant.restaurant?.openingHours}</span>
//                     </p>
//                 </div>
//             </div>
//         </section>
//         <Divider/>
//         <section className='pt-[2rem] lg:flex relative'>
//             <div className='space-y-10 lg:w-[20%] filter'>
//                 <div className='box space-y-5 lg:sticky top-28'>
//                     <div>
//                         <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
//                             Food Type
//                         </Typography>
//                         <FormControl className='py-10 space-y-5' component={"fieldset"}>
//                             <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
//                                 {foodTypes.map((item)=> <FormControlLabel key={item.value} value={item.value} control={<Radio/>} label={item.label}/>)}
//                             </RadioGroup>
//                         </FormControl>
//                     </div>
//                     <Divider/>
//                     <div>
//                         <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
//                             Food Category
//                         </Typography>
//                         <FormControl className='py-10 space-y-5' component={"fieldset"}>
//                             <RadioGroup 
//                                 onChange={handleFilterCategory} 
//                                 name='food_category' 
//                                 value={selectedCategory}
//                             >
//                                 {restaurant.categories.map((item)=> 
//                                     <FormControlLabel 
//                                         key={item} 
//                                         value={item.name} 
//                                         // value={item}
//                                         control={<Radio/>} 
//                                         label={item.name}
//                                     />
//                                 )}
//                             </RadioGroup>
//                         </FormControl>
//                     </div>
//                 </div>
//             </div>
//             <div className='space-y-5 lg:w-[80%] lg:pl-10'>
//                 {menu.menuItems.map((item)=><MenuCard item={item}/>)}
//             </div>
//         </section>
//     </div>
//   )
// }

import { 
  Divider, 
  FormControl, 
  FormControlLabel, 
  Grid, 
  Radio, 
  RadioGroup, 
  Typography, 
  Select, 
  MenuItem 
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MenuCard } from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
import { useMediaQuery } from '@mui/material';

// Food Types
const foodTypes = [
  { label: "All", value: "all" },
  { label: "Veg", value: "vegetarian" },
  { label: "Non-Veg", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" }
];

export const RestaurantDetails = () => {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector((store) => store);

  const [foodType, setFoodType] = useState("all");
  const { id, city } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle food type change
  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  // Handle food category change
  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
  }, []);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non_vegetarian",
        seasonal: foodType === "seasonal",
        foodCategory: selectedCategory,
      })
    );
  }, [selectedCategory, foodType]);

  return (
    auth.user ? (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className='text-gray-500 py-2 mt-5'>Home</h3>
        <div>
          <Grid container spacing={2}>
            {restaurant.restaurant?.images[0] && <Grid item xs={12} lg={6}>
              <img 
                  className='w-full h-[40vh] object-cover' 
                  src={restaurant.restaurant?.images[0]}
                  alt="" 
                />
            </Grid>}
            {restaurant.restaurant?.images[1] && <Grid item xs={12} lg={6}>
              <img 
                  className='w-full h-[40vh] object-cover' 
                  src={restaurant.restaurant?.images[1]}
                  alt="" 
                />
            </Grid>}
          </Grid>
        </div>
        <div className='pt-3 pb-5'>
                 <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                 <p className='text-gray-500 flex items-center gap-3'>
                     <span>
                         {restaurant.restaurant?.description}
                     </span>
                 </p>
                 <div className='space-y-3 mt-3'>
                     <p className='text-gray-500 flex items-center gap-3'>
                         <LocationOnIcon/>
                         <span>{restaurant.restaurant?.address.city}</span>
                     </p>
                     <p className='text-gray-500 flex items-center gap-3'>
                         <CalendarTodayIcon/>
                         <span>{restaurant.restaurant?.openingHours}</span>
                     </p>
                 </div>
             </div>
      </section>
      <Divider/>
      <section className="pt-[2rem] lg:flex relative">
        {/* Sidebar */}
        <div className="space-y-10 lg:w-[20%]">
          <div className="box space-y-5 lg:sticky top-28">
            {/* Food Type Filter */}
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>

              {/* Small Screen: Dropdown | Large Screen: RadioGroup */}
              {isSmallScreen ? (
                <FormControl fullWidth>
                  <Select value={foodType} onChange={handleFilter} displayEmpty>
                    {foodTypes.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl component="fieldset">
                  <RadioGroup onChange={handleFilter} value={foodType}>
                    {foodTypes.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </div>

            <Divider />

            {/* Food Category Filter */}
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>

              {/* Small Screen: Dropdown | Large Screen: RadioGroup */}
              {isSmallScreen ? (
                <FormControl fullWidth>
                  <Select
                    value={selectedCategory}
                    onChange={handleFilterCategory}
                    displayEmpty
                  >
                    {restaurant.categories.map((item) => (
                      <MenuItem key={item} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl component="fieldset">
                  <RadioGroup onChange={handleFilterCategory} value={selectedCategory}>
                    {restaurant.categories.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>) :
    (<div className="flex h-[90vh] justify-center items-center">
      <div className="text-center space-y-5">
        {/* <h1>Add Something into Cart</h1> */}
        <LoginIcon sx={{ width: "10rem", height: "10rem" }} />
        <p className="font-bold text-3xl">Please Login to Order</p>
      </div>
    </div>)
    
  );
};

