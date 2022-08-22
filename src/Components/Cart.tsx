import React, { useEffect ,useState} from 'react'
import { db } from '../firebase';
import styled from 'styled-components';

interface IData {
  id : string;
  uid? : string;
  가격? : string;
  이미지? : string;
  올린사람? : string;
  상품명? : string;
  지역? : string;
  날짜? : string;
  상태? : string;
}

const Cart = () => {
  const [data,setData] = useState<IData[]>([]);
  let sum=0;
  useEffect(()=> {
    db.collection('Cart').get().then((result) => {
        setData(result.docs.map((doc) =>({
            id : doc.id,
            ...doc.data()
        })));  
    })
  },[])
  for(let i =0; i<data.length; i++) {
    sum += parseInt(data[i].가격 as string)
  }
  const onDelete = async (id : string) => {
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