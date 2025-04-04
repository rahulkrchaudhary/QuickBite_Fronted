import { Divider, Button, Card, Modal, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CratItem } from './CratItem'
import { AddressCard } from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Box from '@mui/material/Box';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@mui/icons-material';
import { createOrder } from '../State/Order/Action';
import { clearCartAction, findCart } from '../State/Cart/Action';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import * as Yup from 'yup';



export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
  };


const initialValues={
    streetAddress:"",
    state:"",
    pincode:"",
    city:""
}

const validationSchema=Yup.object().shape({
    streetAddress:Yup.string().required("Street Address is required"),
    state:Yup.string().required("State is required"),
    // pincode:Yup.number().required("pincode is required"),
    pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
    city:Yup.string().required("City is required")
})
  
// const items=[1,1]

export const Cart = () => {
    
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpenAddressModal=()=>setOpen(true)

    const {auth, cart}=useSelector(store=>store)
    console.log("auth", auth)
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")

    useEffect(()=>{
        dispatch(findCart(jwt))
    }, [])

    const [shippingAddress, setShippingAddress] = useState({
        id: null,
        fullname: auth.user?.fullname,
        streetAddress: "",
        city: "",
        stateProvince: "",
        postalCode: "",
        country: "India"
    });

    const handleSubmit=(values)=>{
        const newAddress = {
            id: null,
            fullname: auth.user?.fullname,
            streetAddress: values.streetAddress,
            city: values.city,
            stateProvince: values.state,
            postalCode: values.pincode,
            country: "India"
        };

        setShippingAddress(newAddress); // Update state with new address
        setOpen(false); // Close modal
    }

    const createOrderUsingSelectedAddress=(item)=>{
        const newAddress = {
            id:item.id,
            fullname: auth.user?.fullname,
            streetAddress: item.streetAddress,
            city: item.city,
            stateProvince: item.stateProvince,
            postalCode: item.postalCode,
            country: "India"
        };
        setShippingAddress(item);
    }

    const cartTotal=(items)=>{

        return items.reduce((accumlatore, item)=>item.totalPrice+accumlatore,0)
    }

    const placeOrder=()=>{
        if (!shippingAddress.streetAddress || !shippingAddress.city || !shippingAddress.stateProvince || !shippingAddress.postalCode) {
            alert("Please add or select a delivery address before placing the order.");
            return;
        }
        const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cartItems[0]?.food?.restaurant.id,
                deliveryAddress: shippingAddress
            }
        };
        dispatch(createOrder(data));
    }

    const clearCart=()=>{
        dispatch(clearCartAction())
    }

  return (
    <>
    {cart.cartItems.length>0 ? (
        <main className='lg:flex justify-between'>
            <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                {cart.cartItems?.map((item)=><CratItem item={item}/>)}
                <Button onClick={clearCart} color='primary' fullWidth className='mt-5' variant='contained'>
                        Clear Cart
                    </Button>
                <Divider/>
                <div className='billDetails px-5 text-5m'>
                    <p className='font-extralight py-5'>Bill Details</p>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-gray-400'>
                            <p>Item Total</p>
                            <p>₹ {cartTotal(cart.cartItems)}</p>
                            {/* <p>₹{cart.cart?.total}</p> */}
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Delivery Fee</p>
                            <p>₹ 21</p>
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Platform Fee</p>
                            <p>₹ 5</p>
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Gst & Restaurant Charges</p>
                            <p>₹ 33</p>
                        </div>
                        <Divider/>
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p>Total Bill</p>
                        <p>₹ {cartTotal(cart.cartItems)+33+5+21}</p>
                    </div>
                    
                </div>
                <div>
                    <Button onClick={placeOrder} color='primary' fullWidth className='mt-5' variant='contained'>
                        Click to Pay
                    </Button>
                </div>
            </section>
            <Divider orientation='vertical' flexItem/>
            <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                <div>
                    <h1 className="text-center font-semibold text-2xl py-10">
                        Choose Delivery Address
                    </h1>
                    <div className='flex gap-5 flex-wrap justify-center'>
                        {auth.user?.addresses.map((item)=>(
                            <AddressCard 
                                handleSelectAddress={()=>createOrderUsingSelectedAddress(item)} 
                                item={item} 
                                showButton={true}
                            />
                        ))}
                        
                        <Card className="flex gap-5 w-64 p-5">
                            <AddLocationAltIcon/>
                            <div className='space -y-3 text-gray-500'>
                                <h1 className=' mb-3 font-semibold text-lg text-white'>Add New Address</h1>
                                <Button variant='outlined' fullWidth onClick={handleOpenAddressModal}>Add</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    ):(
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            {/* <h1>Add Something into Cart</h1> */}
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
    )}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <h1 className='font-semibold text-lg items-center '>Add New Address</h1>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                        error={touched.streetAddress && !!errors.streetAddress}
                                        helperText={touched.streetAddress && errors.streetAddress}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                        error={touched.state && !!errors.state}
                                        helperText={touched.state && errors.state}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        error={touched.city && !!errors.city}
                                        helperText={touched.city && errors.city}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="pincode"
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                        error={touched.pincode && !!errors.pincode}
                                        helperText={touched.pincode && errors.pincode}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type='submit' color='primary'>
                                        Add Address
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

            </Box>
        </Modal>
    </>
  )
}
