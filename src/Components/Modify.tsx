import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db, storage } from "../firebase";
import styled from "styled-components";

interface IData {
    id? : string ;
    uid? : string;
    가격? : string;
    이미지? : string;
    올린사람? : string;
    상품명? : string;
    지역? : string;
    날짜? : string;
    상태? : string;
}

function Modify() {
    const [data, setData] = useState<IData>({});
    const [file , setFile] = useState('');
    const nav = useNavigate();
    const params = useParams();
    const date = new Date();
    const years = String(date.getFullYear()).padStart(4,'0');
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    useEffect(() => {
        db.collection('Product').doc(params.uid).get().then((result) => {
            console.log(result.data());
            setData(result.data() as any);
        });

    },[params.uid])
    const onItemChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData({
            이미지 :data.이미지,
            올린사람 : data.올린사람,
            상품명 : e.target.value,
            가격 : data.가격,
            날짜 : data.날짜
        })
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        setData({
            이미지 :data.이미지,
            올린사람 : data.올린사람,
            상품명 : data.상품명,
            가격 : e.target.value,
            날짜 : data.날짜
        })
    }
    // React.ChangeEvent<HTMLInputElement> 타입 지정 시 
    // Object is possibly 'null'. error 발생
    const onFileChange = (e:any ) => {
        const Img =e.target.files[0];
        const storageRef = storage.ref();
        const ImgRef = storageRef.child(`image/${Img.name}`);
        const uploadImg = ImgRef.put(Img);
        uploadImg.on('state_changed' ,
        null ,  
        (error) => {
            console.log(error);
        },      () => {
            uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                setFile(url);
                setData({
                    이미지 :url,
                    올린사람 : data.올린사람,
                    상품명 : data.상품명,
                    가격 : data.가격,
                    날짜 : data.날짜
                })
            });
          }
        )
    }
    const onModified =  () => {
        db.collection('Product').doc(params.uid).update({
            이미지 : data.이미지,
            상품명 : data.상품명 , 
            가격 : data.가격,
            날짜 : `${years}년${month}월${day}일`
        })
        nav('/');
    }
    return (
        <div>
            <BgImg src={data?.이미지} width='30%' height='300px'></BgImg>
            <div>
                <input type='file' onChange={onFileChange}/>
                <h5>올린사람 : {data.올린사람} </h5>
                <h5>상품명 : <input type='text' onChange={onItemChange} value={data.상품명 || ''}></input></h5>
                <p >올린날짜 : {data.날짜}</p>
                <p >가격 : <input type='text' onChange={onChange} value={data.가격 || ''}></input></p>
            </div>
            <button onClick={onModified}>수정 완료</button>
            <button>채팅</button>
        </div>
    )
}


const BgImg = styled.img`
    width: 100%;
    height: 300px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export default Modify