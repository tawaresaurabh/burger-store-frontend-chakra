import {Sandwich, SandwichState} from "./sandwichInterfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {getSandwiches} from "./sandwichService";
import {logout} from "../login/loginSlice";


export const initialStateSandwichSlice: SandwichState = {
    sandwiches: [],
    loading: false,
    error: ""
}



export const getAllSandwiches = createAsyncThunk(
    'sandwich/getAll',
    async (token: string, { rejectWithValue }) => {
        try {
            const res = await getSandwiches(token);
            console.log(res.data)
            return res.data as Sandwich[];
        } catch (err) {
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)



export const sandwichSlice = createSlice({
    name: 'sandwich',
    initialState: initialStateSandwichSlice,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSandwiches.pending, (state, action) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllSandwiches.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                const sandwichIds = state.sandwiches.map(sandwich => sandwich._id);
                const newSandwiches  =  action.payload.filter(sandwich =>  !sandwichIds.includes(sandwich._id))
                state.sandwiches = state.sandwiches.concat(newSandwiches)
            })
            .addCase(getAllSandwiches.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(logout, (state, action) => {
               return initialStateSandwichSlice;
            })

    }

})

export const sandwichReducer = sandwichSlice.reducer
export const sandwichActions = sandwichSlice.actions

