import { lazy} from "react"
import { Route, Routes } from "react-router-dom"
import Chat from "./Chat"

const Home = lazy(() =>import('../products/Home'))
const Profile = lazy(() => import("../auth/Profile"))
const AddProduct = lazy(() => import('../products/AddProduct'))
const Detail = lazy(() => import('../products/Detail'))
const Sign = lazy(() => import("../auth/Sign"))
const Modify = lazy(() => import("../products/Modify"))
const Cart = lazy(() => import("../products/Cart"))
const Search = lazy(() => import("../products/SearchedProduct"))

const Pages = () => {
    return ( 
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/write' element={<AddProduct />}></Route>
            <Route path='/profile/' element={<Profile/>}></Route>
            <Route path='/detail/:id' element={<Detail />}></Route>
            <Route path='/sign' element={<Sign/>}></Route>
            <Route path='/chat' element={<Chat/>}></Route>
            <Route path='/modify/:uid' element={<Modify/>}></Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/search/:input' element={<Search />}/>
        </Routes>
    )
}

export default Pages