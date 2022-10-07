import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { IData } from "../type/ItemProps";

const initialRegionState:any = {
    activeRegion : '전체',
    data : [], 
    filtered : [],
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
        changeFilteredData(state,action) {
            state.filtered = state.data.filter((region:IData) => 
            region.지역 === action.payload)
        },
        setFilteredData(state,action) {
            state.filteredData = action.payload
        }
    }
})

export const regionActions = regionSlice.actions
export default regionSlice.reducer