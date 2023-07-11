import React from "react"
import ReactDOM from "react-dom"
import "./index.styl"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from "./user/Signup/Signup"
import Home from "./core/Home"
import Menu from "./core/Menu"
import Signin from "./user/Signin/Signin"
import Profile from "./user/Profile/Profile"
import Users from "./user/Users/Users"
import FindPeople from "./user/FindPeople/FindPeople"
import EditProfile from "./user/EditProfile/EditProfile"
import PrivateRoutes from "./auth/PrivateRoutes"
import SinglePost from "./post/SinglePost/SinglePost"
import EditPost from "./post/EditPost/EditPost"
import { NewPost } from "./post/NewPost/NewPost"

const root = document.getElementById("root")

export default class App extends React.Component{


    render(){
        return(
            <div className = "Rout_Links">
                <BrowserRouter>
                    <Menu></Menu>
                    <Routes className="Routes">
                        <Route  path = "/" element={<Home />}/>
                        <Route  path = "/signup" element={<Signup />} />
                        <Route  path = "/signin" element={<Signin />} />
                        <Route  path = "/user/edit/:userId" element={<PrivateRoutes><EditProfile/></PrivateRoutes>}/>
                        <Route  path = "/user/:userId" element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
                        <Route  path = "/users" element={<Users/>}/> 
                        <Route  path = "/findpeople" element={<PrivateRoutes><FindPeople/></PrivateRoutes>}/>  
                        <Route  path = "/singlepost/:postId" element={<SinglePost/>}/>  
                        <Route  path = "/edit/:postId" element={<PrivateRoutes><EditPost/></PrivateRoutes>}/> 
                        <Route  path = "/post/create/:userId" element={<PrivateRoutes><NewPost/></PrivateRoutes>}/>               
                    </Routes>
                    <footer className = "Index_footer">this is the footer area</footer>
                </BrowserRouter>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    root
)




