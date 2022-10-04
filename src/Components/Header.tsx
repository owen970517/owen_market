import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../firebase";
import { useForm } from "react-hook-form";

 interface IProps {
  isLogin : boolean;
  userObj : {
    displayName : string;
    uid : string;
    email :string;
  }
} 
interface IFrom {
  search : string
}

function Header({isLogin , userObj}:any) {
  const {register , handleSubmit , setValue} = useForm<IFrom>();
  const nav = useNavigate();
  const onLogOut = () => {
    auth.signOut();
    nav('/login');
  }
  const onSearch = handleSubmit((e) => {
    nav('/search/' + e.search)
    setValue('search' , '')
})
    return (
      <Nav>
        <h1>중고사이트</h1>
        <UL>
          <form onSubmit={onSearch}>
            <input {...register("search" , {required : true})} placeholder='찾을 상품 입력하시오'></input>
          </form>
          <LI>{isLogin ? <Link to='/profile'>{userObj.displayName}</Link> : ""}</LI>
          <LI><Link to='/'>중고거래</Link></LI>
          <LI><Link to='/write'>글쓰기</Link></LI>
          {isLogin && <LI><Link to='/cart'>장바구니</Link></LI> }
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