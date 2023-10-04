import { lazy} from "react"
import { Route, Routes } from "react-router-dom"
import Chat from "./Chat"
import ChatRooms from "./ChatRooms"
import { ROUTES } from "../../constants/routes"

const Home = lazy(() =>import('../products/Home'))
const Profile = lazy(() => import("../auth/Profile"))
const AddProduct = lazy(() => import('../products/AddProduct'))
const Detail = lazy(() => import('../products/Detail'))
const Sign = lazy(() => import("../auth/AuthContainer"))
const Modify = lazy(() => import("../products/Modify"))
const Cart = lazy(() => import("../products/Cart"))
const Search = lazy(() => import("../products/SearchedProduct"))

const Pages = () => {
    return ( 
        <Routes>
          <Route path={ROUTES.HOME} element={<Home/>} />
          <Route path={ROUTES.WRITE} element={<AddProduct />} />
          <Route path={ROUTES.PROFILE} element={<Profile/>} />
          <Route path={ROUTES.DETAIL} element={<Detail />} />
          <Route path={ROUTES.SIGN} element={<Sign/>} />
          <Route path={ROUTES.CHATROOMS} element={<ChatRooms/>}/>
          <Route path={ROUTES.CHAT_PRODUCT} element={<Chat/>}/>
          <Route path={ROUTES.MODIFY_UID }element={<Modify/>}/>
          <Route path={ROUTES.CART }element={<Cart />}/>
          <Route path={ROUTES.SEARCH} element={<Search />}/>
        </Routes>
    )
}

export default Pages