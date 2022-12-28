import {combineReducers} from 'redux';
import {loginReducer} from "../login/loginSlice";
import {sandwichReducer} from "../sandwiches/sandwhichSlice";
import {orderCartReducer} from "../order/orderCartSlice";


export const rootReducer = combineReducers({
    loginState: loginReducer,
    sandwichState: sandwichReducer,
    orderCartState: orderCartReducer
})



