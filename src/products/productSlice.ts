import {Product, ProductState} from "./productInterfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {getProducts} from "./productService";
import {logout} from "../login/loginSlice";


export const initialStateProductSlice: ProductState = {
    products: [],
    loading: false,
    error: ""
}



export const getAllProducts = createAsyncThunk(
    'product/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getProducts();
            console.log(res.data)
            return res.data as Product[];
        } catch (err) {
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)



export const productSlice = createSlice({
    name: 'product',
    initialState: initialStateProductSlice,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state, action) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                const productIds = state.products.map(product => product._id);
                const newProducts  =  action.payload.filter(product =>  !productIds.includes(product._id))
                state.products = state.products.concat(newProducts)
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(logout, (state, action) => {
               return initialStateProductSlice;
            })

    }

})

export const productReducer = productSlice.reducer
export const productActions = productSlice.actions

