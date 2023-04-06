import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IData } from '../../type/ItemProps';
import noImg from '../../ImgSrc/noimage.jpg'
const ProductItem = (product :IData) => {
  console.log(product)
    return (
      <Item>
        <LazyLoadImage src={product.이미지 ? product.이미지 : noImg} alt={'이미지를 불러오지 못했습니다.'} width={300} height={300} effect='blur' />
        <div>
          <StyledLink to={`/detail/${product.id}`}><h3>{product.상품명}</h3></StyledLink>
          <h3>{product.날짜}</h3>
          <h3>{product.지역}</h3>
          <h3>{product.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
        </div>
      </Item>
    );
  };
const Item = styled.div`
  display : flex;
  flex-direction: column;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color : black;
`
export default ProductItem