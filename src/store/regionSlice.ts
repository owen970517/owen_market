import { createSlice } from "@reduxjs/toolkit";

const initialRegionState:any = {
    activeRegion : '전체',
    data : [], 
    filteredData : []
}

const regionSlice = createSlice({
    name : 'region',
    initialState : initialRegionState,
    reducers : {
        changeRegion(state , action) {
            state.activeRegion = action.payload
        },
        setData(state ,action) {
            state.data = action.payload
        },
        setFilteredData(state,action) {
            state.filteredData = action.payload
        }
    }
})

export const regionActions = regionSlice.actions
export default regionSlice.reducer
