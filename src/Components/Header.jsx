import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../firebase";

function Header({isLogin , userObj}) {
  const nav = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    nav('/');
  }
    return (
      <Nav>
        <h1>중고사이트</h1>
        <UL>
          <LI>{isLogin ? <Link to='/profile'>{userObj.displayName}</Link> : ""}</LI>
          <LI><Link to='/'>중고거래</Link></LI>
          <LI><Link to='/write'>글쓰기</Link></LI>
          <LI><Link to='/cart'>장바구니</Link></LI>
          {isLogin ? <Btn onClick={onLogOut}>로그아웃</Btn> : <LI><Link to='/login'>회원가입</Link></LI> }
        </UL>
      </Nav>
    )
}

const Nav = styled.div`
  display: flex;
  justify-content : space-between;
  align-items: center;
  padding :10px;
`
const UL = styled.ul`
  display:flex;
`
const LI =  styled.li`
  font-size : 20px;
  margin-left : 10px;
  list-style : none;
`
const Btn = styled.button `
  margin-left : 10px;
`


export default Header