import React from "react";
import {signup} from '../auth/index'
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      error: "",
      open:false
    };
  }

  handleinput = name => event => {
    this.setState({error:""})
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();

    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    // console.log(user)

    signup(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          name: "",
          password: "",
          error: "",
          email: "",
          open:true
        });
      }
    });
  };



  render() {
     const {error,open} =this.state

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Signup </h2>

        <div className="alert alert-danger" style={{ display: error ? "":"none"  }} >  
             {error}
        </div>

        <div className="alert alert-info" style={{ display: open ? "":"none"  }} >  
             New Account Created ,Please login
        </div>

        <form>
          <div className="form-group">
            <label className="text-muted"> Name </label>
            <input
              onChange={this.handleinput("name")}
              type="text"
              className="form-control"
              value={this.state.name}
            />
          </div>

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

export default Signup;
