import { useState } from "react";
import LoginForm from "../Components/auth/LoginForm";
import SignupForm from "../Components/auth/SignupForm";
import styled from "styled-components";
import * as S from '../styles/ToggleBtn.styled';

const AuthContainer = () => {
    const [login , setLogin] = useState(true);
    return (
        <Container>
            <S.Wrapper>
                <S.Button active={!login} onClick={() => setLogin(false)}>회원가입</S.Button>
                <S.Button active={login} onClick={() => setLogin(true)}>로그인</S.Button>
            </S.Wrapper>
            { login ? <LoginForm/> : <SignupForm setLogin={setLogin}/> }   
        </Container>
    )
}

const Container = styled.div`   
    width : 70%;
    padding: 20px;
    border-radius: 10px;
    background-color: #f8f8f8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin : 0 auto;
    
    @media (max-width: 768px) {
        width: 90%;
        padding: 10px;

    }
`

export default AuthContainer;