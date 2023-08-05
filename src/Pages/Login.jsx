import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GlobalContext } from "../GlobalState/GlobalContext";
import { ApiVersi1 } from "../Config/ApiConfig";

export default function Login() {
  const [globalState, globalDispacth] = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [statusAlert, setStatusAlert] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiVersi1.post("/login", {
        email: emailInput,
        password: passwordInput,
      });
      console.log(response);
      setMessageAlert(response.data.message);
      setStatusAlert(response.data.status);
      setTimeout(() => {
        globalDispacth({ type: "PROCESS_LOGIN", data: response.data.data });
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessageAlert(error.response.data.message);
      setStatusAlert(error.response.data.status);
    }
  };
  // useEffect(() => {
  //   checkToken();
  // }, []);

  // const checkToken = async () => {
  //   try {
  //     if (localStorage.token) {
  //       const token = localStorage.token;
  //       // console.log("chek token disini", token);
  //       const responseCheckToken = await ApiVersi1.get("/checktoken", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       // console.log("Cek token: ", responseCheckToken);
  //       globalDispacth({
  //         type: "PROCESS_LOGIN",
  //         data: responseCheckToken.data.data,
  //       });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4"></div>

        <div className="col-lg-4" style={{ marginTop: "80px" }}>
          <div className="card shadow">
            <div className="card-body ">
              {messageAlert !== "" && (
                <div
                  className={`alert ${
                    statusAlert === "succes" ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  {messageAlert}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "#198754",
                  }}
                >
                  Login
                </h1>

                <div className="mb-3 mt-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 mt-2 input-group ">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                    }}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={() => {
                      showPassword
                        ? setShowPassword(false)
                        : setShowPassword(true);
                    }}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-fill"></i>
                    ) : (
                      <i className="bi bi-eye-slash-fill"></i>
                    )}
                  </span>
                </div>
                <div className="mb-2">
                  <div
                    style={{
                      fontSize: "14,5px",
                      margin: "-15px 0 15px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    href="#"
                  >
                    <label>
                      <input type="checkbox" style={{ marginRight: "2px" }} />
                      Remember me
                    </label>
                    <a
                      href=""
                      style={{ textDecoration: "none", color: "#13A52B" }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <a href="/">
                    <button
                      id="signIn"
                      className="btn btn-outline-success w-100"
                      onClick={() => {}}
                    >
                      {statusAlert === "succes" ? (
                        <div
                          className="spinner-border text-success"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                    <div className="rememberForgot"></div>
                  </a>
                  <div
                    className="loginRegister"
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    <p>
                      Don't have an account?{" "}
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#13A52B",
                          fontWeight: "bold",
                        }}
                        to="/register"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
