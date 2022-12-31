import {axiosForRequest} from "../http-common";
import {OrderRequest} from "./orderInterfaces";


export const doPlaceOrder = (orderRequest: OrderRequest) =>{
     return  axiosForRequest(orderRequest.token).post("/order",{
         userId: orderRequest.userId,
         sandwichIds: orderRequest.sandwichIds,
         status: orderRequest.status
     });
}

export const getOrders = (token:string) =>{
    return  axiosForRequest(token).get("/order");
}
