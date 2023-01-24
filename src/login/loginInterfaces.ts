
export interface LoginState {
    authenticated: boolean,
    error: string | any,
    logoutModal: boolean,
    user: User
    loading: boolean
}



export interface LoginRequestObject {
    email: string;
    password: string;
}


export interface LoginResponse {
    authenticated: boolean,
    user?: User

}

interface User {
    _id: string,
    role: string,
    email: string

}
