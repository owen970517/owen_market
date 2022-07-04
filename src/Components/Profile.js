import { useState } from "react"
import { auth, db } from "../firebase";
import { useNavigate} from "react-router-dom"
function Profile({userObj}) {
    const [userName , setUserName] = useState(userObj.displayName);
    const [ userEmail , setUserEmail ] = useState(userObj.email);
    const nav = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        auth.currentUser.updateProfile({
            displayName : userName , 
            
        })
        auth.currentUser.updateEmail({
            email : userEmail,
        })
        nav('/');
    }
    const onNickname = (e) => {
        setUserName(e.target.value);
        console.log(userName)
    }
    const onEmail = (e) => {
        setUserEmail(e.target.value);
        console.log(userEmail)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                닉네임 : <input type='text' onChange={onNickname} value={userName}/>
                이메일 : <input type='text' onChange={onEmail} value={userEmail}/>
                <button onClick={onSubmit}>수정</button>
            </form>
        </div>
    )
}

export default Profile