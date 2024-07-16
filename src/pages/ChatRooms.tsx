import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { ChatProps, MessageProps } from '../type/Chat'
import Title from '../Components/common/Title'

dayjs.extend(relativeTime);
dayjs.locale("ko");

const ChatRooms = () => {
  const [chatList , setChatList] = useState<ChatProps[]>([]);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const {user} = useSelector((state:RootState) => state.user)
  useEffect(() => {
    const getChatList = db.collection('chatroom').where('chatUser', 'array-contains', user.displayName)
      .onSnapshot((snapshot) => {
        const list = snapshot.docs.map(doc => doc.data());
        setChatList(list);
      }, (error) => {
        console.error(error);
      });

    return () => {
      getChatList();
    };
  }, [user.displayName]);

  useEffect(() => {
    const products = chatList.map((arr) => arr.product);
    const unsubscribe = products.map((product, index) =>
      db.collection('chatroom').doc(product).collection('messages').orderBy('date').onSnapshot((result) => {
        const newMessages = result.docs.map(doc => doc.data());
        const lastMessage = newMessages.pop(); 
        if (lastMessage) {
          setMessages(prevMessages => {
            let updatedMessages = [...prevMessages];
            updatedMessages[index] = lastMessage; 
            return updatedMessages;
          });
        }
      })
    );
    return () => unsubscribe.forEach(unsub => unsub());
  }, [chatList]);

  const onDelete = async (id : string) => {
    const ok = window.confirm("채팅방을 나가면 대화 목록이 사라집니다. 나가시겠어요?");
    if (ok) {
      const chatRoomRef = db.collection('chatroom').doc(id)
      const messageRef = chatRoomRef.collection('messages')
      const messagesSnapshot = await messageRef.get();
      messagesSnapshot.forEach((doc) => {
        doc.ref.delete();
      });
      await chatRoomRef.delete()
    }
  };

  return (
    <>
      <Title title='채팅방'/>
      <ChatRoomContainer>
        {chatList.length === 0 && <h1>채팅방이 없습니다.</h1>}
        {chatList.map((chat, index) => {
          const otherUser = chat.chatUser?.find((p) => p !== user.displayName)
          return (
            <ChatRoomItem key={index}>
              <ChatInfo>
                <Link to={`/chat/${chat.product}`} >{otherUser}</Link>
                <span>{dayjs(messages[index]?.date).fromNow()}</span>
              </ChatInfo>
              <p>{messages[index]?.content}</p>
              <OutBtn onClick={() => onDelete(chat.product!)}>나가기</OutBtn>
            </ChatRoomItem>
          );
        })}
      </ChatRoomContainer>
    </>
  )
}

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  width : 70%;
  padding : 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin : 0 auto;

  @media (max-width:768px) {
    h1 {
      font-size: 16px;
    }
  }
`;

const ChatRoomItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width : 60%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-decoration: none;

  & > p {
    font-size: 17px;
  }

  @media (max-width:768px) {
    span {
      font-size: 12px;
    }
  }
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
  & > span {
    color: #333;
    text-decoration: none;
    font-weight: bold;
  }
  & > a {
    text-decoration: none;
    color: #777;
    font-size: 20px;
    margin-right : 10px;
  }
`

const OutBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  background-color: red;
  color : #fff;
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  position: absolute;
  right: 20px;
  top : 25px;

  @media (max-width:768px) {
    font-size: 12px;
    right: 10px;
  }
`

export default ChatRooms