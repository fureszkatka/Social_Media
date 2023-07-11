import React, { Component } from 'react';
import {useParams} from "react-router-dom"
import {posts,removePost,like,unlike} from "../apiPosts"
import "./SinglePost.styl"
import {Link} from "react-router-dom"
import { isAuthenticated } from '../../auth';
import {Navigate} from "react-router-dom"
import "../../user/Signup/Signup.styl"

class SinglePost extends Component {

    state = {
        title: "",
        body: "",
        photo: "",
        post: "",
        id: "",
        postedBy: "",
        delete: false  ,
        redirect: false,
        loading: true,
        port: "http://localhost:5000",
        like: false,
        likes: 0
    }

    componentDidMount = () =>{
        let postId = this.props.params.postId
        posts(postId).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                this.setState({
                    title: data.title,
                    body: data.body,
                    photo: data.photo|| false,
                    id: data._id,
                    postedBy: data.postedBy,
                    loading: false,
                })
            }
        })
    }


    deletePost = () =>{
        let postId = this.props.params.postId
        const token = isAuthenticated().token

        let answer = window.confirm("Are you suuuuuuuuure?")
    
        if(answer){
            removePost(postId, token).then(data =>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    this.setState({
                        delete: true,
                        redirect: true
                    })
                }
            })
        }
    }

    unlike = () =>{
        this.setState({
            like: !this.state.like
        })
    }

    like = () =>{
        this.setState({
            like: !this.state.like
        })
    }

    render() {
        const {redirect,title,body,photo,id,postedBy,port,loading,like} = this.state
        return (
            <div className = "Single_content">
                {redirect && <Navigate to="/"/>}
                <div className = "Single_title">
                    {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                    <>
                        <img style={{width:"50px",height:"50 px"}} src = {`http://localhost:5000/user/photo/${postedBy._id}`}></img>
                        <Link style={{textDecoration:"none",color:"white"}} className="Posts_view-profile" to={`/user/${postedBy._id}`}>{postedBy.name}</Link>
                        <p className="Single_name">{title}</p>
                    </>}
                </div>
                
                <div className = "Single_body">
                    {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                        <>
                        <p>{body}</p>
                        <div className ="Single_photo">
                            {photo && <img style={{width:"450px",height:"400px"}} src={`http://localhost:5000/post/photo/${id}`}></img>}
                        </div>  
                    </>}
                </div>
                
                {isAuthenticated().user &&
                    isAuthenticated().user._id == postedBy._id &&
                    <div className="Single_buttons">
                        <Link style = {{textDecoration: "none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:25}} to = {`/edit/${id}`} className="Single_update">Update</Link>
                        <button onClick={this.deletePost} className="Single_delete">Delete</button>
                    </div>
                }
                {!isAuthenticated().user &&

                    <div>
                        {like ? 
                            <i onClick={this.unlike} class="fa-solid fa-heart"></i>:
                            <i onClick={this.like} class="fa-regular fa-heart"></i>
                        }
                    </div>

                }

            </div>
        );
    }
}

const lookpost = () =>{
    const params = useParams()

    return (
        <SinglePost params={params}></SinglePost>
    )
}

export default lookpost