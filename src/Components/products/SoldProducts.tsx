import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { db } from '../../firebase'
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import noImg from '../../ImgSrc/noimage.jpg'

const SoldProducts = () => {
  const user = useSelector((state:RootState) => state.user.user)
  const [soldData , setSoldData] = useState<IData[]>([]);
  useEffect(() => {
      if (!user.displayName) return;
  
      const getData = async () => {
        const result = await db.collection('Product')
          .where('상태', '==', '판매완료')
          .where('올린사람', '==', user?.displayName)
          .get();
  
        const sold = result.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setSoldData(sold);
      };
  
      getData();
    }, [user.displayName]);
  return (
    <Grid>
      {soldData.length === 0 && <h1>판매된 상품이 존재하지 않습니다.</h1>}
      {soldData.map((p) =>  {
          return (
            <div key={p.id}>
            <img src={p.이미지 ? p.이미지 : noImg} alt='img' width ='200px' height='200px'/>
            <div>
                <Link to={`/detail/${p.id}`}><h3>{p.상품명}</h3></Link>
                <h3>{p.날짜}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
            </div>
            </div>
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
export default SoldProducts