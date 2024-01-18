import { useEffect, useState, useRef, useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../firebase";
import * as S from '../styles/Images.styled';
import { IData } from "../type/ItemProps";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../type/InputForm";
import { useCompressImage } from "../hooks/useCompressImage";
import { useUpoadImage } from "../hooks/useUploadImage";
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
    <S.Wrapper>
      <S.Container>
        {images && images.map((image,idx:number) => {
          return (
            <S.PreviewWrapper key={idx}>
              <S.PreviewImg src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="없음"/>
              <S.DeleteBtn onClick={() => onImgDel(idx)}>❌</S.DeleteBtn>
            </S.PreviewWrapper>
          )
        })}
      </S.Container>
      <S.FileInput onClick={() => FileRef.current?.click()}>
        <label>업로드 {images.length} / 10</label>
        <input {...register('image')} type="file" ref={(data) => {
            register('image').ref(data);
            FileRef.current = data
        }}></input>
      </S.FileInput>
      <S.Form>
        <h3>올린사람 : {data?.올린사람} </h3>
        <h3>상품명<S.Input type='text' {...register('item')} defaultValue={data?.상품명}></S.Input></h3>
        <p>올린날짜 : {dayjs(data?.날짜).fromNow()}</p>
        <h3>가격<S.Input type='text' {...register('price')} defaultValue={data?.가격}></S.Input></h3>
        <S.Textarea {...register("description")} defaultValue={data?.설명?.replace(/<br>/g, '\n')}></S.Textarea>
      </S.Form>
      <S.SubmitButton onClick={handleSubmit(onModified)}>수정 완료</S.SubmitButton>
    </S.Wrapper>
  )
}
export default Modify


