import React from "react";
import {follow} from './apiUser'
class FollowProfileButton extends React.Component {
  
    followClick=()=>{
        this.props.onButtonClick(follow);
    }
  
    render() {
    return (
      <div className="d-inline-block ">
        {!this.props.following ? (
          <button onClick={this.followClick} className="btn btn-success btn-raised mr-5">FOLLOW</button>
        ) : (
          <button className="btn btn-warning btn-raised ">UNFOLLOW</button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
