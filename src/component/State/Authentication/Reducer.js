
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REQUEST_RESET_PASSWORD_REQUEST, REQUEST_RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST } from "./ActionType"
import { isPresentInFavorites } from "../../config/logic"
import { stepButtonClasses } from "@mui/material"

const initialState={
    user:null,
    isLoading:false,
    error:null,
    jwt:null,
    favorites:[],
    success:null
}

export const authReducer=(state=initialState, action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case REQUEST_RESET_PASSWORD_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state, 
                isLoading:true, 
                error:null, 
                success:null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                jwt:action.payload,
                success:"Register Success"
            }
        case LOGIN_SUCCESS:
            return {
                ...state, 
                isLoading:false, 
                jwt:action.payload, 
                success: "Login Success,"
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user:action.payload,
                favorites:action.payload.favorites
            }
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                user: null,
                // jwt:null
            }
        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading:false,
                error:null,
                favorite:isPresentInFavorites(state.favorites, action.payload)
                    ?state.favorites.filter((item)=>item.id!==action.payload.id)
                    :[action.payload, ...state.favorites]
            }
        case REQUEST_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload?.message
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
        case DELETE_USER_FAILURE:
        return {
            ...state, 
            isLoading:false, 
            error:action.payload, 
            success:null
        }
        case LOGOUT:
            localStorage.removeItem("jwt")
            return initialState
        default:
            return state;
        
    }
}