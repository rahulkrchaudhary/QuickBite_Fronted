import { AddPhotoAlternate, Category, Restaurant } from '@mui/icons-material'
import { Alert, Button, CircularProgress, Grid, IconButton, Snackbar, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
// import { data } from 'react-router-dom';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
// import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../component/State/Menu/Action';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),

  images: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
  vegetarian: Yup.boolean().required("Is Vegetarian is required"),
  seasonal: Yup.boolean().required("Is Gluten Free is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must be greater than or equal to 0"),
});


const initialValues={
  name:"",
  description:"",
  price:0,
  category:"",
  restaurantId:"",
  vegetarian:true,
  seasonal:false,
  ingredients:[],
  images:[]
}

export const CreateMenuForm = () => {

  const navigate = useNavigate()
    const dispatch=useDispatch()
    const {restaurant, ingredients, auth, menu}=useSelector(store=>store)
    const jwt=localStorage.getItem("jwt")

    const [uploadImage, setUploadImage]=useState(false)

    const formik=useFormik({
      initialValues,
      // validationSchema,
      onSubmit:(values, {resetForm})=>{
        // console.log("formik error", formik.errors);
        values.restaurantId = restaurant.usersRestaurant?.id
        console.log("data---> ", values);
        dispatch(createMenuItem({menu:values, jwt}))
        resetForm()
        
      }
      // initialValues
    })

    const handleImageChange= async(e)=>{
       const file=e.target.files[0];
       setUploadImage(true);
       const image= await uploadImageToCloudinary(file);
       console.log("image---> ", image);
       formik.setFieldValue('images', [...formik.values.images, image]);
       setUploadImage(false);
    }

    const handleRemoveImage=(index)=>{
      const uploadedImages=[...formik.values.images];
      uploadedImages.splice(index, 1)
      formik.setFieldValue('images', uploadedImages);
    }

    const handleRemove = (id) => {
      formik.setFieldValue(
          "ingredients",
          formik.values.ingredients.filter((itemId) => itemId !== id) // Remove selected ID
      );
  };

    useEffect(()=>{
      dispatch(getIngredientsOfRestaurant({jwt, id:restaurant.usersRestaurant.id}))
    }, [])

    const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (menu.message || menu.error) setOpenSnackBar(true);
  }, [menu.message,menu.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

    return (
      <>
      <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
        <div className='lg:max-w-4xl'>
          <h1 className='font-bold text-2xl text-center py-2'>Add Menu</h1>
          <form onSubmit={formik.handleSubmit} className='space-y-4 '>
            <Grid container spacing={2}>
              <Grid className='flex flex-wrap gap-5' item xs={12}>
                <input 
                  accept='image/*' 
                  id='fileInput' 
                  style={{display:"none"}}
                  onChange={handleImageChange}
                  type='file' 
                />
                <label className='relative' htmlFor="fileInput">
                  <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                    <AddPhotoAlternateIcon className='text-white'/>
                  </span>
                  {
                    uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                      <CircularProgress/> 
                    </div>
                  }
                </label>
                <div className='flex flex-wrap gap-2'>
                  {
                    formik.values.images.map((image, index)=>
                    <div className='relative'>
                      <img
                        className='w-24 h-24 object-cover'
                        key={index}
                        src={image}
                        alt="" />
                        <IconButton 
                          size='small' 
                          sx={{position:'absolute', 
                                top: 0, 
                                right: 0, 
                                outline: 'none'
                              }} 
                          onClick={()=>handleRemoveImage(index)}
                        >
                          <CloseIcon sx={{fontSize:'1rem'}}/>
                        </IconButton>
                    </div>)
                  }
                </div>
              </Grid>
              <Grid item xs={12}>
                  <TextField fullWidth 
                    id='name' 
                    name='name' 
                    label="Name"
                    variant='outlined'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  >
  
                  </TextField>
              </Grid>
              <Grid item xs={12}>
                  <TextField fullWidth 
                    id='description' 
                    name='description' 
                    label="Description"
                    variant='outlined'
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  >
                  </TextField>
              </Grid>
              <Grid item xs={12} lg={6}>
                  <TextField fullWidth 
                    id='price' 
                    name='price' 
                    label="Price"
                    variant='outlined'
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  >
                  </TextField>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={[...formik.values.category]}
                        value={formik.values.category}
                        label="Category"
                        onChange={formik.handleChange}
                        name='category'
                    >
                        {restaurant.categories?.map((item)=><MenuItem value={item}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        name="ingredients"
                        multiple
                        // value={[...formik.values.ingredients]}
                        value={formik.values.ingredients}
                        onChange={formik.handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip 
                                  key={value.id} 
                                  label={value.name} 
                                  onDelete={()=>handleRemoveImage(value.id)}
                                />
                            ))}
                            </Box>
                        )}
                        // MenuProps={MenuProps}
                    >
                        {ingredients.ingredients?.map((item, index) => (
                            <MenuItem
                                key={item.id}
                                value={item}
                            >
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="vegetarian"
                        value={formik.values.vegetarian}
                        label="Is Vegetarian"
                        onChange={formik.handleChange}
                        name='vegetarian'
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="seasonal"
                        value={formik.values.seasonal}
                        label="Is Seasonal"
                        onChange={formik.handleChange}
                        name='seasonal'
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="flex justify-between items-center mt-4">
              <Button variant='contained' color='primary' onClick={()=>navigate("/admin/restaurant/menu")}>Close</Button>
              <Button className='items-center' variant='contained' color='primary' type='submit'>Create</Button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        sx={{ zIndex: 50 }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        // handleClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      
      >
        <Alert
          severity={menu.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {menu.message || auth.error}
        </Alert>
      </Snackbar>
    </>
  )
}
