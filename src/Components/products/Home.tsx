import { useEffect } from "react";
import {db } from '../../firebase';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Region from "./Region";
import noImg from '../../ImgSrc/noimage.jpg'
import { IData } from "../../type/ItemProps";
import { useDispatch, useSelector} from 'react-redux'
import { regionActions } from "../../store/regionSlice";
import { RootState } from "../../store/store";
function Home() {
  const dispatch = useDispatch();
  const filteredData = useSelector((state:RootState) =>state.region.filteredData)
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
    <div>
      <Region />
      <Grid>
        {filteredData.map((p:IData) => {
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
    </div>
  );
}

const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(3 , minmax(20rem,1fr));
    grid-gap : 10px;
    place-items: center;
`;

const Item = styled.div`
  display : flex;
`

export default Home;