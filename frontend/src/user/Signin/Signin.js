import React from "react";
import {Navigate, useNavigate, Link} from "react-router-dom";
import "./Signin.styl"
import { signin } from "../../auth";
import { isAuthenticated } from "../../auth";


export default class Signin extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            loading: false,
            email: "",
            password: "",
            message: "",
            visibility: "visibility",
            redirectToReferer: false,
            signin: false,
            success: ""
        }         
    }

    handleChange = (email) => (e) =>{
        this.setState({
            [email]: e.target.value,
            message: ""
        })
    }

    componentDidMount=()=>{
        this.setState({
            email: "kati@gmail.com",
            password: "Sutisegg12"
        })
    }

    enterKeyDown = (e) =>{
        if(e.keyCode === 13){
            this.clickdown()
        }
    }

    visi = () =>{
        let passInp = document.getElementById("passInp")

        if(this.state.visibility == "visibility"){
            this.setState({
                visibility: "visibility_off"
            })
            passInp.type = "text"
            passInp.style.transition = 5
        }
        else{
            this.setState({
                visibility: "visibility"
            })
            passInp.type = "password"
        }
    }


    authenticate (jwt, next){
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt))
        }
        next()
    }

    clickdown = () => {
        this.setState({
            message : "",
            loading: true
        })

        let button = document.getElementById("signinButton")
        button.classList.add("down")

        const {email,password} = this.state
        const user = {
            email,
            password
        }
        signin(user)
        .then(data =>{
            if(data.error) {
                this.setState({message: data.error,loading: false})
            }
            else {
                this.authenticate(data, () =>{
                    this.setState({
                        redirectToReferer: true,
                        success: "Signin success!",
                        loading: false
                    })
                })
            }
            this.setState({
                loading: false
            })
        })

    }

    

    cursor = () =>{
        let visi = document.getElementById("visib")
        visi.classList.add("point")
    }

    cursorUp = () =>{
        let visi = document.getElementById("visib")
        visi.classList.remove("point")
    }

    cursor2 = () =>{
        let visi = document.getElementById("signinButton")
        visi.classList.add("point")
        
    }

    cursorUp2 = () =>{
        let visi = document.getElementById("signinButton")
        visi.classList.remove("point")
    }


    clickup = () => {
        let button = document.getElementById("signinButton")
        button.classList.remove("down")
    }




    render(){
        const {email,password,message,visibility,redirectToReferer,success} = this.state
        return(
            <div>
                {redirectToReferer &&(
                    <Navigate to= {`/user/${isAuthenticated().user._id}`} replace = {false} />
                )}
                <div className = "signin">
                    <div  className = "Signin_messages" >
                        <div style={{height: 50}}>{message ? <div className = "errorMessage">{message}</div> : <h1 style={{color: "pink",}} >{success}</h1>}</div> <div style={{height: 50}}>{this.state.loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:<p></p>}</div>
                    </div>
                    
                    <div style = {{display:"flex",flexDirection: "column", alignItems: "center", backgroundColor: "#37006a00"}}>
                        <h1 className="Signin_title">Signin</h1>
                        <div style = {{ display: "flex",flexDirection: "column", alignItems: "center"}}>
                            <form className = "form">
                                <div className = "FormEmail">
                                    <label style = {{fontWeight: "bolder", color: "#a0a0dcd9"}}>Email</label>
                                    <input value = {email} type = "text" onKeyDown={this.enterKeyDown} onChange = {this.handleChange("email")} className = "FormEmailInp"></input>
                                </div>
                                <div className = "FormPass">
                                    <label style = {{fontWeight: "bolder", color: "#a0a0dcd9"}}>Password</label>
                                    <input id = "passInp" value = {password} onKeyDown={this.enterKeyDown} type = "password" onChange = {this.handleChange("password")} className = "FormPassInp"></input>
                                    <i id = "visib" onMouseOver = {this.cursor} onMouseOut = {this.cursorUp} onClick = {this.visi} className="material-symbols-outlined">{visibility}</i>
                                </div>
                            </form>
                            <button type = "submit" id = "signinButton" onMouseOver = {this.cursor2} onMouseOut = {this.cursorUp2} onMouseUp = {this.clickup} onMouseDown = {this.clickdown} className = "signinButton" style = {{fontWeight: "bolder", fontSize: 25, margin: 2}} >Signin</button>
                        </div>
                        <p style={{fontSize:"20px",color: "white"}}> You don't have an account yet? <Link style={{fontSize:"20px",color: "yellow"}} to = "/signup">Signup</Link>!</p>
                    </div>
                </div>
            </div>           
        )
    }
}