import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import noImg from '../../ImgSrc/noimage.jpg'
import { Helmet } from "react-helmet-async";

const Search = () => {
  const params = useParams();
  const data = useSelector((state:RootState) => state.region.data)
  const input = params.input;
  const searchedData = input ? data.filter((item: IData) => item.상품명?.includes(input)) : []
  return (
    <>
      <Helmet>
        <title>{`${params.input} | 중고사이트`}</title>
      </Helmet>
      <Grid>
        {searchedData.map((p:IData) => {
          return (
            <Item key={p.id}>
            <img src={p.이미지 ? p.이미지 : noImg} alt='img' width ='200px' height='200px'/>
            <div>
              <Link to={`/detail/${p.id}`}><h3>{p.상품명}</h3></Link>
              <h3>{p.날짜}</h3>
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
    grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
    grid-gap : 10px;
    place-items: center;
`;

const Item = styled.div`
  display : flex;
`
export default Search