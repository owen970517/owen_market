import { useState } from "react"
import { auth } from "../../firebase";
import { useNavigate} from "react-router-dom"
import styled from "styled-components";
import { useSelector} from 'react-redux'
import SaleProducts from "../products/SaleProducts";
import SoldProducts from "../products/SoldProducts";
function Profile() {
    const userObj = useSelector((state:any) => state.user.user)
    const [userNickName , setUserNickName] = useState(userObj.displayName);
    const [sale , setSale] = useState(true);
    const nav = useNavigate();
    const onFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        auth?.currentUser?.updateProfile({
            displayName : userNickName ,    
        })
        nav('/');
    }
    const onNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserNickName(e.target.value);
    }
    return (
        <div>
            <Title>프로필</Title>
            <UserForm onSubmit={onFormSubmit}>
                닉네임 : <input type='text' onChange={onNickname} value={userNickName}/>
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
                        <SaleProducts userNickName={userNickName}/>
                    </>
                    :  
                    <>
                        <Title>판매완료</Title>
                        <SoldProducts userNickName={userNickName}/>
                    </>
                }
            </div>
        </div>
    )
}

const UserForm = styled.form`
  display : flex;
  justify-content: center;
  align-items: center;
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
export default Profile