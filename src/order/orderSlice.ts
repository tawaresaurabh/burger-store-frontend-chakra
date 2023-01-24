import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getOrders} from "./orderService";
import {Order, OrdersState} from "./orderInterfaces";
import axios, {AxiosError} from "axios";
import {logout} from "../login/loginSlice";


export const initialStateOrdersSlice: OrdersState = {
    error: "",
    loading: false,
    orders: [],
    userId: "",

}

export const getAllOrders = createAsyncThunk(
    'orders/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getOrders();
            console.log(res)
            return res.data as Order[];
        } catch (err) {
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)


const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialStateOrdersSlice,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = "";
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(logout, (state, action) => {
                return initialStateOrdersSlice;
            })
    }
})

export const ordersReducer = ordersSlice.reducer;

export const ordersActions  = ordersSlice.actions
