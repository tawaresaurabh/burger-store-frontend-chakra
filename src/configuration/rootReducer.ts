import {combineReducers} from 'redux';
import {loginReducer} from "../login/loginSlice";
import {sandwichReducer} from "../sandwiches/sandwhichSlice";
import {orderCartReducer} from "../order/orderCartSlice";
import {ordersReducer} from "../order/orderSlice";


export const rootReducer = combineReducers({
    loginState: loginReducer,
    sandwichState: sandwichReducer,
    orderCartState: orderCartReducer,
    ordersState: ordersReducer
})



