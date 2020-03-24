import React from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import avatar from "../image/avatar.jpg";
import DeleteProfile from "./DeleteProfile";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  init = userID => {
    const token = isAuthenticated().token;
    read(userID, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userId;
    this.init(userID);
  }

componentWillReceiveProps(props){
  const userID = props.match.params.userId;
    this.init(userID);
}

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> PROFILE </h2>

        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top"
              style={{ height: "15vw", width: "300px" }}
              src={avatar}
              alt="Card image cap"
            />
          </div>

          <div className="col-md-6">
            <div className="lead  ml-5">
              <p> Hello {user.name} </p>
              <p> Email: {user.email} </p>
            </div>

            {isAuthenticated().user &&
              isAuthenticated().user._id == this.state.user._id && (
                <div className="d-inline-block mt-5">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${this.state.user._id}`}
                  >
                    EDIT PROFILE
                  </Link>
                  <DeleteProfile/>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
