import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiVersi1 } from "../Config/ApiConfig";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function Register() {
  const [globalState, globalDispacth] = useContext(GlobalContext);
  const navigate = useNavigate();
  const [fullNameInput, setFullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [messageAlert, setMessageAlret] = useState("");
  const [statusAlert, setStatusAlert] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // console.log(fullNameInput);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordInput !== confirmPasswordInput) {
      setMessageAlret(`konfirmasi passwor tidak cocok`);
      console.log(messageAlert);
      return;
    }
    try {
      // setMessageAlret("");
      const response = await ApiVersi1.post("/register", {
        email: emailInput,
        fullName: fullNameInput,
        password: passwordInput,
      });
      console.log(response);
      setMessageAlret(response.data.message);
      setStatusAlert(response.data.status);
    } catch (error) {
      console.log(error);
      setMessageAlret(error.response.data.message);
      setStatusAlert(error.response.data.status);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      if (localStorage.token) {
        const token = localStorage.token;
        // console.log("chek token disini", token);
        const responseCheckToken = await ApiVersi1.get("/checktoken", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Cek token: ", responseCheckToken);
        globalDispacth({
          type: "PROCESS_LOGIN",
          data: responseCheckToken.data.data,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-body ">
                <form onSubmit={handleRegister}>
                  {messageAlert !== "" && (
                    <div
                      className={`alert alert-dismissible fade show ${
                        statusAlert === "succes"
                          ? "alert-success"
                          : "alert-danger"
                      }`}
                      role="alert"
                    >
                      {messageAlert}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  )}
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bolder",
                      color: "#198754",
                    }}
                  >
                    Register
                  </h1>
                  <div className="mb-3 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={fullNameInput}
                      onChange={(e) => {
                        setFullNameInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3 mt-2">
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
                  <div className="mb-3 mt-2">
                    <div className="input-group mb-3">
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
                  </div>
                  <div className="mb-3 mt-2">
                    <div className="input-group mb-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPasswordInput}
                        onChange={(e) => {
                          setConfirmPasswordInput(e.target.value);
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
                  </div>
                  <div className="mb-2">
                    <button
                      className="btn btn-outline-success w-100 mb-3"
                      type="submit"
                    >
                      Create Account
                    </button>
                    <div style={{ marginTop: "-10px" }}>
                      {" "}
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Have account?{" "}
                        <Link
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "#13A52B",
                          }}
                          to="/login"
                        >
                          Sign in
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
    </div>
  );
}
