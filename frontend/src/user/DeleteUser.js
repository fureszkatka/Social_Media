import { Link, Navigate } from "react-router-dom"
import React from "react"
import "./Profile/Profile.styl"
import { isAuthenticated, signout } from "../auth"
import { remove } from "./apiUser"

export default class DeleteUser extends React.Component{

    state = {
        redirect: false
    }
    
    deleteUser = () =>{
        const token = isAuthenticated().token
        let userId = this.props.userId
        remove(userId,token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                signout(() => console.log("user Deleted "))
                this.setState({
                    redirect: true
                })
            }
        })
    }

    deleteConfirmed = () =>{
        let answer = window.confirm("Are you suuuuuuuuure?")
    
        if(answer){
            this.deleteUser()
        }
    }

    
    render(){
        if(this.state.redirect){
            <Navigate to = "/"/>
        }
        return (
            <div>
                <button onClick = {this.deleteConfirmed} className = "profile_delete">
                    <Link to = "/" style={{textDecoration:"none",color: "white"}}>
                        Delete Profile
                    </Link>
                </button>
            </div>
        )
    }
}