import React ,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../../store/store'
import { IData } from '../../type/ItemProps'
import noImg from '../../ImgSrc/noimage.jpg'
import { db } from '../../firebase'
import { regionActions } from '../../store/regionSlice'

const AllProducts = () => {
    const filteredData = useSelector((state:RootState) =>state.region.filteredData)
    const dispatch = useDispatch();
    useEffect(() => {
       db.collection('Product').where('상태' , '==' , '판매중').get().then((result) => {
        const itemList = result.docs.map((doc) =>({
          id : doc.id,
          ...doc.data()
        }))
        dispatch(regionActions.setData(itemList));
     })
    },[dispatch]);

  return (
    <Grid>
    {filteredData.map((p:IData) => {
      return (
        <Item key={p.id}>
        <img src={p.이미지 ? p.이미지 : noImg} alt='이미지를 불러오지 못했습니다.' width='200px' height='200px' loading='lazy' decoding='async'/>
        <div>
          <StyledLink to={`/detail/${p.id}`}><h3>{p.상품명}</h3></StyledLink>
          <h3>{p.날짜}</h3>
          <h3>{p.지역}</h3>
          <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
        </div>
      </Item>
      )
    })}
  </Grid>
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