import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useInView } from 'react-intersection-observer';
import { db } from '../firebase';
import { regionActions } from '../store/regionSlice';

const useProducts = () => {
    const dispatch = useDispatch();
    const { filteredProducts, allProducts } = useSelector((state: RootState) => state.region);
    const [isLoading, setIsLoading] = useState(false);
    const [nowIndex, setNowIndex] = useState(0);
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
        dispatch(regionActions.getMoreDataList(allProducts.slice(nowIndex, nowIndex + 10)))
        setNowIndex(prevIndex => prevIndex + 10);
    }, [dispatch, nowIndex, allProducts]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (inView && !isLoading && nowIndex < allProducts.length) {
            getMoreProduct();
        }
        if (isLoading && inView) {
            setIsLoading(false);
        }
    }, [inView, nowIndex, isLoading, allProducts.length, getMoreProduct]);

    return { filteredProducts, ref, isLoading };
}

export default useProducts