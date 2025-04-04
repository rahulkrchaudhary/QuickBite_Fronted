import { Avatar, AvatarGroup, Backdrop, Box, Button, Card, CardHeader, Chip, CircularProgress, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/Restaurant Order/Action';
import { useParams } from 'react-router-dom';

const orderStatus=[
    {label: "Pending", value: "PENDING"},
    {label: "Completed", value: "COMPLETED"},
    {label: "Out For Delivery", value: "OUT_FOR_DELIVERY"},
    {label: "Delivered", value: "DELIVERED"}
]

export const OrderTable = ({isDashBoard, name}) => {

  const dispatch=useDispatch()
  const {restaurant, restaurantOrder, ingredients, menu}=useSelector(store=>store)
  const jwt=localStorage.getItem("jwt")

  const [anchorElArray, setAnchorElArray] = useState([]);
  const { id } = useParams();

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateOrder = (orderId, orderStatus, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus,jwt }));
  };

  useEffect(()=>{
    dispatch(fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id
    }))
  }, [])
  
  return (
     <Box>
        <Card className='mt-4'>
            <CardHeader
                title={name}
                sx={{pt:2, alignItems:"center"}}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Id</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Customer</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Name</TableCell>
                            {/* <TableCell align="right">Ingredients</TableCell> */}
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantOrder.orders.map((item, index) => (
                            <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center' component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="center">
                                    <AvatarGroup>
                                        {item.items.map((orderItem)=><Avatar src={orderItem.food?.images[0]} alt={orderItem.food.name}/>)}
                                    </AvatarGroup>
                                </TableCell>
                                <TableCell align="center">{item.customer.fullname}</TableCell>
                                <TableCell align="center">₹{item.totalAmount}</TableCell>
                                <TableCell align="center">{item.items.map((orderItem)=><p>{orderItem.food?.name}</p>)}</TableCell>
                                {/* <TableCell align="center">{item.items.map((orderItem)=>
                                    <div>
                                        {orderItem.ingredients.map((ingredient)=><Chip label={ingredient}/>)}
                                    </div>
                                )}</TableCell> */}
                                {/* <TableCell align="center">{item.orderStatus}</TableCell> */}
                                <TableCell align='center' className='text-white'>
                                <Chip
                                    sx={{
                                    color: "white !important",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    }}
                                    label={item?.orderStatus}
                                    size="small"
                                    color={
                                    item.orderStatus === "PENDING"
                                        ? "info"
                                        : item?.orderStatus === "DELIVERED"
                                        ? "success"
                                        : "secondary"
                                    }
                                    className="text-white"
                                />
                                </TableCell>
                                
                                <TableCell align='center'>
                                    <div>
                                        <Button
                                            id={`basic-button-${item?.id}`}
                                            aria-controls={`basic-menu-${item.id}`}
                                            aria-haspopup="true"
                                            aria-expanded={Boolean(anchorElArray[index])}
                                            onClick={(event) =>
                                            handleUpdateStatusMenuClick(event, index)
                                            }
                                        >
                                            Status
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${item?.id}`}
                                            anchorEl={anchorElArray[index]}
                                            open={Boolean(anchorElArray[index])}
                                            onClose={() => handleUpdateStatusMenuClose(index)}
                                            MenuListProps={{
                                            "aria-labelledby": `basic-button-${item.id}`,
                                            }}
                                        >
                                            {orderStatus.map((s) => (
                                            <MenuItem
                                                onClick={() =>
                                                handleUpdateOrder(item.id, s.value, index)
                                                }
                                            >
                                                {s.label}
                                            </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </TableCell>
                             </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={restaurantOrder.loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
     </Box>
  )
}
