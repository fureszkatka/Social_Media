import React from "react";
import {List} from "../apiPosts"
import "./Posts.styl"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";

export default class Posts extends React.Component{

    state ={
        posts: [],
        defaultProfile:"https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
        id: false,
        loading: true
    }

    componentDidMount =()=>{
        List().then(data => {
            if(data.error){
                console.log(data.error)
            }
            
            else{
                this.setState({
                    posts: [...data.posts],
                    loading: false
                })      
            }
        })   
    }
    render(){
            const {id,posts,defaultProfile,loading} = this.state
        return(
            <div className = "Posts_content">
                <div className = "Posts_create">
                </div>
                <div className="Posts_middle">
                {loading ? 
                <img className = "loadimg" 
                    src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif">
                </img>:
                    <>
                    <p style ={{color: "pink",fontSize:25,margin:0}}>Posts</p>
                    {posts.map((post,index)  => (
                        <div className = "Posts_elements" key = {index}>
                            {loading ?  
                            <img 
                                className = "loadimg" 
                                src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif">
                            </img>:
                            <>
                            <div className = "Post_header">
                                <div className ="Posts_title">
                                <img className="NewPost_profile-pic" 
                                    src = {`http://localhost:5000/user/photo/${post.postedBy._id}`}>
                                </img>
                                    <div className = "Posts_name">
                                        {post.postedBy.name}
                                    </div>
                                </div>
                                <p style={{marginRight:"20px",marginLeft:"40px"}}>
                                    {post.created}
                                </p>
                            </div>
                            <div className = "Posts_bodyContent">
                                <div className = "Posts_list-element">{post.title}</div>
                                <div className = "Posts_list-element">{post.body}</div>
                                <div style={{height:2, width:400,backgroundColor: "white"}}></div>
                                {post.photo && <img style={{width:"450px",height:"400px"}} src={`http://localhost:5000/post/photo/${post._id}`}></img>}
                                <Link className="Posts_view-profile" to={`/user/${post.postedBy._id}`}>View profile</Link>
                                <Link className="Posts_view-profile" to={`/singlepost/${post._id}`}>Read More</Link>
                            </div>
                            </>}
                        </div>
                        )
                    )}
                    </>}
                </div>
            </div>
        )
    }
}