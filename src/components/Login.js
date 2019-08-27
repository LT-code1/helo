import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  updateLogin,
  loginUser,
  register,
  updateInfo
} from "../ducks/loginReducer";

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   };

  handleChange = e => {
    this.props.updateLogin(e.target.name, e.target.value);
  };
  handleLogin = e => {
    this.props.loginUser(this.props.username, this.props.password);
  };
  handleRegister = e => {
    this.props.register(
      this.props.username,
      this.props.password,
      this.props.address,
      this.props.city,
      this.props.state,
      this.props.zipcode
    );
  };
  handleUpdate = e => {
    //console.log(this.props)
    this.props.updateInfo(
      this.props.username,
      this.props.password,
      this.props.address,
      this.props.city,
      this.props.state,
      this.props.zipcode,
      this.props.newPassword
    );
  };

  render() {
    if (this.props.error === "register") {
      alert("Username already taken");
    } else if (this.props.error === "login") {
      alert("incorrect username or password");
    }

    return (
      <>
        <header className="header1">Login Page</header>
        <div className="labelOuterLogin">
          <div className="labelSet1">
            <label>
              Username
              <input
                onChange={this.handleChange}
                name="username"
                placeholder="username"
              />
            </label>
            <label>
              Password
              <input
                onChange={this.handleChange}
                name="password"
                placeholder="password"
              />
            </label>
            <br />
            <button className="loginButton" onClick={this.handleLogin}>
              Login
            </button>
            <br />
          </div>
          <div className="labelSet2">
            <label>
              Address
              <input
                onChange={this.handleChange}
                name="address"
                placeholder="address"
              />
            </label>
            <label>
              City
              <input
                onChange={this.handleChange}
                name="city"
                placeholder="city"
              />
            </label>
            <label>
              State
              <input
                onChange={this.handleChange}
                name="state"
                placeholder="state"
              />
            </label>
            <label>
              Zipcode
              <input
                onChange={this.handleChange}
                name="zipcode"
                placeholder="zipcode"
              />
            </label>
            <br />

            {/* {console.log(this.props)} */}
            <button className="loginButton" onClick={this.handleRegister}>
              Register
            </button>

            {this.props.username &&
            this.props.password &&
            this.props.address &&
            this.props.city &&
            this.props.state &&
            this.props.zipcode ? (
              <>
                <br />
                <label>
                  New Password
                  <input
                    onChange={this.handleChange}
                    name="newPassword"
                    placeholder="New Password"
                  />
                </label>
                <button className="loginButton" onClick={this.handleUpdate}>
                  Update Information/New password
                </button>
              </>
            ) : null}
          </div>
        </div>
        {/* {console.log(this.props.id)} */}
        {this.props.id ? <Redirect to="/order" /> : null}
      </>
    );
  }
}

let mapStatetoProps = reduxState => {
  return {
    username: reduxState.login.username, //reduxstate. combined reducer part login . initialstate props
    password: reduxState.login.password,
    newPassword: reduxState.login.newPassword,
    address: reduxState.login.address,
    city: reduxState.login.city,
    state: reduxState.login.state,
    zipcode: reduxState.login.zipcode,
    id: reduxState.login.id,
    error: reduxState.login.error
  };
};

export default connect(
  mapStatetoProps,
  { updateLogin, loginUser, register, updateInfo }
)(Login);
