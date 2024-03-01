import React, { useEffect, useState } from 'react'
import { IData } from '../../type/ItemProps'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';

const RelatedProducts = ({searchValue,idx}:{searchValue:string,idx:number}) => {
  const { allProducts } = useSelector((state: RootState) => state.region);
  const [relatedProduct , setRelatedProduct] = useState<IData[]>([])
  useEffect(() => {
    if (searchValue) {
      setRelatedProduct(allProducts.filter((product:IData) => product.상품명?.includes(searchValue)))
    } else {
      setRelatedProduct([])
    }
  },[allProducts, searchValue])
  
  return (
    <>
      { relatedProduct.length > 0 ?
          relatedProduct.map((product ,index) =>          
          <RelatedItem key={index} className={idx === index ? 'selected' : ''}>
            {product.상품명?.split(searchValue).map((char,index) => (
              <React.Fragment key={index}>
                {index > 0 && <span style={{color : 'green'}}>{searchValue}</span>}
                {char}
              </React.Fragment>
            ))}</RelatedItem>  
          )  : <h3>해당 검색어가 존재하지 않습니다.</h3>
      }
    </>
  )
}

const RelatedItem = styled.div`
  margin-left: 20px;
  padding : 10px 0;
  &.selected {
    background-color: rgba(128, 128, 128, 0.1);
  }
`

export default RelatedProducts