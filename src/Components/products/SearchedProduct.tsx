import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
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
      <Grid>
        {filteredProducts.map((p:IData,idx:number) => {
          return (
            <Item key={p.id}>
            <img src={p.이미지 ? p.이미지 : noImg} alt='img' width ='300px' height='300px'/>
            <div ref={idx === filteredProducts.length - 1 ? ref : undefined}>
              <StyledLink to={`/detail/${encodeURIComponent(p.id!)}`}><h2>{p.상품명}</h2></StyledLink>
              <h3>{dayjs(p.날짜).fromNow()}</h3>
              <h3>{p.지역}</h3>
              <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
            </div>
          </Item>
          )
        })}
      </Grid>
    </>
  )
}
const Grid = styled.div`
  display : grid;
  grid-template-columns : repeat(auto-fit, minmax(20rem,1fr));
  grid-gap : 20px;
  place-items: center;
  padding: 20px;
  background-color: #f8f8f8; 
`;

const Item = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  transition: transform .2s;

  &:hover {
    transform: scale(1.03);
  }

  h3 {
    margin: 10px 0;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color : black;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: #e67e22;
  }
`;
export default Search