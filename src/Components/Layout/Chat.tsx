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
            date : new Date(),
            보낸사람 : user.uid
        })
    }

    return (
        <>
            <h1>{seller}님 과의 채팅방</h1>
            <ChatBox>
                <ChatList>
                    {chatData.map((item:IMessage) => {
                        return  (
                            <React.Fragment key={item.date}>
                                {item.보낸사람 === user.uid ? <Buyer><ChatContent>{item.content}</ChatContent></Buyer> :
                                    <Seller><ChatContent>{item.content}</ChatContent></Seller>
                                }
                            </React.Fragment>
                        )
                    })}
                </ChatList>
            </ChatBox>
            <div>
                <form onSubmit={handleSubmit(onChatSubmit)}>
                    <input {...register('chat' , {required :true })} type='text' placeholder= '메시지를 입력하시오'/><button>전송</button>
                </form>
            </div>
        </>
        
    )
}

const ChatBox = styled.div`
  height: 450px;
  overflow-y: scroll;
  padding: 10px;
  background-color: whitesmoke;
`
const ChatContent = styled.span`
    background: #eee;
  padding: 5px;
  border-radius: 5px;

`

const ChatList = styled.ul`
    display :flex;
    flex-direction: column;
    align-items: flex-start; 
`

const Buyer = styled.li`
    align-self: flex-end;
    margin-top: 10px;
    list-style: none;
`
const Seller = styled.li`
    margin-top: 10px;
`

export default Chat