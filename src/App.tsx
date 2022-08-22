import Header from "./Components/Header";
import Pages from './Components/Pages';
import { BrowserRouter} from "react-router-dom";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [isLogin , setIsLogin] = useState(false);
  const [userObj , setUserObj] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setIsLogin(true);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          email : user.email,
        })
      } 
  })
  },[])
  return (
    <>
    <BrowserRouter>
      <Header userObj={userObj} isLogin={isLogin}></Header>
      <Pages userObj={userObj} isLogin={isLogin}/>
    </BrowserRouter>
    </>
  );
}


export default App;
