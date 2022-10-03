import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./Cart"
import Chat from "./Chat"
import Detail from "./Detail"
import Home from './Home'
import Modify from "./Modify"
import Profile from "./Profile"
import Search from "./Search"
import Sign from "./Sign"
import Write from "./Write"

function Pages({userObj , isLogin }) {
    return ( 
        <div>
            <Routes>
                <Route path='/' element={<Home userObj={userObj}/>}></Route>
                <Route path='/write' element={<Write userObj={userObj} isLogin = {isLogin}/>}></Route>
                <Route path='/profile/' element={<Profile userObj={userObj}/>}></Route>
                <Route path='/detail/:id' element={<Detail userObj={userObj}/>}></Route>
                <Route path='/login' element={<Sign/>}></Route>
                <Route path='/chat' element={<Chat userObj={userObj}/>}></Route>
                <Route path='/modify/:uid' element={<Modify/>}></Route>
                <Route path='/cart' element={<Cart userObj={userObj}/>}/>
                <Route path='/search/:input' element={<Search />}/>
            </Routes>
        </div>
    )
}

export default Pages