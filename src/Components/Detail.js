import { useNavigate, useParams } from "react-router-dom"
import { db } from "../firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
function Detail({userObj }) {
    const [data , setData] = useState({});
    const [isOwner , setIsOwner] = useState(false);
    const params = useParams();
    const nav = useNavigate();
    useEffect(() => {
        db.collection('Product').doc(params.id).get().then((result) => {
            console.log(result.data());
            setData(result.data());
        });
        if (data.올린사람 === userObj.displayName) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    },[params.id ,data.올린사람,userObj.displayName ])
    
    console.log(isOwner);
    const date = new Date()
    const onChat = () => {
        db.collection('chatroom').add({
            product : data.상품명,
            date : date,
            participant : [userObj.displayName,data.올린사람]
        })
        nav('/chat');
    }
    const onModify = () => {
        nav('/modify/' + params.id)
    }
    console.log(`${data.올린사람}` , `${userObj.displayName}`);
    
    return (
        <div>
            <BgImg style={{backgroundImage: `url(${data.이미지})`}}></BgImg>
            <div>
            <h5>올린사람 : {data.올린사람} </h5>
            <h5 >상품명 : {data.상품명}</h5>
            <p >올린날짜 : {data.날짜}</p>
            <p >가격 : {data.가격}원</p>
            </div>
            {isOwner && <div>
                <button onClick={onModify}>수정</button>
            <button onClick={onChat}>채팅</button></div> 
            }
            
        </div>
    )
}
const BgImg = styled.div`
    width: 100%;
    height: 300px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export default Detail