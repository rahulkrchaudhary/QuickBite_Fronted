import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { Home } from './component/Home/Home';
import { RestaurantDetails } from './component/Restaurant/RestaurantDetails';
import { CratItem } from './component/Cart/CratItem'
import { Cart } from './component/Cart/Cart';
import { Profile } from './component/Profile/Profile';
import { CustomerRoute } from './Routers/CustomerRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { Routers } from './Routers/Routers';
import { getAllRestaurantAction, getRestaurantByUserId } from './component/State/Restaurant/Action';
import { findCart } from './component/State/Cart/Action';

function App() {
  const dispatch = useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector((store)=>store)

  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))
    // dispatch(getAllRestaurantAction(jwt))
    dispatch(getAllRestaurantAction())
  }, [auth.jwt])

  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt || jwt))
  }, [auth.user])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
    </ThemeProvider>
    
  );
}

export default App;
