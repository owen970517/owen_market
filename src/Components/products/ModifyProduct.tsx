import { useEffect, useState, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import styled from "styled-components";
import { IData } from "../../type/ItemProps";
import noImg from '../../ImgSrc/noimage.jpg'
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../../type/InputForm";
import dayjs from "dayjs";
import { useCompressImage } from "../../hooks/useCompressImage";
import { useUpoadImage } from "../../hooks/useUploadImage";

const Modify = () => {
  const [data, setData] = useState<IData>();
  const [imagePreview, setImagePreview] = useState('');
  const {register , handleSubmit,watch} = useForm<IForm>();
  const {compressImage} = useCompressImage();
  const {uploadImageToStorage} = useUpoadImage()
  const nav = useNavigate();
  const params = useParams();
  const FileRef = useRef<HTMLInputElement | null>(null);
  const uploadImg = watch('image');
  const date = dayjs();
  const formattedDate = date.format('YYYY년MM월DD일');
  
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db?.collection('Product').doc(params.uid).get();
      const data = snapshot?.data();
      setData(data);
      setImagePreview(data?.이미지 || '');
    };
    fetchData();
  }, [data?.이미지, params.uid]);
  
  useEffect(() => {
    setImagePreview(uploadImg?.[0] ? URL.createObjectURL(uploadImg[0]) : data?.이미지 ?? '');
  }, [uploadImg, data?.이미지]);

  const onModified:SubmitHandler<IForm> = async (props) => {
    const Img = props.image[0];
    if (Img) {
      const compressedImage = await compressImage(Img);
      const url= await uploadImageToStorage(compressedImage);
      await db.collection('Product').doc(params.uid).update({
        이미지: url,
        상품명: watch('item'),
        가격: watch('price'),
        날짜: formattedDate
      });
      nav('/');
    }
  };  
  return (
    <>
      <FileInput onClick={() => FileRef.current?.click()}>
        <BgImg src={imagePreview ? imagePreview : noImg}></BgImg>
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
  width: 50%;
  height: 300px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
const FileInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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


