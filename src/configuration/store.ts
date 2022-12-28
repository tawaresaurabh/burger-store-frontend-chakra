import {configureStore} from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger';
import {rootReducer} from "./rootReducer";


export const  store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(createLogger()),
    })



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch