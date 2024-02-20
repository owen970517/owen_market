import { createSlice } from "@reduxjs/toolkit";

const initialRegionState:any = {
    activeRegion : '',
    activeDistrict : '',
    nowIndex : 10,
    allProducts : [], 
    filteredProducts : [],
    filteredAllProducts : [],
    currentPos : '',
    region : '',
    district : '',
}

const regionSlice = createSlice({
    name : 'region',
    initialState : initialRegionState,
    reducers : {
        changeRegion(state , action) {
            state.activeRegion = action.payload
        },
        changeDistrict(state,action) {
            state.activeDistrict = action.payload
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
        },
        initializeRegions(state) {
            state.region = ''
            state.district = ''
            state.activeRegion = ''
            state.activeDistrict = ''
        },
        setRegion(state,action) {
            state.region = action.payload
        },
        setDistrict(state,action) {
            state.district = action.payload
        }, 
        setCurrentPos(state,action) {
            state.currentPos = action.payload
        }
    }
})

export const regionActions = regionSlice.actions
export default regionSlice.reducer
