import React, { useState } from "react";
import { ApiVersi1 } from "../../Config/ApiConfig";

export default function AddProducts() {
  const [idInput, setIdInput] = useState("");
  const [productNameInput, setProductNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [stocksInput, setStocksInput] = useState("");
  const [messageAlert, setMessageAlret] = useState("");
  const [statusAlert, setStatusAlert] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiVersi1.post("/adddataproduct", {
        id: idInput,
        productName: productNameInput,
        price: priceInput,
        stocks: stocksInput,
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
          className={`alert alert-dismissible fade show  ${
            statusAlert === "success" ? "alert-success" : "alert-danger"
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
      <div className="container" style={{ marginTop: "50px" }}>
        <div>
          <p
            style={{
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Tambah Produk
          </p>

          <div className="row">
            <div className="col-lg-3">
              <div>
                <img src={require("../../Images/Coffeland.jpg")} alt="" />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label"></label>
                <input className="form-control" type="file" id="formFile" />
              </div>
            </div>
            <div
              className="col-lg-2"
              style={{ marginTop: "35px", fontSize: "20px" }}
            >
              <p>Id Produk : </p>
              <p>Nama Produk :</p>
              <p>Harga Produk :</p>
              <p>Jumlah Stok :</p>
            </div>
            <div className="col-lg-4" style={{ marginTop: "30px" }}>
              <form onSubmit={handleAddProduct}>
                <input
                  className="form-control"
                  style={{ marginBottom: "10px" }}
                  value={idInput}
                  onChange={(e) => {
                    setIdInput(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  style={{ marginBottom: "10px" }}
                  value={productNameInput}
                  onChange={(e) => {
                    setProductNameInput(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  style={{ marginBottom: "10px" }}
                  value={priceInput}
                  onChange={(e) => {
                    setPriceInput(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  style={{ marginBottom: "10px" }}
                  value={stocksInput}
                  onChange={(e) => {
                    setStocksInput(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{
                    marginTop: "30px",
                    float: "right",
                    width: "200px",
                    height: "50px",
                  }}
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
