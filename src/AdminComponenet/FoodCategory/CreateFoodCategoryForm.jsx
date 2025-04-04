import { Alert, Button, IconButton, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction } from '../../component/State/Restaurant/Action'
import CloseIcon from '@mui/icons-material/Close';


export const CreateFoodCategoryForm = () => {
    const {restaurant, auth}=useSelector((store)=>store)
    const dispatch=useDispatch()

    const [formData, setFormData] = useState({
        categoryName:'', 
        restaurantId:''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const data={
            name:formData.categoryName,
            restaurantId:{
                // id:1
                id: restaurant.usersRestaurant.id
            }
        }
        console.log("form filled category ", data)
        dispatch(createCategoryAction({reqData:data, jwt:localStorage.getItem("jwt")}))
        setFormData({
            categoryName: '',
            restaurantId: ''
        })
        // handleClose()
        console.log('form submitted: ', formData)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,[name]:value
        })
    }
    
  return (
    <>
    <div className=''>
        <div  className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextField fullWidth 
                    id='categoryName' 
                    name='categoryName' 
                    label="Category"
                    variant='outlined'
                    onChange={handleInputChange}
                    value={formData.categoryName}
                    >
                </TextField>
                <Button fullWidth variant='contained' type='submit'>Create</Button>
            </form>
        </div>
    </div>
    </>
  )
}
 