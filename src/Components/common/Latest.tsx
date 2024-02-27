import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Latest = () => {
    const [prevData, setPrevData] = useState(JSON.parse(localStorage.getItem('latest') || '[]'));

    useEffect(() => {
      setPrevData(JSON.parse(localStorage.getItem('latest') || '[]'));
    }, []);
    const deleteItem = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const now = e.currentTarget.value
        const latest = prevData.filter((data:string) => data !== now)
        localStorage.setItem('latest',JSON.stringify(latest))
        setPrevData(latest)
    }
  return (
    <LatestContainer>
        {
            prevData.length > 0 ?
            prevData.map((data:string,index:number) => 
                <LatestItem key={index}>
                    <p>{data}</p>
                    <DeleteBtn onMouseDown={(e) => deleteItem(e)} value={data}>❌</DeleteBtn>
                </LatestItem>
            ) : <h3>최근 검색어 내역이 없습니다.</h3>
        }
    </LatestContainer>
  )
}
const LatestContainer = styled.div`
   padding: 10px;
`

const LatestItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25px;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid #000;
    margin-bottom: 10px;
`

const DeleteBtn = styled.button`
    cursor: pointer;
    border: none;
    background: none;
`

export default Latest