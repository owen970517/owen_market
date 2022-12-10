import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Sign = () => {
    const [login , setLogin] = useState(false);
    return (
        <div>
            {login ?   
                <LoginForm setLogin={setLogin}/>
                :
                <SignupForm setLogin={setLogin}/>
            }   
        </div>
    )
}

export default Sign;