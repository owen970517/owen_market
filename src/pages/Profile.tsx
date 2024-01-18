import { useState,useRef, useEffect, lazy, Suspense } from "react"
import { auth, db } from "../firebase";
import { useNavigate} from "react-router-dom"
import styled from "styled-components";
import { useDispatch, useSelector} from 'react-redux'
import { RootState } from "../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../type/InputForm";
import { userActions } from "../store/userSlice";
import { Helmet } from "react-helmet-async";
import { defaultImg } from "../constants/user";
import { useCompressImage } from "../hooks/useCompressImage";
import { useUpoadImage } from "../hooks/useUploadImage";
import camera from '../assets/camera.svg'

const SaleProducts = lazy(() => import("../Components/products/SaleProducts"))
const SoldProducts = lazy(() => import("../Components/products/SoldProducts"))

const Profile = () => {
  const dispatch = useDispatch();
  const {user , profileImg} = useSelector((state:RootState) => state.user);
  const {register,handleSubmit,watch} = useForm<IForm>({
    defaultValues : {
      nickname : user.displayName
    }
  });
  const imgSrc = watch('image');
  const newNickname = watch('nickname')
  const fileRef = useRef<HTMLInputElement | null>(null);
  const nav = useNavigate();
  const [sale , setSale] = useState(true);
  const [imgPreview , setImgPreview] = useState(profileImg);
  const {compressImage} = useCompressImage();
  const {uploadImageToStorage} = useUpoadImage()
  
  useEffect(()=> {
    if(imgSrc && imgSrc.length > 0) {
      const file = imgSrc[0];
      setImgPreview(URL.createObjectURL(file));
    }
  },[imgSrc])

  const updateAllUserDocuments = async (uid:string,newNickname:string) => {
    try {
      const querySnapshot = await db.collection("Product").where("uid", "==", uid).get();
      querySnapshot.forEach((doc) => {
        db.collection("Product").doc(doc.id).update({
          올린사람: newNickname
        });
      });
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  };

  const updateAllChat = async (prevName:string,newNickname:string) => {
    try {
      const result = await db.collection('chatroom').where('chatUser', 'array-contains', prevName).get();
      result.forEach(async (doc) => {
        let chatUser = doc.data().chatUser;
        chatUser[1] = newNickname; 
        await db.collection("chatroom").doc(doc.id).update({
          chatUser: chatUser
        });
      });
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  }

  const updateProfileImage = async (image:File) => {
    const Img = image;
    if (Img) {
      const compressedImage = await compressImage(Img);
      const url = await uploadImageToStorage(compressedImage)
      auth.currentUser?.updateProfile({
        photoURL : url
      })
      dispatch(userActions.addProfileImg(url))
    }
  }

  const onFormSubmit:SubmitHandler<IForm> = async (props) => {
    if (user.displayName !== newNickname) {
      await updateAllUserDocuments(user.uid,newNickname)
      await updateAllChat(user.displayName,newNickname)
      await auth?.currentUser?.updateProfile({
        displayName : newNickname ,    
      })
      dispatch(userActions.modifyDisplayName({
        displayName : newNickname,
        uid : user.uid
      }))
    }
    if(props.image[0]) {
      await updateProfileImage(props.image[0])
    }
    nav('/');
  }
    
    return (
      <>
          <Helmet>
              <title>{`${user.displayName} | 중고사이트`}</title>
          </Helmet>
          <Div>
            <ProfileDiv>
              <ProfileImg src={imgPreview || profileImg || defaultImg}></ProfileImg>
              <FileInput onClick={() => {fileRef.current?.click()}}>
                <img src={camera} alt='camera icon' />
                <input {...register('image')} type="file" ref={(data) => {
                    register('image').ref(data);
                    fileRef.current = data
                }}></input>
              </FileInput>
            </ProfileDiv>
          </Div>
          <UserForm onSubmit={handleSubmit(onFormSubmit)}>
              <TextInput {...register('nickname')} type='text' />
              <button type="submit">수정</button>
          </UserForm>            
          <ToggleBtn>
              <button onClick={() => setSale((prev) => !prev)}>판매중</button>
              <button onClick={() => setSale((prev) => !prev)}>판매완료</button>
          </ToggleBtn>
          <Suspense fallback={<h1>Loading...</h1>}>
            {sale ?
                <>
                  <Title>판매중</Title>
                  <SaleProducts />
                </>
                :  
                <>
                  <Title>판매완료</Title>
                  <SoldProducts />
                </>
            }
          </Suspense>
      </>
    )
}

const UserForm = styled.form`
  display : flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`

const Title = styled.h1`
  text-align: center;

`
const ToggleBtn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const ProfileDiv = styled.div`
  width: 150px;
  height : 150px;
  border-radius: 50%;
  overflow: hidden;
`
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const FileInput = styled.div`
  position: absolute;
  bottom: 0;
  left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: skyblue;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 70%;
  }

  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
  }
`
const Div = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
`
const TextInput = styled.input`
  padding : 10px;
  text-align: center;
  width : 100px;
  height : 25px;
  border-radius: 20px;
`
export default Profile