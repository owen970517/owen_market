import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    user: { displayName: string; uid: string } ;
    profileImg: string;
    isLogin: boolean;
    isSignUp: boolean;
    cartItems: any[];
    isSearchBar:boolean;
};

const initialUserState:UserState = {
    user : { 
            displayName: '',
            uid: '' } ,
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
            state.user = {
                displayName : action.payload.displayName,
                uid : action.payload.uid
            }
        },
        logout(state) {
            state.user = { 
                displayName: '',
                uid: '' 
            } 
        },
        setIsLogin(state,action) {
            state.isLogin = action.payload
        },
        searchToggle(state,action) {
            state.isSearchBar = action.payload
        },
        addProfileImg(state,action) {
            state.profileImg = action.payload
        },
        modifyDisplayName(state,action) {
            if (state.user?.displayName) { 
                state.user.displayName = action.payload;
            }
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer