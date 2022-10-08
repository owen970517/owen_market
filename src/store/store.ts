import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "./regionSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer : {
        user : userSlice,
        region : regionSlice
    }
})

export type RootState = ReturnType<typeof userSlice> | ReturnType<typeof regionSlice>;
