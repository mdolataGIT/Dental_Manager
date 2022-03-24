import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i class="fas fa-home"> Dashboard</i>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/calendar">
              <i class="far fa-calendar"> Calendar</i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              <i class="far fa-envelope"> Contact</i>
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-user-circle mr-1" />
              &nbsp;
              {user.fullName}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              <i class="fas fa-sign-out-alt"> Logout</i>
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              <i class="fas fa-user-plus"> Sign up</i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <i class="fas fa-sign-out-alt"> Login</i>
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Dental Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {headerLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
