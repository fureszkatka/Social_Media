import React, { Component } from 'react';
import { isAuthenticated } from '../../auth';
import "./NewPost.styl"
import { useParams } from "react-router-dom"
import {createPost} from "../apiPosts"

export class NewPost extends Component {
    
    state = {
        user: {},
        title:"",
        error: "",
        loading: false,
        errors:"",
        fileSize: 0,
        port: "http://localhost:5000",
        upload: false,
        body:"",
        id: ""
    }

    

    handleChange = (name) => (e) =>{

        const value = name === 'photo' ? e.target.files[0] : e.target.value 
        
        const fileSize = name === 'photo' ? e.target.files[0].size : 0
        this.postData.set(name,value)

        this.setState({
            fileSize,
            [name]: value,
            photo: value.name
        })
    }

    click= (e) => {
        this.setState({
            error:false
        })

        let userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        createPost(userId,token,this.postData)
        .then(data =>{
            if(data.error) {{this.setState({
                errors: [data.error],
                error: true
            })
            }   
        }
            else {
               console.log("newpost: " ,data)
            }
        })
    }

    isUpload = () =>{

        this.setState({
            upload: !this.state.upload
        })

        if(this.state.upload){
            let showCreatePost = document.getElementById("showCreatePost")
            showCreatePost.classList.remove("NewPost_hide")
        }
        else{
            let showCreatePost = document.getElementById("showCreatePost")
            showCreatePost.classList.add("NewPost_hide")
        }
    }


    componentDidMount=() =>{
        this.postData = new FormData()
        console.log(this.props)
        this.setState({
            user: isAuthenticated().user,
        })
    }

    render() {
        const {id} = this.state
        return (
            <div>
                {isAuthenticated().user && isAuthenticated().user._id &&
                <div className = "NewPost_container">

                    <div id = "showCreatePost" className = "NewPost_all">
                        <div className = "NewPost_profile">
                            <img className="NewPost_profile-pic" src = {`${this.state.port}/user/photo/${isAuthenticated().user._id}`} alt="profile picture"></img>
                            <p>{isAuthenticated().user.name}</p>
                        </div>
                        <div className = "NewPost_title">
                            <label>Title:</label>
                            <input className = "NewPost_postTitle" onChange={this.handleChange("title")} type = "text"></input>
                        </div>

                        <div className = "NewPost_body-text">
                            <label>Body:</label>
                            <input className = "NewPost_postBody-text" onChange={this.handleChange("body")} type = "text"></input>
                        </div>
                        <div className = "NewPost_body-img">
                            <input className = "NewPost_postBody-img" onChange={this.handleChange("photo")} type = "file"></input>
                        </div>
                        <div style = {{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                            <button className = "NewPost_button" onClick ={this.click}>Create</button>
                        </div>
                    </div>

                </div>}
                
            </div>
        )
    }
}

const NewParams = () =>{
    const params = useParams()

    return (
        <NewPost params={params} ></NewPost>
    )
}

export default NewParams