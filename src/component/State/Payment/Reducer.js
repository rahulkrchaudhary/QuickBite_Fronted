
import { GET_USERS_PAYMENT_FAILURE, GET_USERS_PAYMENT_REQUEST, GET_USERS_PAYMENT_SUCCESS } from "./ActionType";

const initialState={
    loading: false,
    payment:[],
    error: null
}

export const paymentReducer=(state=initialState, {type, payload})=>{
    switch(type){
        case GET_USERS_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_USERS_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payment: payload
            }
        case GET_USERS_PAYMENT_FAILURE:
            return{
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }

}