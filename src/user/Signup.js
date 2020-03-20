import React from "react";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      error: ""
    };
  }

  handleinput = name => event => {
    this.setState({ [name]: event.target.value });
  };

clickSubmit =(event)=>{
    event.preventDefault();

    const {name,email,password} = this.state;
    const user={
        name,email,password
    }
   // console.log(user)
   fetch('http://localhost:8080/signup',{
       method:"POST",
       headers:{
           Accept:"application/json",
           "content-type":"application/json"
       },
       body:JSON.stringify(user)
   } )
   .then( (response)=>{
       return response.json()
   } )
   .catch(err=>console.log(err))
};


  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Signup </h2>

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

          <button  onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
