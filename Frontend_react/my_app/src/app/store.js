import { configureStore } from "@reduxjs/toolkit";
import usnReducer from "./slice/usn";
export const store = configureStore({
    reducer:{
        usn:usnReducer
    }
})