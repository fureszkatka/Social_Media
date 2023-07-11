import React, { Component } from 'react';
import "./ProfileTabs.styl"
import { Link } from 'react-router-dom';

export default class ProfileTabs extends Component {

    state = {
        port: "http://localhost:5000",
        loading: false
    }


    render() {
        const {port} = this.state 
        return (
            <div className = "ProfileTab_container">
                <div className = "ProfileTab_content">
                    <p style={{marginTop:0, fontWeight:"bolder",fontSize:25,display: "flex",justifyContent:"center"}}>Followers</p>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <div style={{margin:0,width:200,height:1,backgroundColor: "white", borderRadius:"20%"}}></div>
                    </div>
                    {this.props.loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img> :
                        <>        
                            <div style={{display:"flex",justifyContent:"center"}}>
                            </div>
                            {this.props.followers.map((follower, index) =>(
                                <div className = "ProfileTab_followers" key = {index}>
                                    <img className="ProfileTab_profile" src= {`${port}/user/photo/${follower._id}`}></img>
                                    <Link className="ProfileTab_names" to = {`/user/${follower._id}`}>{follower.name}</Link>
                                </div>
                            ))}
                        </>
                    }
                </div>

                <div className = "ProfileTab_content">
                
                    <p style={{marginTop:0, fontWeight:"bolder",fontSize:25,display: "flex",justifyContent:"center"}}>Followings</p>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <div style={{margin:0,width:200,height:1,backgroundColor: "white", borderRadius:"20%"}}></div>
                    </div>
                    {this.props.loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img> :
                    <>
                        
                        {this.props.following.map((follow, index) =>(
                            <div className = "ProfileTab_following" key = {index}>
                                <img className="ProfileTab_profile" src= {`${port}/user/photo/${follow._id}`}></img>
                                <Link className="ProfileTab_names" to = {`/user/${follow._id}`}>{follow.name}</Link>
                            </div>
                            )
                        )}
                    </>
                    }
                </div>

                <div className = "ProfileTab_content">

                    <p style={{marginTop:0, fontWeight:"bolder",fontSize:25,display: "flex",justifyContent:"center"}}>Posts</p>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <div style={{margin:0,width:200,height:1,backgroundColor: "white", borderRadius:"20%"}}></div>
                    </div>
                    {this.props.loading ? <img className = "loadimg" src ="https://www.alhaya-medical.com/wp-content/uploads/2017/11/584b607f5c2ff075429dc0e7b8d142ef.gif"></img> :
                    <>
                    
                    {this.props.posts.map((post, index) =>(
                        <div key = {index} className = "ProfileTab_posts" >
                            <Link to={`/user/${post.postedBy._id}`}>
                                <img className="ProfileTab_profile" src= {`${port}/post/photo/${post._id}`}></img>
                            </Link>
                            <div style={{display: "flex", flexDirection:"column",width: "fit-content"}}>
                                <Link style={{textDecoration:"none"}} className="Posts_view-profile" to={`/singlepost/${post._id}`}>
                                    <div className="ProfileTab_names">{post.title}</div>
                                    <div className="ProfileTab_names">{post.body}</div>
                                </Link>
                            </div>
                        </div>
                        )
                    )}
                    </>}
                </div>

            </div>
        );
    }
}
