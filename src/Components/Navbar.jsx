import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalState/GlobalContext";
import { ApiVersi1 } from "../Config/ApiConfig";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
></link>;

export default function Navbar() {
  const [globalState, globalDispacth] = useContext(GlobalContext);

  const [dataCarts, setDataCarts] = useState([]);
  // console.log("globalstate in Navbar", globalState);

  const navigate = useNavigate();
  // console.log("Global state di Navbar", globalState);

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
              style={{
                width: "40px",
                height: "40px",
                marginRight: "10px",
                marginBottom: "9px",
              }}
            />
            <span
              className="fw-bold"
              style={{
                color: "#198754",
                height: "100px",
                width: "100px",
                animation: "flicker 1.5s infinite alternate",
                fontSize: "30px",
                fontFamily: "cursive",
              }}
            >
              My Coffie
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
                  <div>
                    {globalState.dataUserLogin.level === "costumer" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                          <div
                            style={{
                              width: "80px",
                              textAlign: "center",
                              verticalAlign: "middle",
                              position: "relative",
                            }}
                          >
                            {globalState.dataCarts.length > 0 ? (
                              <>
                                <span
                                  style={{
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "white",
                                    position: "absolute",
                                    right: "14px",
                                    top: "2px",
                                    padding: "2px 8px",
                                    fontSize: "12px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {globalState.dataCarts.length}
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                            {/* {dataCarts.length > 0 ? (
                          <>
                            <span
                              style={{
                                backgroundColor: "red",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                position: "absolute",
                                right: "14px",
                                top: "2px",
                                padding: "2px 8px",
                                fontSize: "12px",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              {dataCarts.length}
                            </span>
                          </>
                        ) : (
                          <></>
                        )} */}

                            <img src={require("../Images/Vector.png")} alt="" />
                          </div>
                        </Link>
                      </li>
                    )}
                  </div>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#198754" }}
                    >
                      Hello,{" "}
                      {globalState.dataUserLogin.fullname
                        ? globalState.dataUserLogin.fullname
                        : "Unknown"}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Profil"
                          style={{ color: "#198754" }}
                        >
                          <i className="bi bi-person"></i>Profil
                        </Link>
                      </li>
                      <li>
                        {globalState.dataUserLogin.level === "costumer" && (
                          <Link
                            className="dropdown-item"
                            to="/my-transactions"
                            style={{ color: "#198754" }}
                          >
                            <i className="bi-cash-coin"></i> My transactions
                          </Link>
                        )}
                      </li>
                      {globalState.dataUserLogin.level === "owner" && (
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/transactions"
                            style={{ color: "#198754" }}
                          >
                            <i className="bi-cash-coin"></i> Transactions
                          </Link>
                        </li>
                      )}
                      {globalState.dataUserLogin.level === "owner" && (
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/data-products"
                            style={{ color: "#198754" }}
                          >
                            <i className="bi-cup-straw"></i> Products
                          </Link>
                        </li>
                      )}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          href="/"
                          onClick={() => {
                            localStorage.clear();
                          }}
                          style={{ color: "red" }}
                          className="dropdown-item"
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item"></li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="neonText"
                      style={{ color: "#13A52B", textDecoration: "none" }}
                      to="/Login"
                    >
                      Login
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
