import { useEffect ,useMemo,useState} from 'react'
import { db } from '../firebase';
import styled from 'styled-components';
import { IData } from '../type/ItemProps';
import { useSelector} from 'react-redux'
import { RootState } from '../store/store';
import noImg from '../ImgSrc/noimage.jpg'

const Cart = () => {
  const userObj = useSelector((state:RootState) => state.user.user);
  const [data,setData] = useState<IData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await db
          .collection('Cart')
          .doc(userObj.uid)
          .collection('items')
          .get();
        setData(
          result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (userObj.uid) {
      fetchData();
    }
  }, [userObj.uid]);
  const sum = useMemo(() => 
    data.reduce((acc, curr) => acc + Number(curr.가격), 0)
  ,[data]);
  const onDelete = async (id : string) => {
    const ok = window.confirm("정말 삭제하시겠습니까??");
    if (ok) {
      await db.collection('Cart').doc(userObj.uid).collection('items').doc(id).delete();
      setData((prevData) => prevData.filter((d) => d.id !== id));
    }
  };
  return (
    <CartContainer>
      {data?.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.이미지 ? item.이미지 : noImg} alt={item.상품명} />
          <ItemInfo>
            <p>{item.상품명}</p>
            <p>{item.가격}원</p>
          </ItemInfo>
          <DeleteButton onClick={() => onDelete(item.id as string)}>X</DeleteButton>
        </CartItem>
      ))}
      <h1>총 {data.length}개</h1>
      <h1>합계 : {sum}원</h1>
    </CartContainer>
  )
}

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
export default Cart