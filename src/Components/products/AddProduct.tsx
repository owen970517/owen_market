import { SubmitHandler, useForm } from "react-hook-form";
import { db } from '../../firebase';
import styled from "styled-components";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import {  useState , useEffect,useRef } from "react";
import { IForm } from "../../type/InputForm";
import { useSelector} from 'react-redux'
import { Helmet } from "react-helmet-async";
import { RootState } from "../../store/store";
import { useCompressImage } from "../../hooks/useCompressImage";
import { useUpoadImage } from "../../hooks/useUploadImage";
import SelectRegion from "../Layout/SelectRegion";

const AddProduct = () => {
  const nav = useNavigate();
  const {user} = useSelector((state:RootState) => state.user)
  const {region,district} = useSelector((state:RootState) => state.region);
  const {register , handleSubmit , watch } = useForm<IForm>();
  const {compressImage} = useCompressImage();
  const {uploadImageToStorage} = useUpoadImage()
  const [images,setImages] = useState<File[]>([]);
  const imgSrc = watch('image');
  const fileRef = useRef<HTMLInputElement | null>(null);
  useEffect(()=> {
    if(imgSrc && imgSrc.length > 0) {
      const file = imgSrc[0];
      setImages((prev) => [...prev,file])
    }
  },[imgSrc])
  const onAddProduct:SubmitHandler<IForm> = async (props) => {
    const description = props.description.replace(/\n/g, '<br>');
    const urls = await Promise.all(
      images.map(async (Img:File) => {
        const compressedImage = await compressImage(Img);
        const url = await uploadImageToStorage(compressedImage);
        return url;
      })
    );
    db.collection('Product').doc(props.title).set({
      uid : user.uid,
      상품명 : props.item,
      가격 : props.price,
      지역 : region,
      세부지역 : district,
      상태 : '판매중',
      올린사람 : user.displayName,
      날짜 : dayjs().format(),
      이미지 : urls,
      설명 : description,
    });
    nav('/');
  }
  const onImgDel = (idx:number) => {
    setImages(prevImages => {
      const newImages = prevImages.filter((image, index) => index !== idx);
      return newImages;
    });
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  return (
    <>
      <Helmet>
        <title>{`상품 등록 | 중고사이트`}</title>
      </Helmet>
      <Wrapper>
        <Container>
          {images && images.map((image,idx:number) => {
            return (
              <PreviewWrapper key={idx}>
                <Preview src={URL.createObjectURL(image)} alt="없음"/>
                <DeleteBtn onClick={() => onImgDel(idx)}>❌</DeleteBtn>
              </PreviewWrapper>
            )
          })}
        </Container>
        <Form onSubmit={handleSubmit(onAddProduct)}>
          <FileInput onClick={() => {fileRef.current?.click()}}>
            <label>업로드</label>
            <input {...register('image')} type="file" ref={(data) => {
              register('image').ref(data);
              fileRef.current = data
            }}></input>
          </FileInput>
          <SelectRegion/>
          <Input {...register("title" , {required :true , maxLength:20})} placeholder="제목"></Input>
          <Input {...register("item" , {required :true , maxLength:10})} placeholder="상품명"></Input>
          <Input {...register("price" , {required :true , maxLength:20})} placeholder="가격"></Input>
          <Textarea {...register("description" , {required :true , maxLength:200})} placeholder="상품 설명"></Textarea>
          <Input type="submit" value='올리기' onClick={() => onAddProduct}></Input>
        </Form>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #FFF5E1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
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

const FileInput = styled.div`
  label {
    display: inline-block;
    padding: .5em .75em;
    color: #fff;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    background-color: #FF8A3D;
    border-radius: .25em;
    margin-bottom: 10px;
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
export default AddProduct