import React from "react";
import {findPeople} from "../apiUser"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";

export default class FindPeople extends React.Component{

    state ={
        users: [],
        defaultProfile:"/home/katka/Asztal/ca52e6e168595f767c2121a68cc227b0.jpg",
        id: ""
    }

    componentDidMount =()=>{
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        findPeople(userId,token).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                let data1 = data.users 
                this.setState({
                    users: [...data1]
                })
                console.log(this.state.users)
            }
        })
    } 

    render(){
            const {id,users,defaultProfile} = this.state
        return(
            <div className = "Users_content">
                <div className="Users_middle">
                    <p style ={{color: "pink",fontSize:25}}>Users</p>
                    {users.map((user,index) => 
                        <div className = "Users_list-elements" key = {index}>
                            <div className = "Users_list-profile-name">
                                <div ><img className = "Edit_profile-image" src= {user._id ? `http://localhost:5000/user/photo/${user._id}` : defaultProfile}></img></div>
                                <div style={{color:"pink"}}>{user.name}</div>
                            </div>
                            <div className = "Users_list-element">{user.email}</div>
                            <div className = "Users_list-element">{user.created}</div>
                            <Link className="Users_view-profile" to={`/user/${user._id}`}>View profile</Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}