import React, { useEffect ,useState} from 'react'
import { db } from '../firebase';
import styled from 'styled-components';
const Cart = ({len}) => {
  const [data,setData] = useState([]);
  let sum=0;
  useEffect(()=> {
    db.collection('Cart').get().then((result) => {
        setData(result.docs.map((doc) =>({
            id : doc.id,
            ...doc.data()
        })));  
    })
  },[])
  len(data.length);
  for(let i =0; i<data.length; i++) {
    sum += parseInt(data[i].가격)
  }
  const onDelete = async (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까??");
    if (ok) {
      await db.collection('Cart').doc(`${id}`).delete(); // 반영할 글 지정하기 위해서 rweetObj.id 사용
    }
    setData(data.filter((d) => d.id !== id))
  };
  return (
    <div >
        {data.map((item) => (
            <div key={item.id}>
                <BgImg style={{backgroundImage: `url(${item.이미지})`}}></BgImg>
                <p>{item.상품명}</p>
                <p>{item.가격}원</p>
                <button onClick={() => onDelete(item.id)}>X</button>
            </div>
        ))}
        <h1>합계 : {sum}원</h1>
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