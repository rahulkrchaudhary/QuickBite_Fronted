import React, { useEffect } from 'react'
import './Home.css'
import { MultiItemCarousel } from './MultiItemCarousel'
import { RestaurantCard } from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {getAllEventsHome, getAllRestaurantAction } from '../State/Restaurant/Action'
import { useNavigate } from 'react-router-dom'
import { findCart } from '../State/Cart/Action'
import Footer from '../Footer/Footer'
import { EventCard } from '../Profile/EventCard'
// import { GET_ALL_EVENTS_REQUEST } from '../State/Restaurant/ActionType'

// const restaurants=[1,1,1,1,1,1,1,1]
export const Home = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const jwt=localStorage.getItem("jwt")
    const {restaurant, auth}=useSelector(store=>store)
    // console.log("restaursnt --->", restaurant)
    useEffect(()=>{
        // dispatch(getAllRestaurantAction(auth.jwt || jwt))
        dispatch(getAllRestaurantAction())
        dispatch(getAllEventsHome())        
    },[])
  return (
    <div className=''>
        <section className='banner -z-50 relative flex flex-col justify-center items-center'>
            <div className='w-[50vw] z-10 text-center'>
                {/* <div className="flex items-center justify-center space-x-2 text-center"> 
                    <div onClick={() => navigate("/")}>
                        <img src={"quickbiteLogo.png"} alt="Image" width={30} height={30} />
                    </div>
                    <p className=' text-center text-2xl lg:text-6xl font-bold z-10 py-3'>
                        QuickBite 
                    </p>
                </div> */}
                <p className=' text-center text-2xl lg:text-6xl font-bold z-10 py-3'>
                    QuickBite 
                </p>
                
                <p className='z-10 text-gray-300 text-xl lg:text-4xl text-center'>
                    {/* <span>
                    QuickBite brings your favorite meals right to your doorstep. 
                    From local flavors to international cuisines, 
                    enjoy fresh, hot food delivered swiftly and securely 
                    with just a few taps.
                    // </span> */}
                    <span>
                        Craving something delicious? Find your perfect bite with QuickBite!
                    </span>
                </p>
            </div>

            <div className='cover absolute top-0 left-0 right-0'>

            </div>
            <div className=''>

            </div>

        </section>

        <section className='p-10 lg:py-10 lg:px-20 '>
            <p className='text-2xl font-semibold text-grey-400 py-5 text-center'>Top Meals</p>
            <MultiItemCarousel/>
        </section>
        { restaurant.restaurants.length >0 && (
        <section className='px-5 lg:px-20 pt-5'>
            <h1 className='text-2xl font-semibold text-grey-400 pb-5 text-center mb-5'>Best Restaurant</h1>
            <div className='flex flex-wrap items-center justify-around gap-5'>
                {
                    restaurant.restaurants.map((item)=><RestaurantCard item={item} open={item.open}/>)
                }
            </div>
        </section>)}
        {restaurant.events.length >0 && <section className='px-5 lg:px-20 pt-5'>
            <h1 className='text-2xl font-semibold text-grey-400 pb-5 text-center mb-5'>Events</h1>
            <div className='flex flex-wrap items-center justify-around gap-5'>
                {restaurant.events.map((item)=><EventCard item={item}/>)}
            </div>
        </section>}

        <section>
        <p className='text-2xl font-semibold text-grey-400 py-5 text-center mt-5'>Project Details</p>
            <Footer/>
        </section>
        
    </div>
  )
}
