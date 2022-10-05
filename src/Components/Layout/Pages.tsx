import React from "react"
import { Route, Routes } from "react-router-dom"
import { IUserObj } from "../../type/UserProps"
import Cart from "../products/Cart"
import Chat from "../products/Chat"
import Detail from "../products/Detail"
import Home from '../products/Home'
import Modify from "../products/Modify"
import Profile from "../auth/Profile"
import Search from "../products/Search"
import Sign from "../auth/Sign"
import Write from "../products/AddProduct"

function Pages({userObj , isLogin }:IUserObj) {
    return ( 
        <div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
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