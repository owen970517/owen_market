import { useState,useRef, useEffect } from "react"
import { auth, storage } from "../../firebase";
import { useNavigate} from "react-router-dom"
import styled from "styled-components";
import { useDispatch, useSelector} from 'react-redux'
import SaleProducts from "../products/SaleProducts";
import SoldProducts from "../products/SoldProducts";
import { RootState } from "../../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../../type/InputForm";
import { userActions } from "../../store/userSlice";
import { Helmet ,HelmetProvider } from "react-helmet-async";
import imageCompression from 'browser-image-compression';

const Profile = () => {
    const {user , profileImg} = useSelector((state:RootState) => state.user);
    const dispatch = useDispatch();
    const [sale , setSale] = useState(true);
    const {register,handleSubmit,watch} = useForm<IForm>({
        defaultValues : {
            nickname : user.displayName
        }
    });
    const defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    const imgSrc = watch('image');
    const newNickname = watch('nickname')
    const [imgPreview , setImgPreview] = useState(profileImg);
    useEffect(()=> {
        if(imgSrc && imgSrc.length > 0) {
          const file = imgSrc[0];
          setImgPreview(URL.createObjectURL(file));
        }
      },[imgSrc])
    const fileRef = useRef<HTMLInputElement | null>(null);
    const nav = useNavigate();
    const onFormSubmit:SubmitHandler<IForm> = async (props) => {
        if (user.displayName !== newNickname) {
            await auth?.currentUser?.updateProfile({
                displayName : newNickname ,    
            })
        }
        dispatch(userActions.modifyDisplayName({
            displayName : newNickname,
            uid : user.uid
        }))
        if(props.image[0]) {
            const Img = props.image[0];
            const options = {
                maxSizeMB : 2,
                maxWidthOrHeight : 1920,
              }
            const compressedImage = await imageCompression(Img , options);
            const storageRef = storage.ref();
            const ImgRef = storageRef.child(`user_image/${compressedImage.name}`);
            const uploadImg = ImgRef.put(compressedImage);
            uploadImg.on('state_changed', 
            // 변화시 동작하는 함수 
            null, 
            //에러시 동작하는 함수
            (error) => {
              console.error('실패사유는', error);
            }, 
            // 성공시 동작하는 함수
            async () => {
              await uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                console.log('업로드된 경로는', url);
                auth.currentUser?.updateProfile({
                    photoURL : url
                })
                dispatch(userActions.addProfileImg(url))
                });
              });
              nav('/');
            }
    }
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>{`${user.displayName} | 중고사이트`}</title>
            </Helmet>
            <Div>
                <ProfileDiv>
                    <ProfileImg src={imgPreview ? imgPreview : profileImg ? profileImg : defaultImg}></ProfileImg>
                </ProfileDiv>
            </Div>
            <PreviewImg>
                <FileInput onClick={() => {fileRef.current?.click()}}>
                    <label>사진 변경</label>
                    <input {...register('image')} type="file" ref={(data) => {
                        register('image').ref(data);
                        fileRef.current = data
                    }}></input>
                </FileInput>
            </PreviewImg>
            <UserForm onSubmit={handleSubmit(onFormSubmit)}>
                <TextInput {...register('nickname')} type='text' />
                <button type="submit">수정</button>
            </UserForm>
            <div>
                <Btn>
                    <button onClick={() => setSale((prev) => !prev)}>판매중</button>
                    <button onClick={() => setSale((prev) => !prev)}>판매완료</button>
                </Btn>
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
            </div>
        </HelmetProvider>
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
const Btn = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const ProfileDiv = styled.div`
  width: 300px;
  height : 300px;
  border-radius: 50%;
  overflow:hidden;
`
const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const PreviewImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const TextInput = styled.input`
    padding : 10px;
    text-align: center;
    width : 100px;
    height : 25px;
    border-radius: 20px;

`
export default Profile