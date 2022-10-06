import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IData } from "../../type/ItemProps";
import { useSelector} from 'react-redux'

function Detail() {
    const userObj = useSelector((state:any) => state.user.user);
    const isLogin = useSelector((state:any) => state.user.isLogin);
    const [data , setData] = useState<IData>();
    const [isOwner , setIsOwner] = useState(false);
    const params = useParams();
    const nav = useNavigate();
    useEffect(() => {
        db.collection('Product').doc(params.id).get().then((result)=> {setData(result.data())})
        if (data?.올린사람 === userObj.displayName) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    },[params.id ,data?.올린사람,userObj.displayName , userObj.uid ])
    const onChat = () => {
        db.collection('chatroom').add({
            product : data?.상품명,
            date : new Date(),
            participant : [userObj.displayName,data?.올린사람]
        })
        nav('/chat');
    }
    const onModify = () => {
        nav('/modify/' + params.id)
    }
    const onSoldOut = () => {
        if (data?.상태 === '판매중') {
            db.collection('Product').doc(params.id).update({
                상태 : '판매완료'
            })
        }
        nav('/');
    }
    const onAddCart = () => {
        db.collection('Cart').doc(userObj.uid).collection('items').add({
            ...data
        })
    }
    return (
        <div>
            <BgImg src={data?.이미지} width='30%' height='300px'></BgImg>
            <div>
            <h5>올린사람 : {data?.올린사람} </h5>
            <h5 >상품명 : {data?.상품명}</h5>
            <p>올린날짜 : {data?.날짜}</p>
            <p>가격 : {data?.가격}원</p>
            <p>{data?.상태}</p>
            </div>
            {isOwner ? <div>
                <button onClick={onModify}>수정</button>
                <button onClick={onSoldOut}>판매완료</button>
            </div> : isLogin ? <div>
                <button onClick={onChat}>채팅</button>
                <button onClick={onAddCart}>장바구니 담기</button>
            </div> : ''
            }
        </div>
    )
}
const BgImg = styled.img`
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`
export default Detail