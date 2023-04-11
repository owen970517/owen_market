import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    user : null,
    profileImg : '',
    isLogin : false, 
    cartItems : []
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
            state.user = null;
            state.isLogin = false;
        },
        addProfileImg(state,action) {
            return {
                ...state,
                profileImg : action.payload
            }
        },
        modifyDisplayName(state,action) {
            return {
                ...state,
                user: action.payload,
            };
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer