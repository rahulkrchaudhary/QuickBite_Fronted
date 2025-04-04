import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../component/State/Ingredients/Action';

export const CreateIngredientForm = () => {
    // console.log("onClose", onClose)
    const {restaurant, ingredients}=useSelector(store=>store)

    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")

    const [formData, setFormData] = useState({
        name: '',  
        categoryId:''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        const data={
            ...formData,
            restaurantId:restaurant.usersRestaurant?.id
        }
        console.log(data)
        dispatch(createIngredient({data, jwt}))
        setFormData({
            name: '',
            categoryId: ''
        })
        // console.log(data)
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
  return (
    <div className=''>
        <div  className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextField fullWidth 
                    id='name' 
                    name='name' 
                    label="Name"
                    variant='outlined'
                    onChange={handleInputChange}
                    value={formData.name}
                    >
                </TextField>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.categoryId}
                        label="Category"
                        onChange={handleInputChange}
                        name='categoryId'
                    >
                        { ingredients.category.map((item)=>
                            <MenuItem value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button fullWidth variant='contained' type='submit'>Create Ingredient</Button>
            </form>
        </div>
    </div>
  )
}
