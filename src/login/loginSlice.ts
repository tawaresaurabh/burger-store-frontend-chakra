import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {LoginRequestObject, LoginResponse, LoginState} from "./loginInterfaces";
import axios, {AxiosError} from "axios";
import {doLoginRequest} from "./loginService";


const ACTIONS = {
    LOGOUT: 'LOGOUT',
    SHOW_LOGOUT_MODAL: 'SHOW_LOGOUT_MODAL',
    HIDE_LOGOUT_MODAL: 'HIDE_LOGOUT_MODAL'
}

export const logout = createAction(ACTIONS.LOGOUT);
export const showLogoutModal = createAction(ACTIONS.SHOW_LOGOUT_MODAL);
export const hideLogoutModal = createAction(ACTIONS.HIDE_LOGOUT_MODAL);



export const initialStateLoginSlice: LoginState = {
    authenticated: false,
    error: "",
    logoutModal: false,
    user:{
        _id : "",
        email: "",
        role: "",
    },
    loading: false,
}


export const doLogin = createAsyncThunk(
    'login/authenticate',
    async (loginObject: LoginRequestObject, { rejectWithValue }) => {
        try {
            const res = await doLoginRequest().post("/auth", {
                email: loginObject.email,
                password: loginObject.password,
            });
            console.log(res)
            return res.data as LoginResponse;
        } catch (err) {
            console.log(err)
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)

export const doLogout = createAsyncThunk(
    'login/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await doLoginRequest().post("/auth/logout");
            console.log(res)
            return res.data as LoginResponse;
        } catch (err) {
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)

export const getAuthState = createAsyncThunk(
    'login/state',
    async (_,{ rejectWithValue }) => {
        try {
            const res = await doLoginRequest().get("/auth");
            console.log(res)
            return res.data as LoginResponse;
        } catch (err) {
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)





export const loginSlice = createSlice({
    name: 'login',
    initialState: initialStateLoginSlice,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthState.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAuthState.fulfilled, (state, action) => {
                state.loading = false;
                state.authenticated = action.payload.authenticated;
                state.user.email = action.payload.user!.email;
                state.user.role = action.payload.user!.role;
                state.user._id = action.payload.user!._id
                state.error = "";
            })
            .addCase(getAuthState.rejected, (state, action) => {
                state.loading = false
                state.authenticated = false
            })
            .addCase(doLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(doLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.authenticated = action.payload.authenticated
                state.user.email = action.payload.user!.email;
                state.user.role = action.payload.user!.role;
                state.user._id = action.payload.user!._id
                state.error = "";
            })
            .addCase(doLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(showLogoutModal, (state, action) => {
                state.logoutModal = true;
            })
            .addCase(hideLogoutModal, (state, action) => {
                state.logoutModal = false;
            })
            .addCase(logout, (state, action) => {
                return initialStateLoginSlice;
            })
    }

})

export const loginReducer = loginSlice.reducer
export const loginActions = loginSlice.actions


