import { useMemo }from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IData } from '../../type/ItemProps'
import noImg from '../../ImgSrc/noimage.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonUI from '../Layout/SkeletonUI'
import useProducts from '../../hooks/useProducts'

const AllProducts = () => {
  const { filteredData, ref } = useProducts();
  const defaultItems = useMemo(() => Array.from({ length: 10 }, (_, i) => <SkeletonUI key={i} />), []);
  return (
    <>
      <Grid>
        {filteredData.length > 0 
          ? filteredData.map((p: IData, idx: number) => (
            <Item key={p.id}>
              <LazyLoadImage src={p.이미지 ? p.이미지 : noImg} alt='이미지를 불러오지 못했습니다.' width={300} height={300} effect='blur' />
              <div ref={idx === filteredData.length - 1 ? ref : undefined}>
                <StyledLink to={`/detail/${p.id}`}><h3>{p.상품명}</h3></StyledLink>
                <h3>{p.날짜}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </div>
            </Item>))
          : defaultItems}
      </Grid>
    </>
  )
}
const Grid = styled.div`
  display : grid;
  grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
  grid-gap : 10px;
  place-items: center;
`;

const Item = styled.div`
  display : flex;
  flex-direction: column;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color : black;
`
export default AllProducts