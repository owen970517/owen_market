import React, { useEffect ,useState} from 'react'
import { db } from '../firebase';
import styled from 'styled-components';

interface IData {
  id? : string ;
  uid? : string;
  가격? : string;
  이미지? : string;
  올린사람? : string;
  상품명? : string;
  지역? : string;
  날짜? : string;
  상태? : string;
}
interface IUserObj {
  userObj : {
    displayName:string;
    uid : string;
    email : string
  }
}
const Cart = ({userObj}:IUserObj) => {
  const [data,setData] = useState<IData[]>([]);
  let sum=0;
  console.log(userObj.uid)
  useEffect(()=> {
    db.collection('Cart').doc(userObj.uid).collection('items').get().then((result) => {
       setData(result.docs.map((doc) =>({
         id : doc.id,
         ...doc.data()
     })));  
    })
  },[userObj.uid])
  console.log(data);
  for(let i =0; i<data?.length; i++) {
    sum += parseInt(data[i]?.가격 as string)
  }
  const onDelete = async (id : string) => {
    const ok = window.confirm("정말 삭제하시겠습니까??");
    if (ok) {
      await db.collection('Cart').doc(`${id}`).delete();
    }
    setData(data?.filter((d) => d.id !== id))
  };
  return (
    <div >
        {data?.map((item) => (
            <div key={item.id}>
                <BgImg src={item.이미지} width='300px' height='300px'></BgImg>
                <p>{item.상품명}</p>
                <p>{item.가격}원</p>
                <button onClick={() => onDelete(item.id as string)}>X</button>
            </div>
        ))}
        <h1>합계 : {sum}원</h1>
    </div>
  )
}

const BgImg = styled.img`
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export default Cart