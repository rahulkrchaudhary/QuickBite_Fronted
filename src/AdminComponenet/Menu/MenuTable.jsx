import { Avatar, Backdrop, Box, Button, Card, CardActions, CardHeader, Chip, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { CreateMenuForm } from './CreateMenuForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../component/State/Menu/Action';


export const MenuTable = () => {
  const navigate= useNavigate()
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")

  const {auth, restaurant, ingredients, menu}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
        vegetarian:false,
        seasonal: false,
        nonveg: false,
        foodCategory: ""
    }))
  }, [])

    const handelFoodAvialability=(foodId)=>{
        dispatch(updateMenuItemsAvailability({
            foodId,
            jwt: jwt || auth.jwt
        }))
    }
    const handleDeleteFood=(foodId)=>{
        dispatch(deleteFoodAction({foodId, jwt}))
    }
  return (
    <Box>
        <Card className='mt-4'>
            <CardHeader action={
                <IconButton onClick={()=>navigate("/admin/restaurant/add-menu")} aria-label='settings'>
                    <CreateIcon/>
                </IconButton>
            }
                title={"Menu"}
                sx={{pt:2, alignItems:"center"}}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Ingredients</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Avaibilty</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menu.menuItems?.map((item) => (
                            <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar src={item.images?.[0] || "/placeholder.jpg"} alt={item.name}></Avatar>
                                </TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">
                                    {item.ingredients.map((ingredient)=><Chip label={ingredient.name}></Chip>)}
                                </TableCell>
                                <TableCell align="center">₹ {item.price}</TableCell>
                                {/* <TableCell align="right">{item.available?"in Stock":"Out of Stock"}</TableCell> */}
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button
                                        color={item.available ? "success" : "error"}
                                        variant="text"
                                        onClick={() => handelFoodAvialability(item.id)}
                                    >
                                        {item.available ? "in stock" : "out of stock"}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={()=>handleDeleteFood(item.id)}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={menu.loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
     </Box>
  )
}
