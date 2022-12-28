import {OrderCartState, OrderRequest, OrderResponse, SandwichId} from "./orderInterfaces";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {doPlaceOrder} from "./orderService";
import {logout} from "../login/loginSlice";


export const initialStateOrderCartSlice: OrderCartState = {
    error: "",
    loading: false,
    sandwichIdCountMap: [],
    orderId: ""

}

export const placeOrder = createAsyncThunk(
    'cart/placeOrder',
    async (orderRequest: OrderRequest, { rejectWithValue }) => {
        try {
            const res = await doPlaceOrder(orderRequest);
            console.log(res)
            return res.data as OrderResponse;
        } catch (err) {
            const errors = err as AxiosError;
            if(axios.isAxiosError(errors)){
                return rejectWithValue(errors.message);
            }
            return rejectWithValue("Something went wrong, please contact dev")
        }
    }
)



const orderCartSlice = createSlice({
    name: 'cart',
    initialState: initialStateOrderCartSlice,
    reducers: {
        addToCart: {
            reducer: (state, action: PayloadAction<SandwichId>) => {
                const isPresent = state.sandwichIdCountMap
                    .find(sandwichIdCount => sandwichIdCount.sandwichId === action.payload.sandwichId);
                if (isPresent) {
                    state.sandwichIdCountMap = state.sandwichIdCountMap
                        .map(sandwichIdCount => sandwichIdCount.sandwichId === action.payload.sandwichId ?
                            ({...sandwichIdCount, count: sandwichIdCount.count + 1}) :
                            sandwichIdCount
                        )
                } else {
                    state.sandwichIdCountMap.push({sandwichId: action.payload.sandwichId, count: 1})
                }
            },
            prepare: (sandwichId: string) => {
                return {
                    payload: {
                        sandwichId,
                    },
                }
            }
        },
        removeFromCart: {
            reducer: (state, action: PayloadAction<SandwichId>) => {
                state.sandwichIdCountMap = state.sandwichIdCountMap
                    .filter(sandwichIdCount => sandwichIdCount.sandwichId !== action.payload.sandwichId);
            },
            prepare: (sandwichId: string) => {
                return {
                    payload: {
                        sandwichId,
                    },
                }
            }
        },
        incrementCount: {
            reducer: (state, action: PayloadAction<SandwichId>) => {
                state.sandwichIdCountMap = state.sandwichIdCountMap
                    .map(sandwichIdCount => sandwichIdCount.sandwichId === action.payload.sandwichId ?
                        {...sandwichIdCount, count: sandwichIdCount.count + 1} :
                        sandwichIdCount)
            },
            prepare: (sandwichId: string) => {
                return {
                    payload: {
                        sandwichId,
                    },
                }
            }
        },
        decrementCount: {
            reducer: (state, action: PayloadAction<SandwichId>) => {
                state.sandwichIdCountMap = state.sandwichIdCountMap
                    .map(sandwichIdCount => sandwichIdCount.sandwichId === action.payload.sandwichId ?
                        {...sandwichIdCount, count: sandwichIdCount.count - 1} :
                        sandwichIdCount)

            },
            prepare: (sandwichId: string) => {
                return {
                    payload: {
                        sandwichId,
                    },
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state, action) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.sandwichIdCountMap = [];
                state.orderId = action.payload._id;
                state.error = "";
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(logout, (state, action) => {
                return initialStateOrderCartSlice;
            })

    }

})

export const orderCartReducer = orderCartSlice.reducer;

export const orderCartActions  = orderCartSlice.actions
