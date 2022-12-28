
export interface LoginState {
    token: string,
    error: string | any,
    logoutModal: boolean,
    user: User
    loading: boolean
}


export interface LoginRequestObject {
    username: string;
    password: string;
}


export interface LoginResponse {
    token: string,
    user: User

}

interface User {
    _id: string,
    role: string,
    username: string

}
