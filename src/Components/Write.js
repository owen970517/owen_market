import { useForm } from "react-hook-form";
import {db , storage} from '../firebase';
import styled from "styled-components";

function Write({userObj , isLogin}) {
    const {register , handleSubmit ,setFocus , watch} = useForm();
    const onSubmit = (props) => {
      const Img = props.image[0];
      const storageRef = storage.ref();
      const ImgRef = storageRef.child(`image/${props.image[0].name}`);
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
            올린사람 : userObj.displayName,
            날짜 : `${years}년${month}월${day}일`,
            이미지 : url});
        });
      }
  );
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('image' , {required : true })} type="file"></Input>
                <Input {...register("title" , {required :true , maxLength:20})} placeholder="제목"></Input>
                <Input {...register("region" , {required : true})} placeholder='지역'></Input>
                <Input {...register("item" , {required :true , maxLength:10})} placeholder="상품명"></Input>
                <Input {...register("price" , {required :true , maxLength:20})} placeholder="가격"></Input>
                <Input type="submit" value='올리기'></Input>
            </Form>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;;
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

export default Write