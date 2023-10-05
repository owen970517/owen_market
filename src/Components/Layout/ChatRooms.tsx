import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { db } from '../../firebase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
        const lastMessage = newMessages.pop(); // Get the last message
        setMessages(prevMessages => {
          let updatedMessages = [...prevMessages];
          updatedMessages[index] = lastMessage; // Save only the last message
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
          </ChatRoomItem>
        );
      })}
    </ChatRoomContainer>
  )
}

const ChatRoomContainer =styled.div`
  display: flex;
  flex-direction: column;
`

const ChatRoomItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width : 70% ;
  border: 1px solid black;
  margin: 0 auto;
  margin-bottom: 10px;
`

export default ChatRooms