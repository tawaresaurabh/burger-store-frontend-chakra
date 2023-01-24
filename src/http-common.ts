import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL

export const axiosObject = () => {
    return axios.create({
        baseURL,
        headers: {
            "Content-type": "application/json",
        },
        withCredentials: true
    });
}