import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import styled from "styled-components";


function Chat({userObj}) {
    return (
        <>
            <ChatBox>
                <ul>
                    <Buyer><ChatContent>하이요</ChatContent></Buyer>
                    <Buyer><ChatContent>네고가능?</ChatContent></Buyer>
                    <Seller>제시요</Seller>
                </ul>
            </ChatBox>
            <div>
                <form >
                    <input type='text' placeholder= '메시지를 입력하시오'/><button>전송</button>
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
  float: left;
`

const Seller = styled.li`
    float: right;
    margin-top: 10px;

`
const Buyer = styled.li`
    margin-top: 10px;

`

export default Chat