import { SubmitHandler, useForm } from "react-hook-form";
import { db } from '../../firebase';
import * as S from '../../styles/Images.styled';
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
      if (images.length < 10) {
        setImages((prev) => [...prev,imgSrc[0]])
      } else {
        alert('이미지는 최대 10장까지 가능합니다.')
      }
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
      const newImages = prevImages.filter((_, index) => index !== idx);
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
      <S.Wrapper>
        <S.Container>
          {images && images.map((image,idx:number) => {
            return (
              <S.PreviewWrapper key={idx}>
                <S.PreviewImg src={URL.createObjectURL(image)} alt="없음"/>
                <S.DeleteBtn onClick={() => onImgDel(idx)}>❌</S.DeleteBtn>
              </S.PreviewWrapper>
            )
          })}
        </S.Container>
        <S.Form onSubmit={handleSubmit(onAddProduct)}>
          <S.FileInput onClick={() => {fileRef.current?.click()}}>
            <label>업로드 {images.length} / 10</label>
            <input {...register('image')} type="file" ref={(data) => {
              register('image').ref(data);
              fileRef.current = data
            }}></input>
          </S.FileInput>
          <SelectRegion/>
          <S.Input {...register("title" , {required :true , maxLength:20})} placeholder="제목"></S.Input>
          <S.Input {...register("item" , {required :true , maxLength:10})} placeholder="상품명"></S.Input>
          <S.Input {...register("price" , {required :true , maxLength:20})} placeholder="가격"></S.Input>
          <S.Textarea {...register("description" , {required :true , maxLength:200})} placeholder="상품 설명"></S.Textarea>
          <S.SubmitButton onClick={() => onAddProduct}>올리기</S.SubmitButton>
        </S.Form>
      </S.Wrapper>
    </>
    )
  }
export default AddProduct