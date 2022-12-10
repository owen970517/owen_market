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
    const nicknameValidate = register('name' , {
        required :{value : true , message : '닉네임을 입력하시오'} , 
        maxLength : {
            value : 5,
            message : '닉네임은 5자 이하로 입력하시오'
        }
    })
    const emailValidate = register('mail' , {
        required :{value : true , message : '이메일을 입력하시오'} ,             
        pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
            message: '올바른 이메일 형식을 입력하시오',
        }})
    const passwordValidate = register('password' , {
        required :{value : true , message : '비밀번호를 입력하시오'},              
        pattern: {
            value: /^(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
            message: '특수문자 , 대문자 , 숫자를 포함하시오',
        }})
    const passwordCheckValidate = register('passwordConfirm' , {
        required :{value : true , message : '비밀번호를 입력하시오'},              
        validate : {
            matchPassword : (value) => {
                const {password} = getValues();
                return password ===value || "비밀번호가 일치하지 않습니다."
            }
        }
    })
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <Input {...nicknameValidate} type='text' placeholder="닉네임" isError={errors.name ? 'red' : ''}></Input>
        {errors.name && <p style={{color : 'red'}}>{errors.name.message}</p>}
        <Input {...emailValidate} type='email' placeholder="이메일" isError={errors.mail ? 'red' : ''}></Input>
        {errors.mail && <p style={{color : 'red'}}>{errors.mail.message}</p>}
        <Input {...passwordValidate} type='password' placeholder="비밀번호" isError={errors.password ? 'red' : ''}></Input>
        {errors.password && <p style={{color : 'red'}}>{errors.password.message}</p>}
        <Input {...passwordCheckValidate} type='password' placeholder="비밀번호 확인" isError={errors.passwordConfirm ? 'red' : ''}></Input>
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
const Input = styled.input<{isError : string}>`
    width : 500px;
    height : 50px;
    margin : 10px 10px;
    border-color: ${props => props.isError};
`

const Btn = styled.input`
    width : 300px;
    height : 50px;
    margin-bottom : 10px;
`
export default SignupForm