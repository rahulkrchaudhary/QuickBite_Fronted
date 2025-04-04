 import { 
    ADD_TO_FAVORITE_FAILURE, 
    ADD_TO_FAVORITE_REQUEST, 
    ADD_TO_FAVORITE_SUCCESS, 
    DELETE_USER_FAILURE, 
    DELETE_USER_REQUEST, 
    DELETE_USER_SUCCESS, 
    GET_USER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REQUEST_RESET_PASSWORD_FAILURE, 
    REQUEST_RESET_PASSWORD_REQUEST,
    REQUEST_RESET_PASSWORD_SUCCESS
} from "./ActionType";

import { api } from "../../config/api";
import { daDK } from "@mui/x-date-pickers/locales";
import { data } from "react-router-dom";

// REGISTER USER
export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await api.post(`/auth/signup`, reqData.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        // if (data.role === "ROLE_RESTAURANT_OWNER") {
        //     reqData.navigate("/admin/restaurant");
        // } else {
        //     reqData.navigate("/");
        // }
        reqData.navigate("/account/login")
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register success", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.error("Register failure", error);
    }
};

// LOGIN USER
export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await api.post(`/auth/signin`, reqData.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant");
        } else {
            reqData.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login success", data);
    } catch (error) {
        // const errorMessage = error.response?.data?.message || "Invalid email or password"
        const errorMessage = " Invalid email or password. Please check and try again."
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        console.error("Login failure", errorMessage);
    }
};

// GET USER PROFILE
export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("User profile", data);
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.error("User fetch error", error);
    }
};

// ADD TO FAVORITE
export const addToFavorite = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });
    try {
        const { data } = await api.put(
            `/api/restaurants/${restaurantId}/add-favorites`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
        console.log("Added to favorite", data);
    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
        console.error("Error adding to favorite", error);
    }
};

export const resetPasswordRequest=(email) => async (dispatch)=>{
    dispatch({type: REQUEST_RESET_PASSWORD_REQUEST})
    try{
        const {data} = await api.post(`/auth/reset-password-request?email=${email}`, {}) 
        console.log("reset password ", data)
        dispatch({type: REQUEST_RESET_PASSWORD_SUCCESS})

    } catch(error){
        console.log("error", error)
        dispatch({type: REQUEST_RESET_PASSWORD_FAILURE, payload: error.message})
    }
}

export const resetPassword=(reqData)=> async(dispatch)=>{
    dispatch({type: REQUEST_RESET_PASSWORD_REQUEST})
    try{
        const {data} = await api.post(`/auth/reset-password`, reqData.data);
        console.log("reset password", data);
        reqData.navigate("/password-change-success")
        dispatch({type: REQUEST_RESET_PASSWORD_SUCCESS})
    }catch (error){
        console.log("error", error)
        dispatch({type: REQUEST_RESET_PASSWORD_SUCCESS})
    }
}

export const deleteUser = ({ userId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const res = await api.delete(`/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    //   localStorage.removeItem("jwt")
      console.log("user deleted ", res.data);
      dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    } catch (error) {
      console.log("eror", error);
      dispatch({ type: DELETE_USER_FAILURE, payload: error });
    }
  };
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("Logout success");
    } catch (error) {
        console.error("Logout error", error);
    }
};
