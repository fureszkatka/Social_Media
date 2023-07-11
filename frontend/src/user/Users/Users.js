import React from "react";
import {List} from "../apiUser"
import "./Users.styl"
import { Link } from "react-router-dom";

export default class Users extends React.Component{

    state ={
        users: [],
        id: "",
        port: "http://localhost:5000",
        loading: true,
        defaultPhoto: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
    }

    componentDidMount =()=>{
        List().then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data.users)
                this.setState({
                    users: [...data.users],
                    loading: false
                })
            }
        })
    } 

    render(){
            const {id,users,defaultPhoto,port,loading} = this.state
        return(
            <div className = "Users_content">
                
                <div className="Users_middle">
                    <p style ={{color: "pink",fontSize:25}}>Users</p>
                    {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                    <>
                        {users.map((user,index) => 
                            <div className = "Users_list-elements" key = {index}>
                                {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                                <>
                                    <div className = "Users_list-profile-name">
                                        <div ><img className = "Edit_profile-image" src= {user.photo ? `http://localhost:5000/user/photo/${user._id}` : defaultPhoto}></img></div>
                                        <div style={{color:"pink"}}>{user.name}</div>
                                    </div>
                                    <div className = "Users_list-element">{user.email}</div>
                                    <div className = "Users_list-element">{user.created}</div>
                                    <Link className="Users_view-profile" to={`/user/${user._id}`}>View profile</Link>
                                </>}
                            </div>
                        )}
                    </>}
                </div>
                
            </div>
        )
    }
}