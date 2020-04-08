import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9990" };
  else return { color: "ffffff" };
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary ">
      <li className="nav-items">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          HOME
        </Link>
      </li>

      <li className="nav-items">
        <Link
          className="nav-link"
          style={isActive(history, "/users")}
          to="/users"
        >
          USERS
        </Link>
      </li>

      {!isAuthenticated() && (
        <React.Fragment>
          <li className="nav-items">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              SIGNUP
            </Link>
          </li>

          <li className="nav-items">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              SIGNIN
            </Link>
          </li>
        </React.Fragment>
      )}

      {isAuthenticated() && (
        <React.Fragment>
          <li className="nav-items">
            <span
              className="nav-link"
              style={isActive(history, "/signin")}
              onClick={() => signout(() => history.push("/"))}
            >
              SIGN OUT
            </span>
          </li>

          <li className="nav-items">
            <Link
              className="nav-link"
              to={`/findpeople`}
              style={{ color: "#fff" }}
            >
              Find People
            </Link>
          </li>

          <li className="nav-items">
            <Link
              className="nav-link"
              to={`/post/create`}
              style={{ color: "#fff" }}
            >
              Create Posts
            </Link>
          </li>

          <li className="nav-items">
            <Link
              className="nav-link"
              to={`/user/${isAuthenticated().user._id}`}
              style={{ color: "#fff" }}
            >
              {isAuthenticated().user.name}
            </Link>
          </li>
        </React.Fragment>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
