import { api } from "../../config/api"
import { GET_USERS_PAYMENT_FAILURE, GET_USERS_PAYMENT_REQUEST, GET_USERS_PAYMENT_SUCCESS } from "./ActionType"

export const getUserPayment=(jwt)=>{
    return async (dispatch)=>{
        dispatch({type: GET_USERS_PAYMENT_REQUEST})
        try{
            const {data} = await api.get(`/api/payment`, {
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("user payment ", data)
            dispatch({type: GET_USERS_PAYMENT_SUCCESS, payload: data})
        }catch(error){
            console.log("error--", error);
            dispatch({type: GET_USERS_PAYMENT_FAILURE, payload:error})
        }
    }
}