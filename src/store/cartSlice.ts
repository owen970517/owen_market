import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems :[] as string[]
}

const cartSlice = createSlice({
    name : 'cart',
    initialState : initialCartState,
    reducers : {
        addItems(state,action) {
            state.cartItems = action.payload
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer