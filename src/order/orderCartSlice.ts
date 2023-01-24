import {Order, OrderCartState, ProductId} from "./orderInterfaces";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {doPlaceOrder} from "./orderService";
import {logout} from "../login/loginSlice";


export const initialStateOrderCartSlice: OrderCartState = {
    error: "",
    loading: false,
    orderItems: [],
    orderId: ""

}

export const placeOrder = createAsyncThunk(
    'cart/placeOrder',
    async (order: Order, { rejectWithValue }) => {
        try {
            const res = await doPlaceOrder(order);
            console.log(res)
            return res.data as Order;
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
            reducer: (state, action: PayloadAction<ProductId>) => {
                const isPresent = state.orderItems
                    .find(orderItem => orderItem.productId === action.payload.productId);
                if (isPresent) {
                    state.orderItems = state.orderItems
                        .map(orderItem => orderItem.productId === action.payload.productId ?
                            ({...orderItem, count: orderItem.count + 1}) :
                            orderItem
                        )
                } else {
                    state.orderItems.push({productId: action.payload.productId, count: 1})
                }
            },
            prepare: (productId: string) => {
                return {
                    payload: {
                        productId,
                    },
                }
            }
        },
        removeFromCart: {
            reducer: (state, action: PayloadAction<ProductId>) => {
                state.orderItems = state.orderItems
                    .filter(orderItem => orderItem.productId !== action.payload.productId);
            },
            prepare: (productId: string) => {
                return {
                    payload: {
                        productId,
                    },
                }
            }
        },
        incrementCount: {
            reducer: (state, action: PayloadAction<ProductId>) => {
                state.orderItems = state.orderItems
                    .map(orderItem => orderItem.productId === action.payload.productId ?
                        {...orderItem, count: orderItem.count + 1} :
                        orderItem)
            },
            prepare: (productId: string) => {
                return {
                    payload: {
                        productId,
                    },
                }
            }
        },
        decrementCount: {
            reducer: (state, action: PayloadAction<ProductId>) => {
                state.orderItems = state.orderItems
                    .map(orderItem => orderItem.productId === action.payload.productId ?
                        {...orderItem, count: orderItem.count - 1} :
                        orderItem)

            },
            prepare: (productId: string) => {
                return {
                    payload: {
                        productId,
                    },
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = [];
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
