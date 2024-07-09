import * as S from '../../styles/Products.styled';
import { IData } from '../../type/ItemProps'
import noImg from '../../assets/noimage.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonUI from '../common/SkeletonUI'
import useProducts from '../../hooks/useProducts'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AllProducts = () => {
  const { filteredProducts, ref, isLoading } = useProducts();
  
  return (
    <S.Grid>
      {isLoading ?
        Array.from(new Array(10)).map((_, i) => (
          <SkeletonUI key={i}/>
        )) :
        filteredProducts.length > 0 ? filteredProducts.map((p: IData, idx: number) => {
          return (
            <S.Item key={p.id}>
              <LazyLoadImage src={p.이미지!.length > 0  ? p.이미지![0] : noImg} alt='이미지를 불러오지 못했습니다.' effect='blur' />
              <S.InfoWrapper ref={idx === filteredProducts.length - 1 ? ref : undefined}>
                <S.StyledLink to={`/detail/${encodeURIComponent(p.id!)}`}><h2>{p.상품명}</h2></S.StyledLink>
                <S.ItemInfo>
                  <p>{`${p.지역} ${p.세부지역} · ${dayjs(p.날짜).fromNow()}`}</p>
                </S.ItemInfo>
                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
              </S.InfoWrapper>
            </S.Item>
          );
        }) : <h1>상품이 존재하지 않습니다.</h1>
      }
    </S.Grid>
  )
}

export default AllProducts