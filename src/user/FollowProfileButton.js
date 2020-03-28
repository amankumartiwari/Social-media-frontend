import React from "react";
import {follow,unfollow} from './apiUser'
class FollowProfileButton extends React.Component {
  
    followClick=()=>{
        this.props.onButtonClick(follow);
    }
    unfollowClick=()=>{
      this.props.onButtonClick(unfollow);
  }
  
    render() {
    return (
      <div className="d-inline-block ">
        {!this.props.following ? (
          <button onClick={this.followClick} className="btn btn-success btn-raised mr-5">FOLLOW</button>
        ) : (
          <button onClick={this.unfollowClick} className="btn btn-warning btn-raised ">UNFOLLOW</button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
