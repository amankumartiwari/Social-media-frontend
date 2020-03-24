import React from "react";
import { list } from "./apiUser";
import avatar from '../image/avatar.jpg'
class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        this.setState({
          users: data.users
        });
      }
    });
  }

  renderUser = users => (
    <div className="row">
      {users.map((user, id) => (
        <div className="card col-md-4" key={id}>
          <img className="card-img-top" src={avatar} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <a href="#" className="btn btn-raised btn-primary btn-sm">
              View Profile
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>

        {this.renderUser(users)}
      </div>
    );
  }
}

export default Users;
