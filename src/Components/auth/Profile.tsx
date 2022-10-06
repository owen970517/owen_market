import { useState } from "react"
import { auth, db } from "../../firebase";
import { Link, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import styled from "styled-components";
import { IData } from "../../type/ItemProps";
import { useSelector} from 'react-redux'
function Profile() {
    const userObj = useSelector((state:any) => state.user.user)
    const [userNickName , setUserNickName] = useState(userObj.displayName);
    const [data , setData] = useState<IData[]>([]);
    const [soldData , setSoldData] = useState<IData[]>([]);
    const [sale , setSale] = useState(true);
    useEffect(() => {
        db.collection('Product').where('상태' , '==' , '판매중').where('올린사람' ,'==' , userNickName).get().then((result) => {
            const saling = result.docs.map((doc) =>({
                id : doc.id,
                ...doc.data()
            }))
            setData(saling);  
        })
        db.collection('Product').where('상태' , '==' , '판매완료').where('올린사람' ,'==' , userNickName).get().then((result) => {
            const sold = result.docs.map((doc) =>({
                id : doc.id,
                ...doc.data()
            }))
            setSoldData(sold);  
        })
    },[data , soldData , userNickName])
    const nav = useNavigate();
    const onFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        auth?.currentUser?.updateProfile({
            displayName : userNickName ,    
        })
        nav('/');
    }
    const onClickSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        auth?.currentUser?.updateProfile({
            displayName : userNickName ,    
        })
        userObj.displayName = userNickName;
        nav('/');
    }
    const onNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserNickName(e.target.value);
    }
    const onClick = () => {
        setSale((prev) => !prev);
    }
    return (
        <div>
            <Title>프로필</Title>
            <UserForm onSubmit={onFormSubmit}>
                닉네임 : <input type='text' onChange={onNickname} value={userNickName}/>
                <button onClick={onClickSubmit}>수정</button>
            </UserForm>
            <div>
                <Btn>
                    <button onClick={onClick}>판매중</button>
                    <button onClick={onClick}>판매완료</button>
                </Btn>
                {sale ?
                    <>
                    <Title>판매중</Title>
                        <Grid>
                        {data.map((p) =>  {
                            return (
                                <div key={p.id}>
                                <img src={p.이미지 ? p.이미지 : 'https://via.placeholder.com/350'} alt='img' width ='200px' height='200px'/>
                                <div>
                                    <Link to={`/detail/${p.id}`}><h3>{p.상품명}</h3></Link>
                                    <h3>{p.날짜}</h3>
                                    <h3>{p.지역}</h3>
                                    <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
                                </div>
                                </div>
                                )
                        })}
                        </Grid> 
                    </>
                :  
                <>
                <Title>판매완료</Title>
                 <Grid>
                    {soldData.map((p) =>  {
                        return (
                            <div key={p.id}>
                            <img src={p.이미지 ? p.이미지 : 'https://via.placeholder.com/350'} alt='img' width ='200px' height='200px'/>
                            <div>
                                <Link to={`/detail/${p.id}`}><h3>{p.상품명}</h3></Link>
                                <h3>{p.날짜}</h3>
                                <h3>{p.지역}</h3>
                                <h3>{p.가격?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h3>
                            </div>
                            </div>
                            )
                    })}
                </Grid>
                
                </>
                }
            </div>
        </div>
    )
}
const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(auto-fit , minmax(20rem,1fr));
    grid-gap : 10px;
    place-items: center;
`;

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