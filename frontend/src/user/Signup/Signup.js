import React from "react";
import {Navigate, Link} from "react-router-dom";
import "./Signup.styl"
import { signup } from "../../auth";

export default class Signup extends React.Component{


    constructor(props){
        super(props)
        this.state = { 
            loading: false,
            name: "",
            email: "",
            password: "",
            message: "",
            visibility: "visibility",
            signin: false
        }
    }

    handleChange = (name) => (e) =>{
        this.setState({
            [name]: e.target.value,
            message: ""
        })
    }

    enterKeyDown = (e) =>{
        if(e.keyCode === 13){
            this.clickdown()
        }
    }

    clickdown = (e) => {
        this.setState({
            message : "",
            loading: true
        })

        let button = document.getElementById("signupButton2")
        button.classList.add("down2")

        const {name,email,password} = this.state
        const user = {
            name,
            email,
            password
        }
        console.log(user)
        signup(user)
        .then(data =>{
            console.log(data)
            if(data.error) this.setState({message: data.error})
            else this.setState({
                message: "",
                name: "",
                email: "",
                password: "",
                signin: true 
            })
        })
    }

    

    visi = () =>{
        let visi = document.getElementById("visi")
        let passInp = document.getElementById("passInp")

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

    cursor = () =>{
        let visi = document.getElementById("visi")
        visi.classList.add("point")
    }

    cursorUp = () =>{
        let visi = document.getElementById("visi")
        visi.classList.remove("point")
    }
    
    cursor2 = () =>{
        let visi = document.getElementById("signupButton2")
        visi.classList.add("point")
    }

    cursorUp2 = () =>{
        let visi = document.getElementById("signupButton2")
        visi.classList.remove("point")
    }

    clickup = () => {
        let button = document.getElementById("signupButton2")
        button.classList.remove("down2")
    }

    render(){
        const {signin,name,email,password,message,visibility} = this.state 
        return(
            <div style= {{width: 1000}}>
                {signin && (
                    <Navigate to="/signin"/>
                )}
                <div className = "signup">
                    <div className = "Signup_messages">
                        {message ? <div className = "errorMessage2">{message}</div> : <h1 style={{color: "pink"}}></h1>}
                        {this.state.loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img>:<p></p>}
                    </div>                 
                    <div style = {{display:"flex",flexDirection: "column", alignItems: "center", backgroundColor: "#37006a00"}}>
                        <h1 className="Signin_title">Signup</h1>

                        <div style = {{ display: "flex",flexDirection: "column", alignItems: "center"}}>
                            <form className="form2">

                                <div className="FormName2" >
                                    <label style={{fontWeight: "bolder",color: "#a0a0dcd9"}}>Name</label>
                                    <input value={name} onChange={this.handleChange("name")} onKeyDown={this.enterKeyDown} type="text" className="FormNameInp2"></input>
                                </div>

                                <div className = "FormEmail2">
                                    <label style = {{fontWeight: "bolder",color: "#a0a0dcd9"}}>Email</label>
                                    <input value = {email} onChange= {this.handleChange("email")} onKeyDown={this.enterKeyDown} type="text" className="FormEmailInp2"></input>
                                </div>

                                <div className="FormPass2">
                                    <label style={{fontWeight: "bolder",color: "#a0a0dcd9"}}>Password</label>
                                    <input id = "passInp" value={password} onChange={this.handleChange("password")} onKeyDown={this.enterKeyDown} type="password" className="FormPassInp2"></input>
                                    <i id = "visi" onMouseOver = {this.cursor} onMouseOut = {this.cursorUp} onClick = {this.visi} className="material-symbols-outlined">{visibility}</i>
                                </div>

                            </form>
                            <button type="submit" id="signupButton2" onMouseOver = {this.cursor2} onMouseOut = {this.cursorUp2} onMouseUp={this.clickup} onMouseDown={this.clickdown} className = "signupButton2" style = {{fontWeight: "bolder", fontSize: 25, margin: 2}}>Signup</button>
                        </div>

                        <p style={{fontSize:"20px",color: "white"}}> You alredy have an account? <Link style={{fontSize:"20px",color: "yellow"}} to = "/signin">Signin</Link>!</p>
                    </div> 
                </div>
               
            
            </div>
        )
    }
}