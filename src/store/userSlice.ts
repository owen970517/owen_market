import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    user : '',
    isLogin : false
}

const userSlice = createSlice({
    name : 'user' ,
    initialState : initialUserState,
    reducers : {
        login(state , action) {
            state.user = action.payload
            state.isLogin = true;
        },
        logout(state) {
            state.user = '';
            state.isLogin = false;
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer