import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { auth } from '../../firebase';
import { IForm } from '../../type/InputForm';
import { IProps } from '../../type/StateProps';


const LoginForm = ({setLogin}:IProps) => {
    const {register , handleSubmit  } = useForm<IForm>();
    const nav = useNavigate();
    const onLoginSubmit:SubmitHandler<IForm> = async (props) => {
        await auth.signInWithEmailAndPassword(props.mail , props.password).then(()=> {
            nav('/');
        }).catch(() => alert('아이디 또는 비밀번호가 틀렸습니다.'));
    }
  return (
    <Form onSubmit={handleSubmit(onLoginSubmit)}>
        <h1>로그인</h1>
        <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
        <Input {...register('password' , {required :true , maxLength : 10})} type='password' placeholder="비밀번호"></Input>
        <Btn type='submit'></Btn>
        <button type='button' onClick={() => setLogin((prev) => !prev)}>회원가입</button>
    </Form>
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
export default LoginForm