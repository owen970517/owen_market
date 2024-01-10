import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useInView } from 'react-intersection-observer';
import { db } from '../firebase';
import { regionActions } from '../store/regionSlice';

const useProducts = () => {
    const dispatch = useDispatch();
    const { filteredProducts, nowIndex, filteredAllProducts } = useSelector((state: RootState) => state.region);
    const [isLoading, setIsLoading] = useState(false);
    const [ref, inView] = useInView({ threshold: 0.5 });
    const fetchProducts = useCallback(() => {
        db.collection('Product')
            .where('상태', '==', '판매중')
            .orderBy('날짜', 'desc')
            .onSnapshot((snapshot) => {
                const itemList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                dispatch(regionActions.setAllProducts(itemList));
            });
    }, [dispatch]);

    const getMoreProduct = useCallback(() => {
        setIsLoading(true);
        dispatch(regionActions.getMoreDataList(filteredAllProducts.slice(nowIndex, nowIndex + 10)))
        dispatch(regionActions.setNowIndex())
        setIsLoading(false);
    }, [filteredAllProducts, dispatch, nowIndex]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (inView && !isLoading && filteredProducts.length < filteredAllProducts.length) {
            getMoreProduct();
        }
    }, [inView, filteredProducts.length, isLoading, filteredAllProducts.length, getMoreProduct]);

    return { filteredProducts, ref, isLoading };
}

export default useProducts