import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    console.log(this.props.currentUser);
    return (
      <nav className="navbar navbar-expand">
        <div className="navbar-header"></div>
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Warbler Home" />
        </Link>
        {this.props.currentUser.isAuthenticated ? (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link
                to={`/users/${this.props.currentUser.user.id}/messages/new`}
              >
                New Message
              </Link>
            </li>
            <li>
              <a onClick={this.logout}>Log Out</a>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/signin">Log in</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
