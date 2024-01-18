import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import noImg from '../../ImgSrc/noimage.jpg'
import { Helmet } from "react-helmet-async";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useEffect } from 'react';
import { regionActions } from '../../store/regionSlice';
import useProducts from '../../hooks/useProducts';
import * as S from '../../styles/Products.styled';
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Search = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const { allProducts } = useSelector((state: RootState) => state.region);
  const { filteredProducts, ref } = useProducts();
  const input = params.input;
  useEffect(() => {
    const searchedData = input ? allProducts.filter((item: IData) => item.상품명?.includes(input)) : []
    dispatch(regionActions.setFilteredProducts(searchedData));
    dispatch(regionActions.setFilteredAllProducts(searchedData));
    dispatch(regionActions.resetIndex());
  },[allProducts, dispatch, input])
  return (
    <>
      <Helmet>
        <title>{`${params.input} | 중고사이트`}</title>
      </Helmet>
      <S.Grid>
        {filteredProducts.map((p:IData,idx:number) => {
          return (
            <S.Item key={p.id}>
              <img src={p.이미지 ? p.이미지 : noImg} alt='img' width ='300px' height='300px'/>
              <div ref={idx === filteredProducts.length - 1 ? ref : undefined}>
                <S.StyledLink to={`/detail/${encodeURIComponent(p.id!)}`}><h2>{p.상품명}</h2></S.StyledLink>
                <h3>{dayjs(p.날짜).fromNow()}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </div>
          </S.Item>
          )
        })}
      </S.Grid>
    </>
  )
}

export default Search