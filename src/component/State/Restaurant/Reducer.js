import * as actionTypes from './ActionType'
const initialState={
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
    search: [],
    message:null
}

const restaurantReducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANT_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_RESTAURANT_CATEGORY_REQUEST:
        case actionTypes.SEARCH_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,
                message: "Restaurant Created Successfully"
            }
        case actionTypes.GET_ALL_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
            }
        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                restaurant: action.payload,
            }
        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading: false,
                usersRestaurant: action.payload,
            }
        case actionTypes.SEARCH_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading: false,
                search:action.payload
            }
        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                message: "Restaurant Deleted Successfully",
                restaurants: state.restaurants.filter(
                    (item)=>item.id!==action.payload
                ),
                // usersRestaurant: state.usersRestaurant.filter(
                //     (item)=>item.id!==action.payload
                // )
                usersRestaurant: Array.isArray(state.usersRestaurant)
            ? state.usersRestaurant.filter((item) => item.id !== action.payload)
            : null // or keep it as an object if needed
            }
        case actionTypes.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: "Event Created Successfully",
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload],
            }
        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return{
                ...state,
                loading:false,
                events: action.payload
            }
        case actionTypes.GET_RESTAURANT_EVENTS_SUCCESS:
            return{
                ...state,
                loading: false,
                restaurantsEvents: action.payload
            }
        case actionTypes.DELETE_EVENTS_SUCCESS:
            return{
                ...state,
                loading: false,
                events: state.events.filter(
                    (items)=>items.id!==action.payload
                ),
                restaurantsEvents: state.restaurantsEvents.filter(
                    (item)=>item.id!==action.payload
                ),
                message: "Event Deleted Successfully"
            }
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
                message: "Food Category Created Successfully"
            }
        case actionTypes.GET_RESTAURANT_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                categories: action.payload
            }
        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANT_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.GET_RESTAURANT_CATEGORY_FAILURE:
        case actionTypes.SEARCH_RESTAURANT_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: "Action Failed"
            }
        default:
            return state;
    }
}
export default restaurantReducer