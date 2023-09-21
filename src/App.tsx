import Header from "./Components/Layout/Header";
import Pages from './Components/Layout/Pages';
import { BrowserRouter} from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import React , {Suspense} from "react"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(userActions.login({
          displayName : user.displayName,
          uid : user.uid,
        }))
        dispatch(userActions.addProfileImg(user.photoURL));
        dispatch(userActions.setIsLogin(true));
      }
    })
    dispatch(userActions.setIsLogin(false));
  },[dispatch])
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header ></Header>
        <Pages />
      </Suspense>
    </BrowserRouter>
  );
}


export default App;
