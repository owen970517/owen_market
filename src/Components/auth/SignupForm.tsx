import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { auth, db } from '../../firebase';
import { IForm } from '../../type/InputForm';
import { IProps } from '../../type/StateProps';

const SignupForm = ({setLogin} :IProps) => {
    const {register , handleSubmit , getValues,formState : {errors} } = useForm<IForm>();
    const onSubmit:SubmitHandler<IForm> = async (props) => {
        await auth.createUserWithEmailAndPassword(props.mail,props.password).then((result) => {
            result?.user?.updateProfile({displayName : props.name})
            db.collection('user').doc(result?.user?.uid).set({
                name : props.name,
                email : props.mail
            })
            alert('회원가입이 완료되었습니다.')
        }).catch(e => alert('이미 존재하는 이메일입니다.'))
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <Input {...register('name' , {required :true , maxLength : {
            value : 5,
            message : '닉네임은 5자 이하로 입력하시오'
        }})} type='text' placeholder="닉네임"></Input>
        {errors.name?.type==='required' && <p style={{color :'red'}}>닉네임을 설정하시오</p>}
        {errors.name?.type==='maxLength' && <p style={{color : 'red'}}>{errors.name.message}</p>}
        <Input {...register('mail' , {
            required :true ,             
            pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: '올바른 이메일 형식을 입력하시오',
            }})} type='email' placeholder="이메일"></Input>
            {errors.mail?.type === 'required' && <p style={{color :'red'}}>이메일을 입력하시오</p>}
            {errors.mail?.type==='pattern' && <p style={{color : 'red'}}>{errors.mail.message}</p>}
        <Input {...register('password' , {
            required :true,              
            pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                message: '특수문자 , 대문자 , 숫자를 포함하시오',
            }})} type='password' placeholder="비밀번호"></Input>
            {errors.password?.type==='required' && <p style={{color : 'red'}}>비밀번호를 입력하시오</p>}
            {errors.password?.type==='pattern' && <p style={{color : 'red'}}>{errors.password.message}</p>}
        <Input {...register('passwordConfirm' , {
            required :true,              
            validate : {
                matchPassword : (value) => {
                    const {password} = getValues();
                    return password ===value || "비밀번호가 일치하지 않습니다."
                }
            }
        })} type='password' placeholder="비밀번호 확인"></Input>
        {errors.passwordConfirm?.type==='required' && <p style={{color : 'red'}}>비밀번호를 입력하시오</p>}
        {errors.passwordConfirm && <p style={{color : 'red'}}>{errors.passwordConfirm.message}</p>}
        <Btn type='submit'></Btn>
    <button type='button' onClick={() => setLogin((prev) => !prev)}>로그인</button>
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