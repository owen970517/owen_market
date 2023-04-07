import { useEffect ,useState} from 'react'
import { db } from '../../firebase';
import styled from 'styled-components';
import { IData } from '../../type/ItemProps';
import { useSelector} from 'react-redux'
import { RootState } from '../../store/store';
import React from 'react';

// data가 업데이트 마다 리렌더링 되는 문제를 고침 
const Cart = React.memo(() => {
  const userObj = useSelector((state:RootState) => state.user.user);
  const [data,setData] = useState<IData[]>([]);
  useEffect(()=> {
    db.collection('Cart').doc(userObj.uid).collection('items').get().then((result) => {
       setData(result.docs.map((doc) =>({
         id : doc.id,
         ...doc.data()
     })));  
    })
  },[userObj.uid])
  const sum = data?.reduce((acc, curr) => acc + parseInt(curr?.가격 as string), 0) || 0;
  const onDelete = async (id : string) => {
    const ok = window.confirm("정말 삭제하시겠습니까??");
    if (ok) {
      await db.collection('Cart').doc(userObj.uid).collection('items').doc(id).delete();
      setData((prevData) => prevData.filter((d) => d.id !== id));
    }
  };
  return (
    <div>
        {data?.map((item) => (
            <div key={item.id}>
                <BgImg src={item.이미지} width='300px' height='300px'></BgImg>
                <p>{item.상품명}</p>
                <p>{item.가격}원</p>
                <button onClick={() => onDelete(item.id as string)}>X</button>
            </div>
        ))}
        <h1>총 {data.length}개</h1>
        <h1>합계 : {sum}원</h1>
    </div>
  )
})

const BgImg = styled.img`
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export default Cart