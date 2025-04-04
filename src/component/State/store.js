import { applyMiddleware, combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant Order/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";
import { paymentReducer } from "./Payment/Reducer";

const rootReducer=combineReducers({
    auth:authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer,
    payment: paymentReducer
    
})

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))
