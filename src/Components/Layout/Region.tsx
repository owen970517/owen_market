import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { regionActions } from "../../store/regionSlice";
import { RootState } from "../../store/store";
import { IData } from "../../type/ItemProps";

function Region() {
    const dispatch = useDispatch()
    const nowRegion = useSelector((state:RootState)=> state.region.activeRegion);
    const data = useSelector((state:RootState) => state.region.data)
    useEffect(() => {
        if (nowRegion === '전체') {
            dispatch(regionActions.setFilteredData(data));
            return;
        } 
        const filtered = data.filter((region:IData) => region.지역 === nowRegion)
        dispatch(regionActions.setFilteredData(filtered));
    },[data, dispatch, nowRegion]);
    const onRegionClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(regionActions.changeRegion(e.currentTarget.innerText))
    }
    return (
        <Wrapper>
            <button onClick={onRegionClick}>전체</button>
            <button onClick={onRegionClick}>강남구</button>
            <button onClick={onRegionClick}>강서구</button>
            <button onClick={onRegionClick}>구로구</button>
            <button onClick={onRegionClick}>마포구</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
`

export default Region