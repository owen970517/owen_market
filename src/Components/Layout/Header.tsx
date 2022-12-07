import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../../firebase";
import {useDispatch , useSelector} from 'react-redux'
import { userActions } from "../../store/userSlice";
import SearchBar from "./SearchBar";
import { RootState } from "../../store/store";
import React, { useCallback } from "react";

function Header() {
  const dispatch = useDispatch();
  const {isLogin,profileImg,user} = useSelector((state:RootState) => state.user);
  const defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  const nav = useNavigate();
  const onLogOut = useCallback(async () => {
    dispatch(userActions.logout());
    await auth.signOut();
    nav('/sign');
  },[dispatch, nav])
    return (
      <Nav>
        <h1>중고사이트</h1>
        <UL>
          <SearchBar/>
          <LI>{isLogin ? 
          <Div>
            <ProfileDiv>
              <ProfileImg src={profileImg ? profileImg : defaultImg} alt='' ></ProfileImg>
            </ProfileDiv>
            <StyledLink to='/profile' >{user.displayName}</StyledLink>
          </Div> : ""}</LI>
          <LI><StyledLink to='/' >중고거래</StyledLink></LI>
          <LI><StyledLink to='/write' >글쓰기</StyledLink></LI>
          {isLogin && <LI><StyledLink to='/cart' >장바구니</StyledLink></LI> }
          {isLogin ? <Btn onClick={onLogOut}>로그아웃</Btn> : <LI><StyledLink to='/sign' >회원가입</StyledLink></LI> }
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
  justify-content: center;
  align-items: center;
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
const ProfileDiv = styled.div`
  width : 50px;
  height : 50px;
  border-radius: 50%;
  overflow:hidden;
`
const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

`
const Div = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`

export default Header