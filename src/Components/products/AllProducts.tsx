import * as S from '../../styles/Products.styled';
import SkeletonUI from '../common/SkeletonUI'
import useProducts from '../../hooks/useProducts'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ProductItem from '../common/ProductItem';

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AllProducts = () => {
  const { filteredProducts, isLoading } = useProducts();
  
  return (
    <S.Grid>
      {isLoading ?
        Array.from(new Array(10)).map((_, i) => (
          <SkeletonUI key={i}/>
        )) :
        <ProductItem allData={filteredProducts}/>
      }
    </S.Grid>
  )
}

export default AllProducts