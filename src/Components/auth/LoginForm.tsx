import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { IForm } from '../../type/InputForm';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import * as S from '../../styles/Input.styled';

const LoginForm = () => {
  const dispatch = useDispatch();
  const {register , handleSubmit  } = useForm<IForm>();
  const nav = useNavigate();
  const onLoginSubmit: SubmitHandler<IForm> = async (data) => {
    try {
      const result = await auth.signInWithEmailAndPassword(data.mail, data.password);
      dispatch(userActions.setIsLogin(true));
      dispatch(userActions.login({
        displayName : result.user?.displayName,
        uid : result.user?.uid
      }))
      nav('/');
    } catch (error) {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    } 
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onLoginSubmit)}>
      <S.TextInput {...register('mail' , {required :true })} type='email' placeholder="이메일"></S.TextInput>
      <S.TextInput {...register('password' , {required :true , minLength : 6})} type='password' placeholder="비밀번호"></S.TextInput>
      <S.SubmitButton type='submit'>로그인</S.SubmitButton>
    </S.FormContainer>
  )
}

export default LoginForm

