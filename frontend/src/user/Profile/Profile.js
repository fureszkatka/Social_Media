import React from "react";
import { isAuthenticated } from "../../auth";
import "./Profile.styl"
import {Navigate,Link} from "react-router-dom"
import {Read} from "../apiUser"
import DeleteUser from "../DeleteUser";
import { useParams } from "react-router-dom"
import FollowUser from "../FollowUser/FollowUser";
import ProfileTabs from "../ProfileTabs/ProfileTabs";
import {ListByUser} from "../../post/apiPosts.js"

class Profile extends React.Component{
    
    state ={
        user: {following: [], followers: []},
        redirectToSignin: false,
        id: "",
        loading: true,
        defaultProfile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        following: false,
        posts:[]
    }

    

    init = (userId) =>{
        const token = isAuthenticated().token
        Read(userId,token)
        
        .then(data=> {
            if(data.error){
                console.log("error")
            }
            else{
                let following = this.checkFollow(data)
                this.setState({
                    user: data,
                    following
                })
                this.loadPost(data._id)
            }
        })
    }


    loadPost = (userId) =>{
        const token = isAuthenticated().token
        ListByUser(token,userId).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({
                    posts: data,
                    loading: false
                })
            }
        })
    }

    componentDidMount=()=>{
        let userId = this.props.params.userId
        this.init(userId)
        this.setState({
            loading: true,
            id: userId
        })
    }
    componentWillReceiveProps = (props) =>{
        let userId = this.props.params.userId
        this.init(userId)
        this.setState({
            loading: true,
            id: userId
        })
    }

    checkFollow = (user) =>{
        const jwt = isAuthenticated()
        const match = user.followers.find(follower =>{
            return follower._id === jwt.user._id
        })
        return match
    } 

    clickFollow = apiCall => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        apiCall(userId, token, this.props.params.userId)
        .then(data => {
            if(data.error){
                this.setState({error: data.error})

            } else {
                this.setState({user: data, following: !this.state.following})
            }
        })
    }

    render(){
        const {defaultProfile,photo,redirectToSignin,user,id,posts,loading} = this.state
        const photoUrl = this.props.params.userId ? `http://localhost:5000/user/photo/${id}`: defaultProfile
        
        return(
            <div className = "profile_container">
                <div className = "profile_content">
                    <div className = "Posts_create">
                        <Link to ={`/post/create/${isAuthenticated().user._id}`} className = "Posts_create-butt">Create Post</Link>
                    </div>
                    {redirectToSignin &&(
                        <Navigate to="/signin" replace = {false} />
                    )}
                    <div>
                        {this.state.loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:<p></p>}
                    </div>
                    <div className = "profile_title">
                        <div>
                            <img className = "Edit_profile-image" src= { photoUrl }></img>
                        </div>
                        <p style ={{margin:0,marginLeft: 10}}>{user.name}</p>

                    </div>
                    
                    <div className = "Profile_data">
                        <div className = "profile_name">
                            <p>Name: </p> 
                            <p>{user.name}</p>
                        </div>

                        <div style={{display:"flex",justifyContent:"center"}}>
                            <div style={{margin:0,width:300,height:1,backgroundColor: "white", borderRadius:"70%"}}></div>
                        </div>

                        <div className = "profile_email">
                            <p>Email:</p> 
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <p>{user.about}</p>
                        </div>

                        <div style={{display:"flex",justifyContent:"center"}}>
                            <div style={{margin:0,width:300,height:1,backgroundColor: "white", borderRadius:"70%"}}></div>
                        </div>

                        <div>
                            <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                        </div>

                        <div>
                            {isAuthenticated().user &&
                            isAuthenticated().user._id !== user._id &&
                                <FollowUser onButtonClick = {this.clickFollow} isFollow= {this.state.following}></FollowUser>
                            }
                        </div>

                        <div>
                            {isAuthenticated().user && 
                                isAuthenticated().user._id == user._id && (
                                <div className = "profile_edit-delete-button">
                                    <button className = "profile_edit"><Link to={`/user/edit/${isAuthenticated().user._id}`} style={{textDecoration:"none",color: "white"}}>Edit Profile</Link></button>
                                    <DeleteUser userId = {user._id}></DeleteUser>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className = "ProfileTab_container">
                    <ProfileTabs 
                        loading = {loading}
                        followers = {this.state.user.followers} 
                        following = {this.state.user.following}
                        posts = {posts}
                        >
                    </ProfileTabs>
                </div>
                
            </div>
        )
    }
}

const GetParams = () =>{
    const params = useParams()

    return (
        <Profile params={params} ></Profile>
    )
}

export default GetParams