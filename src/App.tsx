import Header from "./Components/Layout/Header";
import Pages from './Components/Layout/Pages';
import { BrowserRouter} from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import React , {Suspense} from "react"
import { Helmet, HelmetProvider } from "react-helmet-async";

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
      <Suspense fallback={<div>Component Loading...</div>}>
        <HelmetProvider>
          <Helmet>
            <title>중고사이트</title>
          </Helmet>
          <Header />
          <Pages />
        </HelmetProvider>
      </Suspense>
    </BrowserRouter>
  );
}


export default App;
