import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../../firebase";
import {useDispatch , useSelector} from 'react-redux'
import { userActions } from "../../store/userSlice";
import SearchBar from "./SearchBar";
import { RootState } from "../../store/store";

function Header() {
  const dispatch = useDispatch();
  const userObj = useSelector((state:RootState) => state.user);
  const nav = useNavigate();
  const onLogOut = () => {
    dispatch(userActions.logout());
    auth.signOut();
    nav('/login');
  }
    return (
      <Nav>
        <h1>중고사이트</h1>
        <UL>
          <SearchBar/>
          <LI>{userObj.isLogin ? <StyledLink to='/profile' >{userObj.user.displayName}</StyledLink> : ""}</LI>
          <LI><StyledLink to='/' >중고거래</StyledLink></LI>
          <LI><StyledLink to='/write' >글쓰기</StyledLink></LI>
          {userObj.isLogin && <LI><StyledLink to='/cart' >장바구니</StyledLink></LI> }
          {userObj.isLogin ? <Btn onClick={onLogOut}>로그아웃</Btn> : <LI><StyledLink to='/login' >회원가입</StyledLink></LI> }
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
const StyledLink = styled(Link)`
  text-decoration: none;
`

export default Header