import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Sign = () => {
    const [login , setLogin] = useState(false);
    return (
        <>
            {login ?   
                <LoginForm setLogin={setLogin}/>
                :
                <SignupForm setLogin={setLogin}/>
            }   
        </>
    )
}

export default Sign;