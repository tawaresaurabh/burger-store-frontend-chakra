import {axiosForRequest} from "../http-common";
import {OrderRequest} from "./orderInterfaces";


export const doPlaceOrder = (orderRequest: OrderRequest) =>{
     return  axiosForRequest(orderRequest.token).post("/order",orderRequest);
}

export const getOrders = (token:string) =>{
    return  axiosForRequest(token).get("/order");
}
