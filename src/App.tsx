import Header from "./Components/Layout/Header";
import Pages from './Components/Layout/Pages';
import { BrowserRouter} from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(userActions.login({
          displayName : user.displayName,
          uid : user.uid,
        }))
      } else {
        dispatch(userActions.logout());
      } 
  })
  },[dispatch])
  return (
    <>
    <BrowserRouter>
      <Header ></Header>
      <Pages />
    </BrowserRouter>
    </>
  );
}


export default App;
