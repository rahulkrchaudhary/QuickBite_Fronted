import { CREATE_INGREDIENTS_CATEGORY_SUCCESS, CREATE_INGREDIENTS_SUCCESS, GET_INGREDIENTS, GET_INGREDIENTS_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionType"

const initialState={
    ingredients: [],
    update: null,
    category: [],
    message: null
}

export const ingredientReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.payload
            }
        case GET_INGREDIENTS_CATEGORY_SUCCESS:
            return{
                ...state,
                category: action.payload
            }
        case CREATE_INGREDIENTS_CATEGORY_SUCCESS:
            return{
                ...state,
                category: [...state.category, action.payload],
                message: "Ingredient Category Created Successfully"
            }
        case CREATE_INGREDIENTS_SUCCESS:
            return{
                ...state,
                ingredients: [...state.ingredients, action.payload],
                message: "Ingredient Created Successfully"
            }
        case UPDATE_STOCK:
            return{
                ...state,
                update: action.payload,
                ingredients: state.ingredients.map(
                    (item)=>item.id===action.payload.id?action.payload: item
                )
            }
        default:
            return state
    }
}