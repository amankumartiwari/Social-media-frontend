import React from "react";
import { Link } from "react-router-dom";
import avatar from "../image/avatar.jpg";
class ProfileTabs extends React.Component {
  render() {
    const { followers, following } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary"> Followers </h3>
            <hr />
            {followers.map((person, i) => (
              <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        height="30px"
                        onError={i => (i.target.src = `${avatar}`)}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                      />
                      <div>{person.name}</div>
                    </Link>
                    <p style={{clear:"both"}}>
                         {person.about }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileTabs;
