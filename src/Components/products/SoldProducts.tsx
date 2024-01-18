import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../firebase'
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import noImg from '../../ImgSrc/noimage.jpg'
import * as S from '../../styles/Products.styled';
import SkeletonUI from '../Layout/SkeletonUI';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const SoldProducts = () => {
  const user = useSelector((state:RootState) => state.user.user)
  const [soldData , setSoldData] = useState<IData[]>([]);
  const [isLoading, setIsLoading]= useState(true);

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
        setIsLoading(false);
      };
  
      getData();
    }, [user.displayName]);
  return (
    <S.Grid>
      {isLoading ? 
        Array.from(new Array(10)).map((_, i) => (
          <SkeletonUI key={i}/>
        )) :
        soldData.length > 0 ? soldData.map((p) =>  {
          return (
            <S.Item key={p.id}>
              <LazyLoadImage src={p?.이미지?.length! > 0 ? p.이미지![0] : noImg} alt='이미지를 불러오지 못했습니다.' width={300} height={300} effect='blur' />
              <div>
                <S.StyledLink to={`/detail/${encodeURIComponent(p.id!)}`}><h2>{p.상품명}</h2></S.StyledLink>
                <h3>{dayjs(p.날짜).fromNow()}</h3>
                <h3>{p.지역}</h3>
                <h3>{p.세부지역}</h3>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </div>
            </S.Item>
              )
          }) : <h1>상품이 존재하지 않습니다.</h1>
        }
    </S.Grid> 
  )
}

export default SoldProducts