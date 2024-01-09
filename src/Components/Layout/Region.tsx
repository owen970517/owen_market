import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { regionActions } from "../../store/regionSlice";
import { RootState } from "../../store/store";
import { IData } from "../../type/ItemProps";
import { Regions } from "../../constants/region";

const Region = () => {
    const dispatch = useDispatch()
    const {activeRegion,allProducts} = useSelector((state:RootState)=> state.region);
    useEffect(() => {
        if (activeRegion === '전체') {
            dispatch(regionActions.setFilteredProducts(allProducts));
            return;
        } 
        const filtered = allProducts.filter((region:IData) => region.지역 === activeRegion)
        dispatch(regionActions.setFilteredProducts(filtered));
    },[allProducts, dispatch, activeRegion]);
    const onRegionClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(regionActions.changeRegion(e.currentTarget.innerText))
    }
    return (
        <Wrapper>
            {Regions.map((region) => (
                <button key={region} onClick={onRegionClick}>
                    {region}
                </button>
            ))}
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