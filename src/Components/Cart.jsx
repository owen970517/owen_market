import React, { useEffect ,useState} from 'react'
import { db } from '../firebase';
import styled from 'styled-components';
const Cart = () => {
  const [data,setData] = useState([]);
  useEffect(()=> {
    db.collection('Cart').get().then((result) => {
        setData(result.docs.map((doc) =>({
            id : doc.id,
            ...doc.data()
        })));  
    })
  },[])
  console.log(data);
  return (
    <div >
        {data.map((item) => (
            <div key={item.id}>
                <BgImg style={{backgroundImage: `url(${item.이미지})`}}></BgImg>
                <p>{item.상품명}</p>
                <p>{item.가격}원</p>
            </div>
        ))}
        <h1>합계 </h1>
    </div>
  )
}

const BgImg = styled.div`
    width: 300px;
    height: 300px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export default Cart