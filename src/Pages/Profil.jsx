import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalState/GlobalContext";
import { ApiVersi1 } from "../Config/ApiConfig";

export default function Profil() {
  useEffect(() => {
    getDataUserById();
  }, []);

  const [editUser, setEditUser] = useState("");
  const [editPasswordUser, setEditPasswordUser] = useState("");
  const [dataUserById, setDataUserById] = useState([]);

  const [fullNameInput, setFullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [messageAlert, setMessageAlret] = useState("");
  const [statusAlert, setStatusAlert] = useState("");

  const getDataUserById = async () => {
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.get("/getuserbyid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataUserById(response.data.dataUser);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.patch(
        `/updatedatauser/${editUser}`,
        {
          fullName: fullNameInput,
          email: emailInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessageAlret(response.data.message);
      setStatusAlert(response.data.status);
    } catch (error) {
      console.log(error);
      setMessageAlret(error.response.data.message);
      setStatusAlert(error.response.data.status);
    }
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.patch(
        `/updatepassworduser/${editUser}`,
        {
          password: passwordInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setMessageAlret(response.data.message);
      setStatusAlert(response.data.status);
    } catch (error) {
      console.log(error);
      setMessageAlret(error.response.data.message);
      setStatusAlert(error.response.data.status);
    }
  };
  return (
    <div>
      {messageAlert !== "" && (
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            alignItems: "center",
            right: "4px",
            left: "4px",
            top: "10px",
          }}
          className={`alert ${
            statusAlert === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {messageAlert}
        </div>
      )}
      <div className="row " style={{ marginTop: "100px", marginLeft: "100px" }}>
        <div className="col-lg-4">
          <div className="card" style={{ width: "80%", height: "400px" }}>
            <img src="" alt="" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow">
            <form onSubmit={updateUser}>
              <p
                style={{
                  marginTop: "40px",
                  height: "20px",
                  fontSize: "20px",
                  color: "#198754",
                  fontWeight: "bold",
                  marginLeft: "30px",
                }}
              >
                Nama
              </p>
              <input
                className="form-control"
                style={{
                  width: "350px",
                  height: "40px",
                  marginLeft: "30px",
                }}
                placeholder={
                  dataUserById.fullname ? dataUserById.fullname : "Unknown"
                }
                value={fullNameInput}
                onChange={(e) => {
                  setFullNameInput(e.target.value);
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  height: "20px",
                  fontSize: "20px",
                  color: "#198754",
                  fontWeight: "bold",
                  marginLeft: "30px",
                }}
              >
                Email
              </p>
              <input
                className="form-control"
                style={{
                  width: "350px",
                  height: "40px",
                  marginLeft: "30px",
                  marginBottom: "30px",
                }}
                placeholder={
                  dataUserById.email ? dataUserById.email : "Unknown"
                }
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />
              <div className="row">
                <div className="col-lg-6">
                  <button
                    className="btn btn-danger"
                    style={{
                      marginLeft: "50px",
                      marginBottom: "30px",
                    }}
                    type="submit"
                    onClick={() => {
                      setEditUser(dataUserById.id);
                    }}
                  >
                    Update Save
                  </button>
                </div>
                <div className="col-lg-5">
                  <button
                    className="btn btn-success"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#edit"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
            {/* <!-- Modal --> */}

            <div
              className="modal fade"
              id="edit"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Change Password :
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form onSubmit={updatePassword}>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-4"></div>
                      </div>
                      <div className="col-lg-4">
                        <input
                          className="form-control"
                          style={{
                            marginBottom: "10px",
                            marginLeft: "30px",
                          }}
                          placeholder="New Password"
                          value={passwordInput}
                          onChange={(e) => {
                            setPasswordInput(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                        style={{ width: "80px" }}
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setEditUser(dataUserById.id);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
