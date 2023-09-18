import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useInView } from 'react-intersection-observer';
import { db } from '../firebase';
import { regionActions } from '../store/regionSlice';
import { IData } from '../type/ItemProps';

const useProducts = () => {
    const dispatch = useDispatch();
    const { filteredData,data,wholeData } = useSelector((state:RootState) =>state.region);
    const [isLoading , setIsLoading] = useState(false);
    const [nowIndex , setNowIndex] = useState(0);
    const [ref,inView] = useInView({ threshold: 0.5 });
  
    const memoizedDispatch = useCallback((itemList:IData[]) => {
        dispatch(regionActions.setData(itemList));
    }, [dispatch]);
        
    const getMoreProduct = useCallback(() => {
        setIsLoading(true);
        dispatch(regionActions.getMoreDataList(data.slice(nowIndex,nowIndex+10)))
    }, [dispatch, nowIndex]);
    
    useEffect(() => {
        db.collection('Product').where('상태' , '==' , '판매중').orderBy('날짜','desc').onSnapshot((snapshot) => {
        const itemList = snapshot.docs.map((doc) =>({
        id : doc.id,
        ...doc.data()
        }));
        memoizedDispatch(itemList);
    });
    }, [memoizedDispatch]);
    
    useEffect(() => {
        if (!inView || nowIndex === 0 || isLoading || nowIndex >= data.length) return;
        getMoreProduct();
    }, [inView, nowIndex, isLoading, data.length, getMoreProduct]);
    
    useEffect(() => {
        if (!inView || isLoading || nowIndex >= data.length) return;
        setNowIndex(prevIndex => prevIndex + 10);
    }, [inView, isLoading, data.length, nowIndex]);
    
    useEffect(() => {
        if (isLoading && inView) {
            setIsLoading(false);
        }
    }, [isLoading, inView]);
  
    return { filteredData, ref, isLoading, wholeData };
}

export default useProducts