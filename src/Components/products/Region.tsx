import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { db } from "../../firebase";
import { regionActions } from "../../store/regionSlice";
import { IData } from "../../type/ItemProps";

function Region({setActiveRegion , activeRegion , setFiltered , data}:any) {
    //  const dispatch = useDispatch()
    //  const nowRegion = useSelector((state:any)=> state.region.activeRegion);
    //   const getData = useSelector((state:any) => state.region.data)
    //   const filtered = useSelector((state:any) => state.region.filtered)
    //   db.collection('Product').where('상태' , '==' , '판매중').get().then((result) => {
    //     const itemList = result.docs.map((doc) =>({
    //       id : doc.id,
    //       ...doc.data()
    //     })) 
    //     dispatch(regionActions.setData(itemList))
    //  })
    // if (nowRegion === '전체') {
    //     dispatch(regionActions.setFilteredData(getData))
    //     return;
    // }
    // dispatch(regionActions.changeFilteredData(nowRegion))
    // dispatch(regionActions.setFilteredData(filtered));
    useEffect(() => {
        if (activeRegion === '전체') {
            setFiltered(data);
            return;
        }
        const filtered = data.filter((region:IData) => 
            region.지역 === activeRegion );
        setFiltered(filtered);

    },[activeRegion, data, setFiltered]);

    return (
        <Wrapper>
            <button onClick={() => setActiveRegion('전체')}>전체</button>
            <button onClick={() => setActiveRegion('강남구')}>강남구</button>
            <button onClick={() => setActiveRegion('강서구')}>강서구</button>
            <button onClick={() => setActiveRegion('구로구')}>구로구</button>
            <button onClick={() => setActiveRegion('마포구')}>마포구</button>

            {/* <button onClick={() => dispatch(regionActions.changeRegion('전체'))}>전체</button>
            <button onClick={() => dispatch(regionActions.changeRegion('강남구'))}>강남구</button>
            <button onClick={() => dispatch(regionActions.changeRegion('강서구'))}>강서구</button>
            <button onClick={() => dispatch(regionActions.changeRegion('구로구'))}>구로구</button>
            <button onClick={() => dispatch(regionActions.changeRegion('마포구'))}>마포구</button> */}
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