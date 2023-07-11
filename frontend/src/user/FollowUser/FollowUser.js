import React, { Component } from 'react';
import "./FollowUser.styl"
import { Follow, unFollow } from '../apiUser';

export default class FollowUser extends Component {
    
    followClick = () =>{
        this.props.onButtonClick(Follow)
    }
    
    unFollowClick = () =>{
        this.props.onButtonClick(unFollow)
    }
    
    render() {
        return (
            <div className = "Follow_buttons">
                {!this.props.isFollow ? (
                    <button onClick = {this.followClick} className = "Follow_button">Follow</button>
                ):
                    <button onClick = {this.unFollowClick} className = "Unfollow_button">Unfollow</button>
                }                
            </div>
        );
    }
}
