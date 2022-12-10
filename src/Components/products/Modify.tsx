import { useEffect, useState, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db, storage } from "../../firebase";
import styled from "styled-components";
import { IData } from "../../type/ItemProps";
import noImg from '../../ImgSrc/noimage.jpg'
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../../type/InputForm";

const Modify = () => {
    const [data, setData] = useState<IData>();
    const [imagePreview, setImagePreview] = useState('');
    const {register , handleSubmit,watch} = useForm<IForm>();
    const nav = useNavigate();
    const params = useParams();
    const uploadImg = watch('image');
    const date = new Date();
    const years = String(date.getFullYear()).padStart(4,'0');
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    const FileRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await db.collection('Product').doc(params.uid).get()
            setData(snapshot.data());
        }
        setImagePreview(data?.이미지!);
        if(uploadImg && uploadImg.length > 0) {
            const file = uploadImg[0]
            setImagePreview(URL.createObjectURL(file))
        }
        fetchData()
    },[data?.이미지, params.uid, uploadImg])
    const onModified:SubmitHandler<IForm> = async (props) => {
        if(props.image[0]) {
            const Img = props.image[0];
            const storageRef = storage.ref();
            const ImgRef = storageRef.child(`user_image/${Img.name}`);
            const uploadImg = ImgRef.put(Img);
            uploadImg.on('state_changed', 
            // 변화시 동작하는 함수 
            null, 
            //에러시 동작하는 함수
            (error) => {
              console.error('실패사유는', error);
            }, 
            // 성공시 동작하는 함수
            async () => {
              const url = await uploadImg.snapshot.ref.getDownloadURL()
              await db.collection('Product').doc(params.uid).update({
                이미지 : url,
                상품명 : watch('item'), 
                가격 : watch('price'),
                날짜 : `${years}년${month}월${day}일`
                })
                nav('/');
              });
            }
    }
    return (
        <>
            <FileInput onClick={() => FileRef.current?.click()}>
                <BgImg src={imagePreview ? imagePreview : noImg} width='30%' height='300px'></BgImg>
                <label>사진 변경</label>
                <input {...register('image')} type="file" ref={(data) => {
                    register('image').ref(data);
                    FileRef.current = data
                }}></input>
            </FileInput>
            <div>
                <h5>올린사람 : {data?.올린사람} </h5>
                <h5>상품명 : <input type='text' {...register('item')} defaultValue={data?.상품명}></input></h5>
                <p>올린날짜 : {data?.날짜}</p>
                <p>가격 : <input type='text' {...register('price')} defaultValue={data?.가격}></input></p>
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
  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }
`
export default Modify