import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropDown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


export default class NavbarPage extends Component {
  loggedIn = () => {
    return (
      <>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </>
    );
  };
  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState({
      User: {},
    });
    window.location.reload();
  };

    render() {
      let isLoggedin = localStorage.getItem("token")
        return (
          <Navbar bg="dark" expand="lg">
            <Link to="/" className="navbar-brand">
              MovieNight
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/randomized" className="nav-link">
                  Random Movie
                </Link>
              </Nav>
              <Form inline>
              {isLoggedin ? (
              <>
                {this.props.username}
                <Link to="/logout" className="nav-link" onClick={this.handleLogOut}>
                  Logout
                </Link>
              </>
            ) : (
              this.loggedIn()
            )}
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
      )}
}