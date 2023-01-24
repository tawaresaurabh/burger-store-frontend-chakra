import {axiosObject} from "../http-common";
import {Product} from "./productInterfaces";


export const getProducts = () =>{
    return  axiosObject().get("/product");
}


export const addProduct = (product:Product) =>{
    return  axiosObject().post("/product", product);
}


export const deleteProduct = (id:string) =>{
    return  axiosObject().post(`/product/${id}`);
}


export const updateProduct = (product:Product) =>{
    return  axiosObject().put(`/product/${product._id}`, product);
}