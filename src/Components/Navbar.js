import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Employee CRUD
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown"> 
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all">
                  All Employees
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add">
                  Add Employee
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
