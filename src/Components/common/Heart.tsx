import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IData } from '../../type/ItemProps';
import { db } from '../../firebase';
import heart from '../../assets/heart.svg'
import loveheart from '../../assets/loveheart.png'
import { useParams } from 'react-router-dom';

const Heart = ({data} : {data:IData}) => {
    const {user} = useSelector((state:RootState) => state.user);
    const [myList,setMyList] = useState<IData[]>([])
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
              const result = await db
                .collection('Cart')
                .doc(user.uid)
                .collection('items')
                .get();
              setMyList(
                result.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })),
              );
            } catch (error) {
              console.error(error);
            }
          };
      
          if (user.uid) {
            fetchData();
          }
    },[user.uid])
    const onAddCart = () => {
        db.collection('Cart').doc(user.uid).collection('items').doc(data.상품명).set({
            title : params.id,
            ...data
        })
        setMyList(oldList => [...oldList, data]);
    }
    const onDelete = async (id : string) => {
        await db.collection('Cart').doc(user.uid).collection('items').doc(id).delete();
        setMyList(oldList => oldList.filter(item => item.상품명 !== id));
    };
    const isExist = myList.some(item => item.상품명 === data.상품명)
    
  return (
    <>
        {isExist ? 
            <img src={loveheart} alt ='heart' style={{width :'40px', height : '40px', cursor : 'pointer'}} onClick={() => onDelete(data.상품명!)}/> 
            : <img src={heart} alt='asd' style={{width :'40px', height : '40px', cursor : 'pointer'}} onClick={onAddCart}/>}
    </>
  )
}

export default Heart