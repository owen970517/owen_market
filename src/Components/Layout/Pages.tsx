import React from "react"
import { Route, Routes } from "react-router-dom"
import Cart from "../products/Cart"
import Chat from "../products/Chat"
import Detail from "../products/Detail"
import Home from '../products/Home'
import Modify from "../products/Modify"
import Profile from "../auth/Profile"
import Search from "../products/Search"
import Sign from "../auth/Sign"
import Write from "../products/AddProduct"

function Pages() {
    return ( 
        <div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/write' element={<Write />}></Route>
                <Route path='/profile/' element={<Profile/>}></Route>
                <Route path='/detail/:id' element={<Detail />}></Route>
                <Route path='/login' element={<Sign/>}></Route>
                <Route path='/chat' element={<Chat/>}></Route>
                <Route path='/modify/:uid' element={<Modify/>}></Route>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/search/:input' element={<Search />}/>
            </Routes>
        </div>
    )
}

export default Pages