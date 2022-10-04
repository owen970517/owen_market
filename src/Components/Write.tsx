import { SubmitHandler, useForm } from "react-hook-form";
import {db , storage} from '../firebase';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useEffect } from "react";

interface IWriteProps {
  title : string 
  image: string | any
  region : string 
  item : string 
  price : string 
}

function Write({userObj}:any) {
    const {register , handleSubmit , watch } = useForm<IWriteProps>();
    const [imgPreview , setImgPreview] = useState('');
    const imgSrc = watch('image');

    useEffect(()=> {
      if(imgSrc && imgSrc.length > 0) {
        const file = imgSrc[0] as any;
        setImgPreview(URL.createObjectURL(file));
      }
    },[imgSrc])
    const nav = useNavigate();
    const onSubmit:SubmitHandler<IWriteProps> = (props) => {
      const Img = props.image[0];
      const storageRef = storage.ref();
      const ImgRef = storageRef.child(`image/${Img.name}`);
      const uploadImg = ImgRef.put(Img);
      const date = new Date();
      const years = String(date.getFullYear()).padStart(4,'0');
      const month = String(date.getMonth()+1).padStart(2,'0');
      const day = String(date.getDate()).padStart(2,'0');
      uploadImg.on('state_changed', 
      // 변화시 동작하는 함수 
      null, 
      //에러시 동작하는 함수
      (error) => {
        console.error('실패사유는', error);
      }, 
      // 성공시 동작하는 함수
      () => {
        uploadImg.snapshot.ref.getDownloadURL().then((url) => {
          console.log('업로드된 경로는', url);
          db.collection('Product').doc(props.title).set({ 
            uid : userObj.uid,
            상품명 : props.item, 
            가격 : props.price,
            지역 : props.region,
            상태 : '판매중',
            올린사람 : userObj.displayName,
            날짜 : `${years}년${month}월${day}일`,
            시간 : new Date(),
            이미지 : url});
        });
      }
  );
  nav('/');
  }
  const onImgDel = () => {
    setImgPreview('');
  
  }
    return (
        <Wrapper>
              {imgPreview && 
              <div>
                <Preview src={imgPreview} alt="없음"/>
                <button onClick={onImgDel}>삭제</button>
              </div>
              } 
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('image' , {required : true })} type="file"></Input>
                <Input {...register("title" , {required :true , maxLength:20})} placeholder="제목"></Input>
                <Input {...register("region" , {required : true})} placeholder='지역'></Input>
                <Input {...register("item" , {required :true , maxLength:10})} placeholder="상품명"></Input>
                <Input {...register("price" , {required :true , maxLength:20})} placeholder="가격"></Input>
                <Input type="submit" value='올리기' onClick={() => onSubmit}></Input>
            </Form>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
width: 500px;
height: 50px;
  margin-bottom : 10px;
  padding : 10px;
  font-size: 20px;
`
const Preview = styled.img`
    width : 300px;
    height : 300px;

`
export default Write