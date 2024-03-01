import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import { regionActions } from '../../store/regionSlice';
import { userActions } from '../../store/userSlice';

const Latest = ({idx} : {idx:number}) => {
    const dispatch = useDispatch()
    const [prevData, setPrevData] = useState(JSON.parse(localStorage.getItem('latest') || '[]'));
    const {allProducts} = useSelector((state:RootState) => state.region)
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
    const handleClick = (e:React.MouseEvent<HTMLParagraphElement>) => {
        const currentValue = e.currentTarget.innerText
        const now = allProducts.filter((item: IData) => item.상품명?.includes(currentValue));
        dispatch(regionActions.setFilteredProducts(now));
        dispatch(regionActions.setFilteredAllProducts(now));
        dispatch(regionActions.resetIndex());
        dispatch(userActions.searchToggle(false))   
        const updatedData = prevData.filter((data:string) => data !== currentValue);
        updatedData.unshift(currentValue);
        localStorage.setItem('latest', JSON.stringify(updatedData));
    }
  return (
    <LatestContainer>
        {
            prevData.length > 0 ?
            prevData.map((data:string,index:number) => 
                <LatestItem key={index} className={idx === index ? 'selected' : ''}>
                    <p onMouseDown={(e) => handleClick(e)}>{data}</p>
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
    cursor: pointer;
    margin-bottom: 10px;
    :hover {
        background-color: rgba(128, 128, 128, 0.1);
    }
    &.selected {
        background-color: rgba(128, 128, 128, 0.1);
    }
`

const DeleteBtn = styled.button`
    cursor: pointer;
    border: none;
    background: none;
`

export default Latest