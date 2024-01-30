import Header from "./Components/common/Header";
import Pages from './pages/Pages';
import { BrowserRouter} from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import React , {Suspense} from "react"
import { Helmet, HelmetProvider } from "react-helmet-async";
import LoadingSpinner from "./Components/common/LoadingSpinner";

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
      <Suspense fallback={<LoadingSpinner/>}>
        <HelmetProvider>
          <Helmet>
            <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
            <link rel="preconnect" href="https://firestore.googleapis.com" />
            <link rel="preconnect" href="https://identitytoolkit.googleapis.com" />
            <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
            <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
            <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
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
