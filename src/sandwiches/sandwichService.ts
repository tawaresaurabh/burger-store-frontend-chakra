import {axiosForRequest} from "../http-common";
import {Sandwich} from "./sandwichInterfaces";


export const getSandwiches = (token:string) =>{
    return  axiosForRequest(token).get("/sandwich");
}


export const addNewSandwich = (sandwich:Sandwich,  token:string) =>{
    return  axiosForRequest(token).post("/sandwich", sandwich);
}


export const deleteSandwich = (id:string,  token:string) =>{
    return  axiosForRequest(token).post(`/sandwich/${id}`);
}


export const updateSandwich = (sandwich:Sandwich,  token:string) =>{
    return  axiosForRequest(token).put(`/sandwich/${sandwich._id}`, sandwich);
}