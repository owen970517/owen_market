import { useEffect ,useState} from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../firebase";
import { RootState } from "../../store/store";
import { IForm } from "../../type/InputForm";
import { useParams } from "react-router-dom"
import { IMessage } from '../../type/messageProps';
import React from 'react';
import dayjs from 'dayjs';

const Chat = () => {
    const [chatData,setChatData] = useState<IMessage[]>([]);
    const [seller , setSeller] = useState('');
    const {register , handleSubmit,setValue} = useForm<IForm>();
    const {product} = useParams();
    const {user} = useSelector((state:RootState) => state.user)
    
    useEffect(() => {
        const getChatList = async () => {
            try {
                const result = await db.collection('chatroom').where('chatUser', 'array-contains', user.displayName).get();
                const list = result.docs.map(doc => doc.data());
                const nowChatProduct = list.filter(item => item.product === product);

                setSeller(nowChatProduct[0].chatUser.find((d:string) => d !== user.displayName))
            } catch(e) {
                console.log(e);
            }
        }
        db.collection('chatroom').doc(product).collection('messages').orderBy('date').onSnapshot((result) => {
            const message = result.docs.map(doc => ({
                ...doc.data()
            }))
            setChatData(message);
        })
        getChatList()
    },[product, user.displayName])
    const onChatSubmit:SubmitHandler<IForm> = (props) => {
        setValue('chat' , '')
        db.collection('chatroom').doc(product).collection('messages').add({
            content : props.chat,
            date : new Date(), // dayjs().toDate() 사용 가능 
            보낸사람 : user.uid
        })
    }
    return (
        <>
            <h2>{seller}님 과의 채팅방</h2>
            <ChatBox>
                <ChatList>
                    {chatData.map((item:IMessage) => {
                        return  (
                            <React.Fragment key={item.date}>
                                {item.보낸사람 === user.uid ? <Buyer>{item.content}</Buyer> :
                                    <Seller>{item.content}</Seller>
                                }
                            </React.Fragment>
                        )
                    })}
                </ChatList>
            </ChatBox>
            <ChatForm onSubmit={handleSubmit(onChatSubmit)}>
                <ChatInput {...register('chat' , {required :true })} type='text' placeholder= '메시지를 입력하시오'/>
                <button>전송</button>
            </ChatForm>
        </>
    )
}
const ChatBox = styled.div`
    width : 70%;
    height: 450px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin : 0 auto;
`;

const ChatList = styled.div`
    display :flex;
    flex-direction: column;
    align-items: flex-start; 
`;

const Buyer = styled.div`
    align-self: flex-end;
    margin-top: 10px;
    background-color: yellow;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
`;

const Seller = styled.div`
    margin-top: 10px;
    background-color: #474444;
    color : #fff;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
`;

const ChatForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`
const ChatInput =styled.input`
    width: 300px;
    height: 30px;
`

export default Chat