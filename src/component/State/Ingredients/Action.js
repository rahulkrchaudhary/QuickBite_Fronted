import { api } from "../../config/api"
import { CREATE_INGREDIENTS_CATEGORY_FAILURE, CREATE_INGREDIENTS_CATEGORY_REQUEST, CREATE_INGREDIENTS_CATEGORY_SUCCESS, CREATE_INGREDIENTS_FAILURE, CREATE_INGREDIENTS_REQUEST, CREATE_INGREDIENTS_SUCCESS, GET_INGREDIENTS, GET_INGREDIENTS_CATEGORY_FAILURE, GET_INGREDIENTS_CATEGORY_REQUEST, GET_INGREDIENTS_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionType"

export const getIngredientsOfRestaurant=({id, jwt})=>{
    return async (dispatch) =>{
        try{
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("get all ingredients ", response.data)
            dispatch({type: GET_INGREDIENTS, payload: response.data})
        }catch(error){
            console.log("error----", error)
        }
    }
}

export const createIngredient=({data, jwt})=>{
    return async (dispatch) =>{
        dispatch({type:CREATE_INGREDIENTS_REQUEST})
        try{
            const response = await api.post(`/api/admin/ingredients`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("ingredients created ", response.data)
            dispatch({type: CREATE_INGREDIENTS_SUCCESS, payload: response.data})
        }catch(error){

            console.log("error----", error)
            dispatch({type: CREATE_INGREDIENTS_FAILURE, payload:error})
        }
    }
}

export const createIngredientCategory=({data, jwt})=>{
    // console.log("data", data, "jwt", jwt)
    return async (dispatch) =>{
        dispatch({type: CREATE_INGREDIENTS_CATEGORY_REQUEST})
        try{
            const response = await api.post(`/api/admin/ingredients/category`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("ingredients category created ", response.data)
            dispatch({type: CREATE_INGREDIENTS_CATEGORY_SUCCESS, payload: response.data})
        }catch(error){
            console.log("error----", error)
            dispatch({type:CREATE_INGREDIENTS_CATEGORY_FAILURE})
        }
    }
}

export const getIngredientCategory=({id, jwt})=>{
    return async (dispatch) =>{
        dispatch({type: GET_INGREDIENTS_CATEGORY_REQUEST})
        try{
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("get ingredients category ", response.data)
            dispatch({type: GET_INGREDIENTS_CATEGORY_SUCCESS, payload: response.data})
        }catch(error){
            console.log("error----", error)
            dispatch({type: GET_INGREDIENTS_CATEGORY_FAILURE, payload:error})
        }
    }
}

export const updateStockOfIngredient=({id, jwt})=>{
    return async (dispatch) =>{
        try{
            const  {data} = await api.put(`/api/admin/ingredients/${id}/instock`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("ingredients stoke updated ", data)
            dispatch({type: UPDATE_STOCK, payload: data})
        }catch(error){
            console.log("error----", error)
        }
    }
}