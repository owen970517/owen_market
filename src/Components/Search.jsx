import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../firebase';

const Search = () => {
  const [data,setData] = useState([]);
  const params = useParams();
  console.log(params.input);
  useEffect(() => {
    db.collection('Product').where('상태' , '==' , '판매중').get().then((result) => {
        setData(result.docs.map((doc) =>({
            ...doc.data()
        })));  
    })
  },[])
  console.log(data.filter((item) => item.상품명.includes(params.input)));
  return (
    <div>Search</div>
  )
}

export default Search