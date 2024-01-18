import { useEffect, useState, useRef, useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import styled from "styled-components";
import { IData } from "../../type/ItemProps";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../../type/InputForm";
import { useCompressImage } from "../../hooks/useCompressImage";
import { useUpoadImage } from "../../hooks/useUploadImage";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const Modify = () => {
  const [data, setData] = useState<IData>();
  const [images , setImages] = useState<File[]>([])
  const {register , handleSubmit,watch} = useForm<IForm>();
  const {compressImage} = useCompressImage();
  const {uploadImageToStorage} = useUpoadImage()
  const nav = useNavigate();
  const params = useParams();
  const FileRef = useRef<HTMLInputElement | null>(null);
  const imgSrc = watch('image');
  const fetchData =  useCallback(async() => {
    const snapshot = await db?.collection('Product').doc(params.uid).get();
    const data = snapshot.data();
    setData(data);
    setImages(data?.이미지);
  },[params.uid]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(()=> {
    if(imgSrc && imgSrc.length > 0) {
      const file = imgSrc[0];
      setImages((prev) => [...prev,file])
    }
  },[imgSrc])
  const onModified:SubmitHandler<IForm> = async (props) => {
    const description = data?.설명?.replace(/\n/g, '<br>');
    const item = data?.상품명
    const price = data?.가격
    const urls = await Promise.all(
      images.map(async (Img:File | string) => {
        if (typeof Img === 'string') {
          return Img; 
        } else {
          const compressedImage = await compressImage(Img);
          const url = await uploadImageToStorage(compressedImage);
          return url; 
        }
      })
    );
    await db.collection('Product').doc(params.uid).update({
      이미지: urls,
      상품명: props.item ? props.item : item,
      가격: props.price ? props.price : price,
      날짜: data?.날짜,
      설명 : props.description ? props.description.replace(/\n/g, '<br>') : description,
    });
    nav('/');
  };
  const onImgDel = (idx:number) => {
    setImages(prevImages => {
      const newImages = prevImages.filter((_, index) => index !== idx);
      return newImages;
    });
    if (FileRef.current) {
      FileRef.current.value = "";
    }
  }
   
  return (
    <>
      <Container>
        {images && images.map((image,idx:number) => {
          return (
            <PreviewWrapper key={idx}>
              <Preview src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="없음"/>
              <DeleteBtn onClick={() => onImgDel(idx)}>❌</DeleteBtn>
            </PreviewWrapper>
          )
        })}
      </Container>
      <FileInput onClick={() => FileRef.current?.click()}>
        <label>업로드 {images.length} / 10</label>
        <input {...register('image')} type="file" ref={(data) => {
            register('image').ref(data);
            FileRef.current = data
        }}></input>
      </FileInput>
      <div>
          <h5>올린사람 : {data?.올린사람} </h5>
          <h5>상품명 : <input type='text' {...register('item')} defaultValue={data?.상품명}></input></h5>
          <p>올린날짜 : {dayjs(data?.날짜).fromNow()}</p>
          <p>가격 : <input type='text' {...register('price')} defaultValue={data?.가격}></input></p>
          <Textarea {...register("description")} defaultValue={data?.설명?.replace(/<br>/g, '\n')}></Textarea>
      </div>
      <button onClick={handleSubmit(onModified)}>수정 완료</button>
    </>
  )
}

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
const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #FF8A3D;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  &:focus {
    border-color: #FF8A3D;
  }
`
const Container = styled.div`
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
`

const PreviewWrapper = styled.div`
  position: relative;
`
const DeleteBtn = styled.div`
  position: absolute;
  top : -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #000;
  cursor : pointer;
`

const Preview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`

export default Modify


