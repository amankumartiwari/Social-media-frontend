import React from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import avatar from "../image/avatar.jpg";
import DeleteProfile from "./DeleteProfile";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: ""
    };
  }

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userID => {
    const token = isAuthenticated().token;
    read(userID, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userId;
    this.init(userID);
  }

  componentWillReceiveProps(props) {
    const userID = props.match.params.userId;
    this.init(userID);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${
          new Date().getTime
        }`
      : avatar;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> PROFILE </h2>

        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "200px", width: "300px" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${avatar}`)}
              alt={user.name}
            />
          </div>

          <div className="col-md-6">
            <div className="lead  ml-5">
              <p> Hello {user.name} </p>
              <p> Email: {user.email} </p>
            </div>

            {isAuthenticated().user &&
            isAuthenticated().user._id === this.state.user._id ? (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${this.state.user._id}`}
                >
                  EDIT PROFILE
                </Link>
                <DeleteProfile userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-6 md-12 mt-5 mb-5">
            <hr />
            <p className="lead"> {user.about} </p>
            <hr />
            <ProfileTabs
              followers={user.followers}
              following={user.following}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
