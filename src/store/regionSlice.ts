import { createSlice } from "@reduxjs/toolkit";

const initialRegionState:any = {
    activeRegion : '전체',
    allProducts : [], 
    filteredProducts : [],
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
        getMoreDataList(state,action) {
            const prevData = state.filteredProducts
            state.filteredProducts = [...prevData,...action.payload]
        }
    }
})

export const regionActions = regionSlice.actions
export default regionSlice.reducer
