import React from "react";
import { Redirect } from "react-router-dom";
import { authenticate, signin } from "../auth/index";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }

  handleinput = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // console.log(user)

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        //authenticate
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { error, loading } = this.state;

    if (this.state.redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> SignIn </h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>{" "}
          </div>
        ) : (
          ""
        )}

        <form>
          <div className="form-group">
            <label className="text-muted"> Email </label>
            <input
              onChange={this.handleinput("email")}
              type="email"
              className="form-control"
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label className="text-muted"> Password </label>
            <input
              onChange={this.handleinput("password")}
              type="password"
              className="form-control"
              value={this.state.password}
            />
          </div>

          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
