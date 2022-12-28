import axios from "axios";
import {Buffer} from 'buffer';

const baseURL = process.env.REACT_APP_BACKEND_URL

export const axiosForLoginRequest = (username:string, password:string) => {
    const credentials  = nodeBtoa(`${username}:${password}`);
    return axios.create({
        baseURL,
        headers: {
            "Content-type": "application/json",
            "Authorization": `Basic ${credentials}`,
        }
    });
}


export const axiosForRequest = (token:string) => {
    return axios.create({
        baseURL: baseURL + "/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
}


const nodeBtoa = (b:string) => Buffer.from(b).toString('base64');
