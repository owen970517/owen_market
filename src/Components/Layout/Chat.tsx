import { useEffect ,useState} from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../firebase";
import { RootState } from "../../store/store";
import { IForm } from "../../type/InputForm";
import { useParams } from "react-router-dom"
function Chat() {
    const [data,setData] = useState([]);
    const {register , handleSubmit,setValue} = useForm<IForm>();
    const {product} = useParams();
    const {user} = useSelector((state:RootState) =>  state.user)
    useEffect(() => {
        db.collection('chatroom').doc(product).collection('messages').onSnapshot((result) => {
            const message = result.docs.map(doc => ({
                ...doc.data()
            }))
            setData(message as any);
        })
    },[product])
    console.log(data);
    const onChatSubmit:SubmitHandler<IForm> = (props) => {
        console.log(props.chat);
        setValue('chat' , '')
        db.collection('chatroom').doc(product).collection('messages').add({
            content : props.chat,
            date : new Date(),
            보낸사람 : user.uid
        })
    }
    return (
        <>
            <ChatBox>
                <ul>
                    {data.map((item:any) => {
                        return  (
                            <div key={item.date}>
                                <Buyer><ChatContent>{item.content}</ChatContent></Buyer>
                            </div>
                        )
                    }
                    )}
                </ul>
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
  float: left;
`

const Seller = styled.li`
    float: right;
    margin-top: 10px;
    list-style: none;
`
const Buyer = styled.li`
    margin-top: 10px;

`

export default Chat