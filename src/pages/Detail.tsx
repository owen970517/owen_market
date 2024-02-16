import { useNavigate, useParams } from "react-router-dom"
import { db } from "../firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IData } from "../type/ItemProps";
import { useSelector} from 'react-redux'
import { RootState } from "../store/store";
import ImageSlider from "../Components/products/ImageSlider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import LoadingSpinner from "../Components/common/LoadingSpinner";
import Title from "../Components/common/Title";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Detail = () => {
    const {user , isLogin} = useSelector((state:RootState) => state.user);
    const [data , setData] = useState<IData>();
    const params = useParams();
    const nav = useNavigate();
    useEffect(() => {
        const productRef = db.collection('Product').doc(params.id);
        productRef.get().then((result)=> {
            setData(result.data());
        });
    },[params.id])
    useEffect(() => {
        if (data) {
            const productRef = db.collection('Product').doc(params.id);
            productRef.update({
                조회수: firebase.firestore.FieldValue.increment(1)
            });
        }
    },[data, params.id])
    const isOwner = data?.올린사람 === user?.displayName;
    const onChat = () => {
        db.collection('chatroom').doc(`${data?.상품명}`).set({
            product : data?.상품명,
            date : new Date(),
            chatUser : [
                data?.올린사람,
                user.displayName
            ]
        })
        nav(`/chat/${data?.상품명}`);
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
        const ok = window.confirm('관심목록에 추가하시겠습니까?')
        if(ok) {
            db.collection('Cart').doc(user.uid).collection('items').add({
                title : params.id,
                ...data
            }).then(()=> alert('관심목록에 추가되었습니다.'))
        }
    }
    const onDelete = async (id : string) => {
        const ok = window.confirm("정말 삭제하시겠습니까??");
        if (ok) {
          await db.collection('Product').doc(id).delete();
          nav('/')
        }
      };
    if (!data) {
        return <LoadingSpinner/>;
    }
    return (
        <>
            <Title title={data.상품명}/>
            <Container>
                <ImageSlider images={data.이미지!}/>
                <InfoContainer>
                    <Content>
                        <h2>{data?.올린사람}</h2>
                        <h3>{data.지역} {data.세부지역}</h3>
                        <hr/>
                        <h1>{data?.상품명}</h1>
                        <h2>{data?.가격}원</h2>
                        <Description>
                            <h3>{data.설명?.replace(/<br>/g, '\n')}</h3>
                        </Description>
                        <p>조회 {data?.조회수} · {dayjs(data.날짜).fromNow()}</p>
                    </Content>
                    {isOwner ?
                        <ButtonGroup>
                            <Button onClick={onModify}>수정</Button>
                            <Button onClick={onSoldOut}>판매완료</Button>
                            <Button onClick={() => onDelete(params.id!)}>삭제</Button>
                        </ButtonGroup> : isLogin ?
                        <ButtonGroup>
                            <Button onClick={onChat}>채팅</Button>
                            <Button onClick={onAddCart}>관심</Button>
                        </ButtonGroup> : ''
                    }
                </InfoContainer>
            </Container>
        </>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const InfoContainer = styled.div`
    width: 50%;
`;

const Description = styled.div`
    white-space: pre-line;
`

const Content = styled.div`
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 300px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #0056b3;
    }
`;

export default Detail