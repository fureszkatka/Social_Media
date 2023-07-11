import React from "react";
import  Posts  from "../post/Posts/Posts";

export default class Home extends React.Component{

    state = {
        posts: []
    }

        

    render(){
        return(
            <div style = {{display:"flex",flexDirection:"column", width:'100%',alignItems:"center",height:'100%'}}>
                <Posts/>
            </div>
        )
    }
}
