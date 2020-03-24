import React from "react";
import { isAuthenticated } from "../auth/index";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id: "",
      password: "",
      email: "",
      redirectToProfile: false,
      error: ""
    };
  }

  init = userID => {
    const token = isAuthenticated().token;
    read(userID, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({ id: data._id, name: data.name, email: data.email });
      }
    });
  };

  componentDidMount() {
    const userID = this.props.match.params.userId;
    this.init(userID);
  }

  isvalid = () => {
    const { name, email, password } = this.state;

    if (name.length == 0) {
      this.setState({ error: "Name is Required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ error: "A valid Email is Required" });
      return false;
    }
    if (password.length > 0 && password.length < 6) {
      this.setState({ error: "Password must be 6 character long" });
      return false;
    }
    return true;
  };

  handleinput = name => event => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();

    if (this.isvalid()) {
      const { name, email, password } = this.state;
      const user = {
        name,
        email,
        password: password || undefined
      };
      // console.log(user)

      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, user).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            redirectToProfile: true
          });
        }
      });
    }
  };

  signupForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          onChange={this.handleinput("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Email </label>
        <input
          onChange={this.handleinput("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Password </label>
        <input
          onChange={this.handleinput("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        UPDATE
      </button>
    </form>
  );

  render() {
    const { name, email, password, redirectToProfile, id,error } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> PROFILE edit </h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {this.signupForm(name, email, password)}
      </div>
    );
  }
}
export default EditProfile;
