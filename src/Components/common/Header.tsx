import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../../firebase";
import {useDispatch , useSelector} from 'react-redux'
import { userActions } from "../../store/userSlice";
import SearchBar from "./SearchBar";
import { RootState } from "../../store/store";
import { useCallback, useState } from "react";
import { IStyleProps } from '../../type/StyleProps';
import Hamburger from '../../assets/Hamburger_icon.svg'
import times from '../../assets/times.svg'
import { defaultImg } from "../../constants/user";

const Header = () => {
  const [isopen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {isLogin,profileImg,user} = useSelector((state:RootState) => state.user);
  const nav = useNavigate();
  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    dispatch(userActions.searchToggle(false))
  };
  const onLogOut = useCallback(async () => {
    await auth.signOut();
    setIsOpen((prev) => !prev);
    dispatch(userActions.logout());
    dispatch(userActions.setIsLogin(false));
    nav('/sign');
  },[dispatch, nav])

  return (
    <HeaderContainer>
      <h1>Logo</h1>
      <HeaderList isopen={isopen }>
        <HeaderItem><SearchBar/></HeaderItem>
        <HeaderItem>
          {isLogin ? 
            <ProfileWrapper>
              <ProfileImageWrapper>
                <ProfileImg src={profileImg ? profileImg : defaultImg } alt='프로필 이미지'/>
              </ProfileImageWrapper>
              <StyledLink to='/profile' onClick={handleToggleOpen}>{user.displayName}</StyledLink>
            </ProfileWrapper> : ""
          }
        </HeaderItem>
        <HeaderItem><StyledLink to='/' onClick={handleToggleOpen}>중고거래</StyledLink></HeaderItem>
        <HeaderItem><StyledLink to='/write' onClick={handleToggleOpen}>상품 등록</StyledLink></HeaderItem>
        {isLogin && <HeaderItem><StyledLink to='/cart' onClick={handleToggleOpen}>관심목록</StyledLink></HeaderItem> }
        {isLogin && <HeaderItem><StyledLink to='/chatrooms' onClick={handleToggleOpen}>채팅방</StyledLink></HeaderItem> }
        {isLogin ? <HeaderItem><LogoutBtn onClick={onLogOut}>로그아웃</LogoutBtn></HeaderItem> : <HeaderItem><StyledLink to='/sign' onClick={handleToggleOpen}>로그인</StyledLink></HeaderItem> }
      </HeaderList>
      { isopen ?  <img src={times} className="ham" onClick={handleToggleOpen} alt='asdsa' style={{width :'40px', height : '40px'}}/> : <img className="ham" src={Hamburger} alt='햄버거' onClick={handleToggleOpen}/>}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  background-color: #74c0fc;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .ham {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 45px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .ham {
      display : block;
    }
  }
`
const HeaderList = styled.ul`
  display:flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: ${(props:IStyleProps) => (props.isopen ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`
const HeaderItem =  styled.li`
  font-size : 20px;
  list-style : none;
  display: block;
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`

const LogoutBtn = styled.button`
  background-color: #0056b3; 
  color : #ffffff; 
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  
  &:hover {
    background-color: #007BFF; 
    color: #ffffff;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color : #000;
  display: block;
  padding: 10px;
  &:hover {
    color : #fff;
  }
`
const ProfileWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`
const ProfileImageWrapper = styled.div`
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

export default Header