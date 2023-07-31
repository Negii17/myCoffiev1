import React, { useContext, useState } from "react";
import { formatRupiah } from "../Config/Config";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function Cart() {
  const [globalState, globalDispatch] = useContext(GlobalContext);
  const addQtyProduct = (id) => {
    globalDispatch({
      type: "SEND_TO_CART",
      data: {
        id: id,
      },
    });
  };
  const reduceQtyProduct = (id) => {
    globalDispatch({
      type: "REDUCE_PRODUCT",
      data: {
        id: id,
      },
    });
  };

  return (
    <div>
      <div style={{ marginTop: "60px" }}>
        <h2 style={{ fontFamily: "cursive" }}>My Cart</h2>
        {globalState.dataCarts.length > 0 ? (
          <div className="row">
            <div className="col-lg-8">
              <ul className="list-group list-group-flush">
                {globalState.dataCarts.map((item, index) => {
                  return (
                    <div key={index}>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-lg-1">
                            <div
                              className="card"
                              style={{
                                width: "4em",
                                height: "6em",
                                marginTop: "5px",
                              }}
                            >
                              <img
                                src={require("../Images/" + item.img)}
                                alt={item.productName}
                                className="card-img-top card-img-bottom "
                                style={{
                                  width: "auto",
                                  height: "auto",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-3"
                            style={{ marginLeft: "5px" }}
                          >
                            <span
                              style={{
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              {item.productName}
                            </span>
                            <br />
                            <span style={{ fontSize: "15px" }}>
                              Harga : {formatRupiah(item.price)}
                            </span>
                            <div
                              style={{ width: "120px", marginTop: "8px" }}
                              className="input-group mb-3"
                            >
                              <span
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  reduceQtyProduct(item.id);
                                }}
                              >
                                -
                              </span>
                              <input
                                type="text"
                                className="form-control text-center"
                                aria-label="Amount (to the nearest dollar)"
                                value={item.qty}
                                readOnly
                              />
                              <span
                                className="btn btn-outline-success"
                                onClick={() => {
                                  addQtyProduct(item.id);
                                }}
                              >
                                +
                              </span>
                            </div>
                          </div>
                          <div
                            className="col-lg-1"
                            style={{
                              marginTop: "58px",
                              position: "absolute",
                              marginLeft: "210px",
                            }}
                          >
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                globalDispatch({
                                  type: "REMOVE_PRODUCT",
                                  data: {
                                    id: item.id,
                                  },
                                });
                                // console.log(item.id);
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <div className="col-lg-7">
                            <p
                              style={{
                                fontSize: "18px",
                                marginTop: "50px",
                                fontWeight: "bold",
                                marginLeft: "15rem",
                              }}
                            >
                              Sub Total : {formatRupiah(item.qty * item.price)}
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
            {globalState.dataCarts.map((item, index) => {
              return (
                <div className="col-lg-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomor Telpon"
                    style={{ margin: "5px" }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Alamat"
                    style={{ margin: "5px" }}
                  />
                  <input
                    style={{
                      height: "10rem",
                      margin: "5px",
                      textAlign: "left",
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Catatan"
                  />
                  <h3>Total :{+(item.qty * item.price)}</h3>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="alert alert-danger" role="alert">
              Keranjang Kosong
            </div>
          </>
        )}
      </div>
    </div>
  );
}
