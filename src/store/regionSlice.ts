import { createSlice } from "@reduxjs/toolkit";

const initialRegionState:any = {
    activeRegion : '전체',
    nowIndex : 10,
    allProducts : [], 
    filteredProducts : [],
    filteredAllProducts : [],
}

const regionSlice = createSlice({
    name : 'region',
    initialState : initialRegionState,
    reducers : {
        changeRegion(state , action) {
            state.activeRegion = action.payload
        },
        setAllProducts(state ,action) {
            state.allProducts = action.payload
        },
        setFilteredProducts(state,action) {
            state.filteredProducts = action.payload.slice(0,10)
        },
        setFilteredAllProducts(state,action) {
            state.filteredAllProducts = action.payload
        },
        getMoreDataList(state,action) {
            const prevData = state.filteredProducts
            state.filteredProducts = [...prevData,...action.payload]
        },
        setNowIndex(state) {
            state.nowIndex = state.nowIndex+10
        },
        resetIndex(state) {
            state.nowIndex = 10
        }
    }
})

export const regionActions = regionSlice.actions
export default regionSlice.reducer
