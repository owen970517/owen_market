import React from 'react'
import * as S from '../../styles/Products.styled';
import { IData } from '../../type/ItemProps';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useProducts from '../../hooks/useProducts';
import noImg from '../../assets/noimage.jpg'
import dayjs from 'dayjs';

const ProductItem = ({allData} :{allData:IData[]}) => {
    const { ref } = useProducts();
  return (
    <>
      {
        allData.length > 0 ? allData.map((p,idx) =>  {
          return (
            <S.Item key={p.id}>
              <LazyLoadImage src={p.이미지!.length > 0  ? p.이미지![0] : noImg} alt='이미지를 불러오지 못했습니다.' effect='blur' />
              <S.InfoWrapper ref={idx === allData.length - 1 ? ref : undefined}>
                <S.StyledLink to={`/detail/${encodeURIComponent(p.id!)}`}><h2>{p.상품명}</h2></S.StyledLink>
                <S.ItemInfo>
                  <p>{`${p.지역} ${p.세부지역} · ${dayjs(p.날짜).fromNow()}`}</p>
                </S.ItemInfo>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </S.InfoWrapper>
            </S.Item>
          )
        }) : <h1>상품이 존재하지 않습니다.</h1>
      }
    </>
  )
}

export default ProductItem