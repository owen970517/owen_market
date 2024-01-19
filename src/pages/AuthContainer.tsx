import { useState } from "react";
import LoginForm from "../Components/auth/LoginForm";
import SignupForm from "../Components/auth/SignupForm";
import styled from "styled-components";

const AuthContainer = () => {
    const [login , setLogin] = useState(true);
    return (
        <Container>
            <Wrapper>
                <Button active={!login} onClick={() => setLogin(false)}>회원가입</Button>
                <Button active={login} onClick={() => setLogin(true)}>로그인</Button>
            </Wrapper>
            {login ?   
                <LoginForm setLogin={setLogin}/>
                :
                <SignupForm setLogin={setLogin}/>
            }   
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
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;  
`
const Button = styled.button<{active:boolean}>`
    color: ${props => props.active ? '#007BFF' : '#333'};
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
    background: none;
    position: relative;
    transition: color 0.2s ease;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${props => props.active ? '100%' : '0'};
        height: 2px;
        background-color: #007BFF;
        transition: width 0.2s ease;
    }

    &:hover {
        color: #007BFF;
    }
`
export default AuthContainer;