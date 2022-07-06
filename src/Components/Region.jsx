import { useEffect } from "react";
import styled from "styled-components"

function Region({setActiveRegion , activeRegion , setFiltered , data}) {
    useEffect(() => {
        if (activeRegion === '전체') {
            setFiltered(data);
            return;
        }
        const filtered = data.filter((region) => 
            region.지역 === activeRegion );
        setFiltered(filtered);
    },[activeRegion , data ,setFiltered]);
    return (
        <Wrapper>
            <button onClick={() => setActiveRegion('전체')}>전체</button>
            <button onClick={() => setActiveRegion('강남구')}>강남구</button>
            <button onClick={() => setActiveRegion('강서구')}>강서구</button>
            <button onClick={() => setActiveRegion('구로구')}>구로구</button>
            <button onClick={() => setActiveRegion('마포구')}>마포구</button>
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