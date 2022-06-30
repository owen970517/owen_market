import { useEffect, useState } from "react";
import {db } from '../firebase';
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home({userObj}) {
  const [data , setData] = useState([]);
  useEffect(() => {
    db.collection('Product').onSnapshot((snapshot)=> {
      const array = snapshot.docs.map((doc) =>({
        id : doc.id,
        ...doc.data(),
      }));
      setData(array);
      console.log(array);
    })
  },[db]);
  return (
    <Grid>
      {data.map((p) => {
        return (
          <Item key={p.id}>
            <img src={p.이미지 ? p.이미지 : 'https://via.placeholder.com/350'} alt='img' width ='200px' height='200px'/>
            <div>
              <Link to={`/detail/${p.id}`}><h3>{p.상품명}</h3></Link>
              <h3>{p.날짜}</h3>
              <h3>{p.가격.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
            </div>
          </Item>
        )
      })}
    </Grid>
  );
}

const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
    grid-gap : 10px;
`;

const Item = styled.div`
  display : flex;
`

export default Home;