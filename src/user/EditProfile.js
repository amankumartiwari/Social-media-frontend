import React from "react";
import { isAuthenticated } from "../auth/index";
import { read, update,updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import avatar from "../image/avatar.jpg";

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id: "",
      password: "",
      email: "",
      redirectToProfile: false,
      error: "",
      loading: false,
      fileSize: 0,
      about: ""
    };
  }

  init = userID => {
    const token = isAuthenticated().token;
    read(userID, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          about: data.about
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userID = this.props.match.params.userId;
    this.init(userID);
  }

  isvalid = () => {
    const { name, email, password, fileSize } = this.state;

    if (fileSize > 300000) {
      this.setState({
        error: "Image size should be less than 100kb",
        loading: false
      });
      return false;
    }

    if (name.length === 0) {
      this.setState({ error: "Name is Required", loading: false });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ error: "A valid Email is Required", loading: false });
      return false;
    }
    if (password.length > 0 && password.length < 6) {
      this.setState({
        error: "Password must be 6 character long",
        loading: false
      });
      return false;
    }
    return true;
  };

  handleinput = name => event => {
    this.setState({ error: "" });

    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isvalid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
            updateUser(data , ()=>{
              this.setState({
                redirectToProfile: true
              });
            })
        }
      });
    }
  };

  signupForm = (name, email, password,about) => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Profile Photo </label>
        <input
          onChange={this.handleinput("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>

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
        <label className="text-muted"> About </label>
        <textarea
          onChange={this.handleinput("about")}
          type="text"
          className="form-control"
          value={about}
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
    const {
      name,
      email,
      password,
      redirectToProfile,
      id,
      error,
      loading,
      about
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    const photoUrl = id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${
          new Date().getTime
        }`
      : avatar;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> PROFILE edit </h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <img
          style={{ height: "200px", width: "300px" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={i => (i.target.src = `${avatar}`)}
          alt={name}
        />

        {this.signupForm(name, email, password,about)}
      </div>
    );
  }
}
export default EditProfile;
