import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IData } from "../../type/ItemProps";
import { useSelector} from 'react-redux'
import { RootState } from "../../store/store";
import { Helmet } from "react-helmet-async";
import ImageSlider from "./ImageSlider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Detail = () => {
    const {user , isLogin} = useSelector((state:RootState) => state.user);
    const [data , setData] = useState<IData>();
    const params = useParams();
    const nav = useNavigate();
    useEffect(() => {
        db.collection('Product').doc(params.id).get().then((result)=> {setData(result.data())})
    },[params.id])
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
        const ok = window.confirm('장바구니에 추가하시겠습니까?')
        if(ok) {
            db.collection('Cart').doc(user.uid).collection('items').add({
                ...data
            }).then(()=> alert('장바구니에 추가되었습니다.'))
        }
    }
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Helmet>
                <title>{`${data?.상품명} | 중고사이트`}</title>
            </Helmet>
            <Container>
                {/* <BgImg src={data?.이미지 ? data?.이미지 : noImg }></BgImg> */}
                <ImageSlider images={data.이미지 as any}/>
                <InfoContainer>
                    <Content>
                        <h5>올린사람: {data?.올린사람}</h5>
                        <h5>상품명: {data?.상품명}</h5>
                        <p>올린날짜: {dayjs(data.날짜).fromNow()}</p>
                        <p>{data?.가격}원</p>
                        <Description>
                            <p>{data.설명?.replace(/<br>/g, '\n')}</p>
                        </Description>
                        <p>{data?.상태}</p>
                    </Content>
                    {isOwner ?
                        <ButtonGroup>
                            <Button onClick={onModify}>수정</Button>
                            <Button onClick={onSoldOut}>판매완료</Button>
                        </ButtonGroup> : isLogin ?
                        <ButtonGroup>
                            <Button onClick={onChat}>채팅</Button>
                            <Button onClick={onAddCart}>담기</Button>
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