import styled from "styled-components";
import Header from "./Components/Header";
import Pages from './Components/Pages';
import { BrowserRouter, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [isLogin , setIsLogin] = useState(false);
  const [userObj , setUserObj] = useState('');
  const itemlength = (x) => {
    return x;
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setIsLogin(true);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          email : user.email,
        })
        
      } else {
        setIsLogin(false);
      }
  })
  },[])
  return (
    <>
    <BrowserRouter>
      <Header userObj={userObj} isLogin={isLogin} len={itemlength}></Header>
      <Pages userObj={userObj} isLogin={isLogin} len={itemlength}/>
    </BrowserRouter>
    </>
  );
}


export default App;
