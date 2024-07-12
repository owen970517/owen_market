import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../firebase'
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import * as S from '../../styles/Products.styled';
import SkeletonUI from '../common/SkeletonUI';
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ProductItem from '../common/ProductItem';

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
        <ProductItem allData={soldData}/>
      }
    </S.Grid> 
  )
}

export default SoldProducts