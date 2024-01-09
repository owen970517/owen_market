import { useMemo }from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IData } from '../../type/ItemProps'
import noImg from '../../ImgSrc/noimage.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonUI from '../Layout/SkeletonUI'
import useProducts from '../../hooks/useProducts'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AllProducts = () => {
  const { filteredProducts, ref } = useProducts();
  const defaultItems = useMemo(() => Array.from({ length: 10 }, (_, i) => <SkeletonUI key={i} />), []);

  return (
    <Grid>
      {filteredProducts.length > 0 
        ? filteredProducts.map((p: IData, idx: number) => {
          return (
            <Item key={p.id}>
              <LazyLoadImage src={p.이미지 ? p.이미지 : noImg} alt='이미지를 불러오지 못했습니다.' width={300} height={300} effect='blur' />
              <div ref={idx === filteredProducts.length - 1 ? ref : undefined}>
                <StyledLink to={`/detail/${p.id}`}><h3>{p.상품명}</h3></StyledLink>
                <h3>{dayjs(p.날짜).fromNow()}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </div>
            </Item>
          )
        })
        : defaultItems}
    </Grid>
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
export default AllProducts