import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const ChatRooms = () => {
  const [chatList , setChatList] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const {user} = useSelector((state:RootState) => state.user)
  useEffect(() => {
    const getChatList = async () => {
      try {
        const result = await db.collection('chatroom').where('chatUser', 'array-contains', user.displayName).get();
        const list = result.docs.map(doc => doc.data())
        setChatList(list)
      } catch(e) {
        console.error(e);
      }
    }
    getChatList()
  },[user.displayName])

  useEffect(() => {
    const products = chatList.map((arr) => arr.product);
    const unsubscribe = products.map((product, index) =>
      db.collection('chatroom').doc(product).collection('messages').orderBy('date').onSnapshot((result) => {
        const newMessages = result.docs.map(doc => doc.data());
        const lastMessage = newMessages.pop(); 
        setMessages(prevMessages => {
          let updatedMessages = [...prevMessages];
          updatedMessages[index] = lastMessage; 
          return updatedMessages;
        });
      })
    );
  
    return () => unsubscribe.forEach(unsub => unsub());
  }, [chatList]);
  
  return (
    <ChatRoomContainer>
      {chatList.length === 0 && <h1>채팅방이 없습니다.</h1>}
      {chatList.map((chat, index) => {
        const otherUser = chat.chatUser.find((p:any) => p !== user?.displayName);
        return (
          <ChatRoomItem key={index}>
            <Link to={`/chat/${chat.product}`}>
              <span>{otherUser}</span>
            </Link>
            <h3>{messages[index]?.content}</h3>
            {dayjs(messages[index]?.date.toDate()).fromNow()}
          </ChatRoomItem>
        );
      })}
    </ChatRoomContainer>
  )
}

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  width : 70%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin : 0 auto;
`;

const ChatRoomItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width : 60%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  
  & > a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
  }

  & > h3 {
    color: #777;
    font-size: 14px;
    margin: 0;
  }
`;
export default ChatRooms