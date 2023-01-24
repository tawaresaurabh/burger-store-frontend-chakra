import {combineReducers} from 'redux';
import {loginReducer} from "../login/loginSlice";
import {productReducer} from "../products/productSlice";
import {orderCartReducer} from "../order/orderCartSlice";
import {ordersReducer} from "../order/orderSlice";


export const rootReducer = combineReducers({
    loginState: loginReducer,
    productState: productReducer,
    orderCartState: orderCartReducer,
    ordersState: ordersReducer
})



