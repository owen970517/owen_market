import React , { lazy} from "react"
import { Route, Routes } from "react-router-dom"
import Cart from "../products/Cart"
import Chat from "./Chat"
import Detail from "../products/Detail"
import Modify from "../products/Modify"
import Search from "../products/SearchedProduct"
import Sign from "../auth/Sign"
import AddProduct from "../products/AddProduct"

const Home = lazy(() =>import('../products/Home'))
const Profile = lazy(() => import("../auth/Profile"))

function Pages() {
    return ( 
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/write' element={<AddProduct />}></Route>
            <Route path='/profile/' element={<Profile/>}></Route>
            <Route path='/detail/:id' element={<Detail />}></Route>
            <Route path='/login' element={<Sign/>}></Route>
            <Route path='/chat' element={<Chat/>}></Route>
            <Route path='/modify/:uid' element={<Modify/>}></Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/search/:input' element={<Search />}/>
        </Routes>
    )
}

export default Pages