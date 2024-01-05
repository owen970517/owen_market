import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { auth, db } from '../../firebase';
import { IForm } from '../../type/InputForm';
import { IProps } from '../../type/StateProps';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import ErrorMessage from './ErrorMessage';


const SignupForm = ({setLogin} :IProps) => {
    const dispatch = useDispatch();
    const {register , handleSubmit,reset, getValues,formState : {errors} } = useForm<IForm>();
    const onSubmit:SubmitHandler<IForm> = async (data) => {
        try {
            const result = await auth.createUserWithEmailAndPassword(data.mail, data.password);
            dispatch(userActions.setIsLogin(false)); 
            await Promise.all([
                result.user?.updateProfile({ displayName: data.name }),
                db.collection('user').doc(result.user?.uid).set({
                    name: data.name,
                    email: data.mail,
                })
            ]);
            reset();
            alert('회원가입이 완료되었습니다.');
            setLogin(prev => !prev);
        } catch (e) {
            alert('이미 존재하는 이메일입니다.');
        } 
    }
    const validationRules = {
        name: {
          required: { value: true, message: '닉네임을 입력하세요' },
          maxLength: { value: 5, message: '닉네임은 5자 이하로 입력하세요' }
        },
        mail: {
          required :{value : true , message : '이메일을 입력하세요'},
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
            message: '올바른 이메일 형식을 입력하세요',
          }
        },
        password:{
          required :{value : true , message : '비밀번호를 입력하세요'},
          pattern:{
            value: /^(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
            message:'특수문자, 대문자, 숫자를 포함하여 8자 이상 입력하시오'
            }
        },
        passwordConfirm:{
            required:{value:true,message:"비밀번호 확인은 필수 입니다."},
            validate:(value:string) => {
                return getValues("password")===value || "비밀번호가 일치하지 않습니다."
            }
        }
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <Input {...register('name', validationRules.name)} type='text' placeholder="닉네임" isError={errors.name ? 'red' : ''}></Input>
        <ErrorMessage error={errors.name}/>
        <Input {...register('mail', validationRules.mail)} type='email' placeholder="이메일" isError={errors.mail ? 'red' : ''}></Input>
        <ErrorMessage error={errors.mail}/>
        <Input {...register('password', validationRules.password)} type='password' placeholder="비밀번호" isError={errors.password ? 'red' : ''}></Input>
        <ErrorMessage error={errors.password}/>
        <Input {...register('passwordConfirm', validationRules.passwordConfirm)} type='password' placeholder="비밀번호 확인" isError={errors.passwordConfirm ? 'red' : ''}></Input>
        <ErrorMessage error={errors.passwordConfirm}/>
        <Btn type='submit'>회원 가입</Btn>
        <button type='button' onClick={() => setLogin((prev) => !prev)}>로그인</button>
    </Form>
  )
}
const Form = styled.form`
    display: flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    padding: 20px;
    border-radius: 10px;
    background-color: #f8f8f8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input<{isError : string}>`
    width : 500px;
    height : 50px;
    margin : 10px 10px;
    border-radius: 5px;
    border: 1px solid ${props => props.isError ? 'red' : '#ddd'};
    padding: 0 10px;
    font-size: 16px;
`;

const Btn = styled.button`
    width : 300px;
    height : 50px;
    margin-bottom : 10px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #0056b3;
    }
`;

export default SignupForm