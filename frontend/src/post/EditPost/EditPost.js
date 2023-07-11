import React, { Component } from 'react';
import {Link, useParams} from "react-router-dom"
import { isAuthenticated } from '../../auth';
import { posts, updatePost } from '../apiPosts';
import "./EditPost.styl"

export class EditPost extends Component {

    state={
        title:"",
        body: "",
        photo: "",
        redirect: false,
        id: "",
        postedBy: "",
        fileSize:"",
        loading: true
    }

    componentDidMount = () =>{
        let postId = this.props.params.postId
        this.postData = new FormData()

        posts(postId).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                this.setState({
                    title: data.title,
                    body: data.body,
                    photo: data.photo.data|| false,
                    id: data._id,
                    postedBy: data.postedBy,
                    loading: false
                })
            }
        })
    }

    handleChange = (name) => (e) =>{

        const value = name === 'photo' ? e.target.files[0] : e.target.value 
        
        this.postData.set(name,value)

        this.setState({
            [name]: value,
        })
    }

    updatePost = ()=>{
        let token = isAuthenticated().token
        let postId = this.state.id

        updatePost(postId,token,this.postData)
    }


    render() {
        const {title, body, photo,redirect,postedBy,id,loading} = this.state

        return (
            
            <div className = "EditPost_content">
                {redirect && <Navigate to="/"/>}
                <div style={{marginTop:10,display:"flex",alignItems:"center"}}>
                    {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                    <>
                        <img style={{width:"50px",height:"50px",marginRight: 5}} src = {`http://localhost:5000/user/photo/${postedBy._id}`}></img>
                        <Link style={{textDecoration:"none",color:"white"}} className="Posts_view-Post" to={`/user/${postedBy._id}`}>{postedBy.name}</Link>
                    </>}
                </div>
                <div className = "EditPost_title">
                    {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                    <>
                        <p style={{width: "90px"}}>Header</p>
                        <textarea className = "EditPost_input" onChange={this.handleChange("title")} type="text" value={title} />
                    </>}
                </div>
                
                <form>
                <div className = "EditPost_body">
                    {loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:
                    <>
                        <div className = "EditPost_body-content">
                            <p style={{width: "90px"}}>Body</p>
                            <textarea className = "EditPost_input" onChange={this.handleChange("body")} type="text" value={body} />
                        </div>
                        <div className="EditPost_photo">
                            <input onChange={this.handleChange("photo")} type="file"/>
                        </div>
                        {photo &&
                            <img style={{width:"250px",height:"200px"}} src = {`http://localhost:5000/post/photo/${id}`}></img>    
                        }
                    </>}
                </div>
                <div>
                    <button className="EditPost_button" onClick={this.updatePost}>Update</button>
                </div>
                </form>
            </div>
        );        
    }
}

const EditPosts = () =>{
    const params = useParams()

    return (
        <EditPost params={params} ></EditPost>
    )
}

export default EditPosts


