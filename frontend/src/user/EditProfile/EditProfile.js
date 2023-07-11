import React from "react";
import {useState} from "react"
import { isAuthenticated } from "../../auth";
import "./EditProfile.styl"
import {useParams} from "react-router-dom"
import {Read,Update, updateUser} from "../apiUser"


class EditProfile extends React.Component{

    state={
        id:"",
        name:"",
        email:"",
        password: "Sutisegg12",
        redirectProfile: false,
        visibility: "visibility",
        message: "",
        errors:[],
        error:false,
        photo: '',
        fileSize: 0,
        defaultProfile: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
        about:""
    }

    handleChange = (name) => (e) =>{

        const value = name === 'photo' ? e.target.files[0] : e.target.value 
        
        const fileSize = name === 'photo' ? e.target.files[0].size : 0
        this.userData.set(name,value)


        this.setState({
            [name]: value,
            fileSize: value.size,
            photo: value.name
        })
    }


    componentDidMount=()=>{
        this.userData = new FormData()
        let userId = isAuthenticated().user._id

        this.init(userId)
    }

    init = (userId) =>{
        this.setState({
            errors: [],
            error: false
        })
        const token = isAuthenticated().token
        Read(userId,token)
        .then(data=> {
            if(data.error){
                console.log(data.error)
                this.setState({
                    errors: [data.error],
                    error: true
                })
            }
            else{
                this.setState({
                    id:data._id,
                    name:data.name,
                    email:data.email,
                    errors:"",
                    about:""
                })
            }
        })
    }

    isValid = (e) =>{
        const {name,email,password,error,errors,fileSize} = this.state
        
        this.setState({
            error: false,
            errors: []
        })

       
        if(name.length == 0){
            this.setState({
                error:true,
                errors:["A valid email is required!"]
            })
            console.log("false")
            return false
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({
                error:true,
                errors:["Name is required!"]
            })
            console.log("false")
            return false
        }

        if(password.length < 6){
            this.setState({
                error:true,
                errors:["The password must be at least 7 character!"]
            })
            console.log("false")
            return false
        }
        return true
    }

    enterKeyDown = (e) =>{
        if(e.keyCode === 13){
            if(this.isValid){this.clickdown()}
        }
    }

    click= (e) => {

        if(this.isValid()){

            this.setState({
                error:false
            })

            let userId = this.props.params.userId
            const token = isAuthenticated().token

            Update(userId,token,this.userData)
            .then(data =>{
                if(data.error) {{this.setState({
                    errors: [data.error],
                    error: true
                })
                }   
            }
                else {
                    updateUser(data,() =>{
                        this.setState({
                            message: "Succesfull update"
                        })
                    }) 
                }
            })
        }
    }


    visi = () =>{
        let visi = document.getElementById("Edit_eye")
        let passInp = document.getElementById("Edit_password-imp")

        if(this.state.visibility == "visibility"){
            this.setState({
                visibility: "visibility_off"
            })
            passInp.type = "text"
        }
        else{
            this.setState({
                visibility: "visibility"
            })
            passInp.type = "password"
        }
    }

    

    render(){

        const {about,id,name,email,password,visibility,message,errors,error,defaultProfile} = this.state

        const photoUrl = id ? `http://localhost:5000/user/photo/${id}?${new Date().getTime()}`: defaultProfile

        return(
            <div className="Edit_content">
                <div><img className = "Edit_profile-image"src= { photoUrl }></img></div>
                <p style={{color:"white",fontSize:25,display:"flex",justifyContent:"center",margin:5}}>Edit profile</p>
                {error ? 
                    (<div style={{height:30,fontSize:20,display:"flex",justifyContent:"center"}}>
                        <p style={{color:"red",margin:0}}>{errors}</p>
                    </div>):
                    (<div style={{height:30,fontSize:20,display:"flex",justifyContent:"center"}}>
                    <p style={{color:"green",margin:0}}>{message}</p>
                    </div>)
                }
                <div className = "Edit_design-content">
                    <div className = "Edit_components"> 
                        <div className="Edit_name">
                            <label style={{fontSize:20, fontWeight: "bolder",color: "#a0a0dcd9"}}>Name</label>
                            <input value={name} onChange={this.handleChange("name")} type="text" onKeyDown={this.enterKeyDown} className="Edit_name-imp"></input>
                        </div>

                        <div className = "Edit_email">
                            <label style = {{fontSize:20,fontWeight: "bolder",color: "#a0a0dcd9"}}>Email</label>
                            <input value = {email} onChange= {this.handleChange("email")} type="text" onKeyDown={this.enterKeyDown} className="Edit_email-imp"></input>
                        </div>

                        <div className="Edit_password">
                            <label style={{fontSize:20, fontWeight: "bolder",color: "#a0a0dcd9"}}>Password</label>
                            <input id = "Edit_password-imp" value={password} onChange={this.handleChange("password")} type="password" onKeyDown={this.enterKeyDown} className="Edit_password-imp"></input>
                            <i className="material-symbols-outlined eye" onClick={this.visi} id = "Edit_eye">{visibility}</i>
                        </div>

                        <div className = "Edit_about">
                            <label style={{fontSize:20, fontWeight: "bolder",color: "#a0a0dcd9"}}>About myself</label>
                            <textarea value = {about} className = "Edit_about-imp" onChange={this.handleChange("about")}>{about}</textarea>
                        </div>

                        <div className = "Edit_profile-pic">
                            <input className = "Edit_profile-pic-button" onChange={this.handleChange("photo")} type = "file" accept="image/*"></input>
                        </div>

                        <div className="Edit_button-container">
                            <button className="Edit_button" onClick={this.click}>Update</button>
                        </div>
                    </div>
                </div>
                <pre>{JSON.stringify(this.state,null,4)}</pre>
            </div>
        )
    }
}


const GetParams = () =>{
    const params = useParams()

    return (
        <EditProfile params={params}></EditProfile>
    )
}

export default GetParams