import {configureStore} from '@reduxjs/toolkit'
import menuReducer from './slice/menuSlice'
export const store = configureStore({
    reducer:{
       menu : menuReducer,
    }
})

