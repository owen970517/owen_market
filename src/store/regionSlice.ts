import { createSlice } from "@reduxjs/toolkit";

const initialRegionState:any = {
    activeRegion : '전체',
    data : [], 
    filteredData : [],
    wholeData : [],
    index : 0,
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
            state.filteredData = action.payload.slice(0,10)
            state.wholeData = action.payload
        },
        getMoreDataList(state,action) {
            const prevData = state.filteredData
            state.filteredData = [...prevData,...action.payload]
        }
    }
})

export const regionActions = regionSlice.actions
export default regionSlice.reducer
