import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    user : null,
    profileImg : '',
    isLogin : false, 
    isSignUp : true,
    cartItems : [],
    isSearchBar :false,
}

const userSlice = createSlice({
    name : 'user' ,
    initialState : initialUserState,
    reducers : {
        login(state , action) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null;
        },
        setIsLogin(state,action) {
            state.isLogin = action.payload
        },
        searchToggle(state,action) {
            state.isSearchBar = action.payload
        },
        addProfileImg(state,action) {
            return {
                ...state,
                profileImg : action.payload
            }
        },
        modifyDisplayName(state,action) {
            if (state.user) { // Ensure that 'user' is not null before updating 'displayName'
                state.user = action.payload;
            }
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer