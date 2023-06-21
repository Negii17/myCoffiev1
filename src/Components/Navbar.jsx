import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function Navbar() {
  const [globalState] = useContext(GlobalContext);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{ backgroundColor: "#FDF5E6" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={require("../Images/Cofie_logo2.png")}
              alt=""
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <span
              className="fw-bold"
              style={{ color: "#198754", height: "100px", width: "100px" }}
            >
              CoffeeLand
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {globalState.isLogin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <img src={require("../Images/Vector.png")} alt="" />
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello, Jun
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item"></li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-outline-success me-3"
                      to="/Login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link btn btn-success" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
