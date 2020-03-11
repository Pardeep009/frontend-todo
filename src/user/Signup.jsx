import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    open: false
  };

  handleChange = e => {
    this.setState({ error: "" });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clickSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    signup(user,(data) => {
      if (data.error) {
        this.setState({ error: data.error });
      }
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true
        });
    })
  };

  render() {
    return (
      <div className="container">
        <h2 className="my-5 display-3">Sign Up</h2>
        <div
          className="alert alert-danger"
          style={{ display: !this.state.error && "none" }}
        >
          {this.state.error}
        </div>
        <div
          className="alert alert-primary"
          style={{ display: !this.state.open && "none" }}
        >
          New Account Created. Please <Link to="/signin">Sign In</Link>
        </div>
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              value={this.state.email}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              value={this.state.password}
              className="form-control"
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
