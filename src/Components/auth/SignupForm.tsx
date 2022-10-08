import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { auth, db } from '../../firebase';
import { IForm } from '../../type/InputForm';

const SignupForm = ({setLogin} :any) => {
    const {register , handleSubmit  } = useForm<IForm>();
    const onSubmit:SubmitHandler<IForm> = async (props) => {
        await auth.createUserWithEmailAndPassword(props.mail,props.password).then((result) => {
             db.collection('user').doc(result?.user?.uid).set({
                 name : props.name,
                 email : props.mail
            })
            result?.user?.updateProfile({displayName : props.name})
        }).catch(e => console.log(e))
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <Input {...register('name' , {required :true , maxLength : 10})} type='text' placeholder="닉네임"></Input>
        <Input {...register('mail' , {required :true })} type='email' placeholder="이메일"></Input>
        <Input {...register('password' , {required :true })} type='password' placeholder="비밀번호"></Input>
        <Btn type='submit'></Btn>
    <button type='button' onClick={() => setLogin((prev:boolean) => !prev)}>로그인</button>
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
export default SignupForm