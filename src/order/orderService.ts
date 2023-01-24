import {axiosObject} from "../http-common";
import {Order} from "./orderInterfaces";


export const doPlaceOrder = (order: Order) =>{
     return  axiosObject().post("/order", order);
}

export const getOrders = () =>{
    return   axiosObject().get("/order");
}
