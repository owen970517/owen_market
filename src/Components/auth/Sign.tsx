import { SubmitHandler, useForm } from "react-hook-form"
import { auth, db } from "../../firebase";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IForm } from "../../type/InputForm";

function Sign() {
    const {register , handleSubmit  } = useForm<IForm>();
    const [login , setLogin] = useState(false);
    const nav = useNavigate();
    const onSubmit:SubmitHandler<IForm> = async (props) => {
        await auth.createUserWithEmailAndPassword(props.mail,props.password).then((result) => {
             db.collection('user').doc(result?.user?.uid).set({
                 name : props.name,
                 email : props.mail
            })
            result?.user?.updateProfile({displayName : props.name})
        }).catch(e => console.log(e))
    }
    const onLoginSubmit:SubmitHandler<IForm> = async (props) => {
        await auth.signInWithEmailAndPassword(props.mail , props.password).then((result)=> {
            console.log(result.user)
            nav('/');
        }).catch(e =>  alert('아이디 또는 비밀번호가 틀렸습니다.'));
    }
    const onChangeBtn = () => {
        setLogin((prev) => !prev)
    }
    if (login) {
        window.history.pushState('','','/login')
    } else {
        window.history.pushState('','','/join')
    }
    return (
        <div>
            {login ?   
            <Form onSubmit={handleSubmit(onLoginSubmit)}>
                <h1>로그인</h1>
                <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
                <Input {...register('password' , {required :true , maxLength : 10})} type='password' placeholder="비밀번호"></Input>
                <Btn type='submit'></Btn>
                <button onClick={onChangeBtn}>회원가입</button>
            </Form> :
            <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1>회원가입</h1>
                    <Input {...register('name' , {required :true , maxLength : 10})} type='text' placeholder="닉네임"></Input>
                    <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
                    <Input {...register('password' , {required :true })} type='password' placeholder="비밀번호"></Input>
                    <Btn type='submit'></Btn>
                    <button onClick={onChangeBtn}>로그인</button>
            </Form>
            }   
        </div>
    )
}

const Form = styled.form`
    display: flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`
const Input = styled.input`
    width : 500px;
    height : 50px;
    margin : 10px 10px;
`

const Btn = styled.input`
    width : 300px;
    height : 50px;
    margin-bottom : 10px;
`
export default Sign;