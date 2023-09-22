import React, { useContext, useEffect, useState } from "react";
import { ApiVersi1 } from "../../Config/ApiConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatRupiah } from "../../Config/Config";
import { GlobalContext } from "../../GlobalState/GlobalContext";

export default function DataProducts() {
  useEffect(() => {
    getDataProductApi();
  }, []);

  const [globalState, globalDispacth] = useContext(GlobalContext);
  const [stocksInput, setStocksInput] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const navigate = useNavigate();
  const setFormatRupiah = formatRupiah;
  const idparam = useParams();

  const [allDataProducts, setAllDataProducts] = useState([]);
  const [messageAlert, setMessageAlret] = useState("");
  const [statusAlert, setStatusAlert] = useState("");

  const getDataProductApi = async () => {
    const response = await ApiVersi1.get("/getdataproducts");
    console.log(response);
    setAllDataProducts(response.data.data);
  };

 

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      console.log(stocksInput);
      const response = await ApiVersi1.patch(`/updatedataproduct/${idEdit}`, {
        stocks: stocksInput,
      });
      getDataProductApi();
      console.log(response);
      setMessageAlret(response.data.message);
      setStatusAlert(response.data.status);
      setTimeout(() => {
        messageAlert();
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessageAlret(error.response.data.message);
      setStatusAlert(error.response.data.status);
    }
  };

  const DeleteProduct = async (idParam) => {
    try {
      await ApiVersi1.delete(`/deletedataproduct/${idParam}`);
      getDataProductApi();
    } catch (error) {
      console.log(error);
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4">
            <p style={{ fontSize: "35px", fontWeight: "bold" }}>DataProducts</p>
          </div>
          <div className="col-lg-6">
            <Link to="/add-products">
              <button
                className="btn btn-outline-success"
                style={{
                  float: "right",
                  marginBottom: "0",
                  marginRight: "40px",
                }}
              >
                Add Product
              </button>
            </Link>
          </div>
        </div>

        <table
          className="table table-bordered"
          style={{ marginTop: "10px", width: "80%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#FDF5E6" }}>
              <th style={{ width: "1%", textAlign: "center" }}>Id</th>
              <th style={{ textAlign: "center" }}>Nama Produk</th>
              <th style={{ textAlign: "center" }}>Harga</th>
              <th style={{ textAlign: "center" }}>Stok</th>
              <th style={{ textAlign: "center", width: "30%" }}>Action</th>
            </tr>
          </thead>
          {allDataProducts.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{setFormatRupiah(item.price)}</td>
                  <td style={{ textAlign: "center" }}>{item.stocks}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-outline-success "
                      onClick={() => {
                        console.log(item.id);
                        globalDispacth({
                          type: "GET_IDPRODUCT",
                          idProduct: item.id,
                        });
                        navigate("/detail-products/" + item.id);
                      }}
                    >
                      detail
                    </button>
                    <span>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "20px" }}
                        onClick={() => {
                          DeleteProduct(item.id);
                        }}
                      >
                        delete
                      </button>
                    </span>

                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#edit"
                      style={{
                        width: "80px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        setIdEdit(item.id);
                      }}
                    >
                      edit
                    </button>
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
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              Modal title
                            </h1>

                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <form onSubmit={updateProduct}>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-lg-4">
                                  <p>Update Stok : </p>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <input
                                  className="form-control"
                                  style={{
                                    marginBottom: "10px",
                                    marginLeft: "30px",
                                  }}
                                  value={stocksInput}
                                  onChange={(e) => {
                                    setStocksInput(e.target.value);
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
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
