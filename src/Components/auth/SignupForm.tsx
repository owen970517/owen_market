import { SubmitHandler, useForm } from 'react-hook-form'
import { auth, db } from '../../firebase';
import { IForm } from '../../type/InputForm';
import { IProps } from '../../type/StateProps';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import ErrorMessage from './ErrorMessage';
import * as S from '../../styles/Input.styled';

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
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.TextInput {...register('name', validationRules.name)} type='text' placeholder="닉네임" isError={errors.name ? 'red' : ''}></S.TextInput>
      <ErrorMessage error={errors.name}/>
      <S.TextInput {...register('mail', validationRules.mail)} type='email' placeholder="이메일" isError={errors.mail ? 'red' : ''}></S.TextInput>
      <ErrorMessage error={errors.mail}/>
      <S.TextInput {...register('password', validationRules.password)} type='password' placeholder="비밀번호" isError={errors.password ? 'red' : ''}></S.TextInput>
      <ErrorMessage error={errors.password}/>
      <S.TextInput {...register('passwordConfirm', validationRules.passwordConfirm)} type='password' placeholder="비밀번호 확인" isError={errors.passwordConfirm ? 'red' : ''}></S.TextInput>
      <ErrorMessage error={errors.passwordConfirm}/>
      <S.SubmitButton type='submit'>회원 가입</S.SubmitButton>
    </S.FormContainer>
  )
}

export default SignupForm