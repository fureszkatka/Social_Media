import React from "react";
import {useLocation, useNavigate,Link} from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import "./Menu.styl"

class Menu extends React.Component{

    
    state = {
        auth: false,
        userId: ""
    }
    
    componentDidMount = () => {

    }

    Signout_cursorOver = () =>{
        let Signout_cursor = document.getElementById("Signout_cursor")
        Signout_cursor.classList.add("point")
    }
    
    Signout_cursorOut = () =>{
        let Signout_cursor = document.getElementById("Signout_cursor")
        Signout_cursor.classList.remove("point")
    }
    
    isActive = (path) =>{
        if(this.props.location.pathname === path) return {color:"cyan", BackgroundColor: "blue"}
            else return {color: "purple"}
    }

    render(){
            const {auth,userId} = this.state
        return(
            <div className = "Menu_Content">
                <ul className = "Menu_Links">
                
                    <li><Link  style={this.isActive("/")} className = "Menu_Link" to="/">Home</Link></li>

                    {!isAuthenticated() && (
                    <div className = "Menu_depend_Links">
                        <li><Link style={this.isActive("/signin")} className = "Menu_Link" to="/signin">Singin</Link></li>
                        <li><Link style={this.isActive("/signup")} className = "Menu_Link" to="/signup">Signup</Link></li>
                    </div>
                    )}

                    {isAuthenticated() && (                                                                                                                                       
                        <div className = "Menu_signout-profile">                                                                                                                                                       
                            <li style = {this.isActive("/signin")} id ="Signout_cursor" onMouseOut = {this.Signout_cursorOut} onMouseOver = {this.Signout_cursorOver} onClick = {() => signout(() => this.props.navigate("/signin"))} className="Menu_signout_button">Signout</li>
                            <li ><Link className="Menu_link-profile" to={`/user/${isAuthenticated().user._id}`} style = {{marginLeft:20}}>{`${isAuthenticated().user.name}'s profile`}</Link></li>
                        </div>
                    )}

                    <div style ={this.isActive("/users")} className = "Menu_users_profile"><Link style = {{textDecoration: "none",color: "inherit"}} to = "/users">Users</Link></div>        
                
                </ul>
                
            </div>
        )
    }
}    

const MenuWithLocation =(props)=>{
    const location = useLocation()
    const navigate = useNavigate()

    return <Menu location={location} navigate={navigate} {...props}/>
}

export default MenuWithLocation