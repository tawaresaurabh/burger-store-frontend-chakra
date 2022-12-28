import  {axiosForLoginRequest} from "../http-common";
import {LoginRequestObject} from "./loginInterfaces";


export const doLoginRequest = (loginObject: LoginRequestObject) =>{
    return  axiosForLoginRequest(loginObject.username, loginObject.password);
}