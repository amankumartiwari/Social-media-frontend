import React from "react";
import { isAuthenticated } from "../auth/index";
import { read,update } from "./apiUser";
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
      error:""
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

  handleinput = name => event => {
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();

    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password:password || undefined
    };
    // console.log(user)

    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;

    update(userId, token,user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
            redirectToProfile:true
        });
      }
    });
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
    const { name, email, password, redirectToProfile, id } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> PROFILE edit </h2>

        {this.signupForm(name, email, password)}
      </div>
    );
  }
}
export default EditProfile;
