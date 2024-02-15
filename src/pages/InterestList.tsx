import { useEffect ,useState} from 'react'
import { db } from '../firebase';
import styled from 'styled-components';
import { IData } from '../type/ItemProps';
import { useSelector} from 'react-redux'
import { RootState } from '../store/store';
import noImg from '../assets/noimage.jpg'
import Title from '../Components/common/Title';
import { Link } from 'react-router-dom';

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
  const onDelete = async (id : string) => {
    const ok = window.confirm("정말 삭제하시겠습니까??");
    if (ok) {
      await db.collection('Cart').doc(userObj.uid).collection('items').doc(id).delete();
      setData((prevData) => prevData.filter((d) => d.id !== id));
    }
  };

  return (
    <>
      <Title title='장바구니'/>
      <CartContainer>
        { data.length > 0 ? data?.map((item) => (
          <CartItem key={item.id}>
            <ItemImage src={item.이미지 ? item.이미지 : noImg} alt={item.상품명} />
            <ItemInfo>
              <ItemLink to={`/detail/${encodeURIComponent(item.title!)}`}>{item.상품명}</ItemLink>
              <p>{item.가격}원</p>
            </ItemInfo>
            <DeleteButton onClick={() => onDelete(item.id as string)}>X</DeleteButton>
          </CartItem>
        )) : <h1>관심목록이 존재하지 않습니다.</h1>}
      </CartContainer>
    </>
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
  width: 60%;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
`

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