import React, { useEffect, useState, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db, storage } from "../../firebase";
import styled from "styled-components";
import { IData } from "../../type/ItemProps";
import noImg from '../../ImgSrc/noimage.jpg'
import { useForm } from "react-hook-form";

function Modify() {
    const [data, setData] = useState<IData>();
    const nav = useNavigate();
    const params = useParams();
    const date = new Date();
    const years = String(date.getFullYear()).padStart(4,'0');
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    const FileRef = useRef() as any;
    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await db.collection('Product').doc(params.uid).get()
            setData(snapshot.data());
        }
        fetchData()
    },[params.uid])
    const {register , handleSubmit,watch} = useForm({
        defaultValues : {
            item : data?.상품명,
            price : data?.가격
        }
    });
    const fileRef = useRef<HTMLInputElement | null>();
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const Img =e.target.files[0];
            const storageRef = storage.ref();
            const ImgRef = storageRef.child(`image/${Img.name}`);
            const uploadImg = ImgRef.put(Img);
            uploadImg.on('state_changed' ,
            null ,  
            (error) => {
                console.log(error);
            },      
            async () => {
                await uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                    setData({
                        이미지 :url,
                        올린사람 : data?.올린사람,
                        상품명 : data?.상품명,
                        가격 : data?.가격,
                        날짜 : data?.날짜
                    })
                });
              }
            )
        } 
    }
    const onModified = async () => {
        await db.collection('Product').doc(params.uid).update({
            이미지 : data?.이미지,
            상품명 : watch('item'), 
            가격 : watch('price'),
            날짜 : `${years}년${month}월${day}일`
        })
        nav('/');
    }
    return (
        <>
            <FileInput onClick={() => FileRef.current.click()}>
                <BgImg src={data?.이미지 ? data?.이미지 : noImg} width='30%' height='300px'></BgImg>
                <label>사진 변경</label>
                <input type='file' onChange={onFileChange} style={{ display : 'none'}} ref={FileRef}/>
            </FileInput>
            <div>
                <h5>올린사람 : {data?.올린사람} </h5>
                <h5>상품명 : <input type='text' {...register('item')} ></input></h5>
                <p>올린날짜 : {data?.날짜}</p>
                <p>가격 : <input type='text' {...register('price')} ></input></p>
            </div>
            <button onClick={handleSubmit(onModified)}>수정 완료</button>
        </>
    )
}


const BgImg = styled.img`
    width: 100%;
    height: 300px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
const FileInput = styled.div`
  label {
    display: inline-block;
    padding: .5em .75em;
    color: #fff;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    background-color: #337ab7;
    border-color: #2e6da4;
    border-bottom-color: #e2e2e2;
    border-radius: .25em;
  }
`
export default Modify