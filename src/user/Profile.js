import React from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";

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
    // read(userID, token).then(data => {
    //   if (data.error) {
    //     this.setState({ redirectToSignin: true });
    //   } else {
    //     this.setState({ user: data });
    //   }
    // });
  };

  componentDidMount() {
    const userID = this.props.match.params.userId;
    this.init(userID);
  }

  render() {
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5"> PROFILE </h2>
            <p> Hello {isAuthenticated().user.name} </p>
            <p> Email: {isAuthenticated().user.email} </p>
          </div>

          <div className="col-md-6">
            {isAuthenticated().user &&
              isAuthenticated().user._id ==
                this.state.user._id && (
                  <div className="d-inline-block mt-5">
                    <Link
                      className="btn btn-raised btn-success mr-5"
                      to={`/user/edit/${this.state.user._id}`}
                    >
                      EDIT PROFILE
                    </Link>
                    <button className="btn btn-raised btn-danger">
                      DELETE PROFILE
                    </button>
                  </div>
                )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
