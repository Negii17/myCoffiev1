import React, { useContext, useState } from "react";
// import { formatRupiah } from "../Config/Config";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function Cart() {
  const [globalState, globalDispatch] = useContext(GlobalContext);
  console.log("Data Cart : ", globalState.dataCarts);
  // const addQtyProduct = (id) => {
  //   globalDispatch({
  //     type: "SEND_TO_CART",
  //     data: {
  //       id: id,
  //     },
  //   });
  // };
  // const reduceQtyProduct = (id) => {
  //   globalDispatch({
  //     type: "REDUCE_PRODUCT",
  //     data: {
  //       id: id,
  //     },
  //   });
  // };
  // let totalHarga = 0;

  return (
    <div>
      {/* <div style={{ marginTop: "60px" }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            color: "#198754",
            fontWeight: "bold",
          }}
        >
          My Cart
        </h2>
        {globalState.dataCarts.length > 0 ? (
          <div className="row">
            <div>
              {globalState.dataCarts.map((item, index) => {
                // totalHarga += item.qty * item.price;
                return (
                  <div className="col-lg-8">
                    <div className="scrollbox" style={{ overflow: "auto" }}>
                      <div
                        data-bs-spy="scroll"
                        data-bs-root-margin="0px 0px -40%"
                        data-bs-smooth-scroll="true"
                        class="scrollspy-example bg-light p-3 rounded-2"
                        tabindex="0"
                      >
                        <ul className="list-group list-group-flush">
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
                                      color: "#198754",
                                    }}
                                  >
                                    {item.productName}
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "15px",
                                      color: "#198754",
                                    }}
                                  >
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
                                      color: "#198754",
                                    }}
                                  >
                                    Sub Total :{" "}
                                    {formatRupiah(item.qty * item.price)}
                                  </p>
                                </div>
                              </div>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className="col-lg-4"
                style={{
                  marginLeft: "55rem",
                  marginTop: "0px",
                }}
              >
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Alamat"
                    style={{ marginBottom: "5px", width: "90%" }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomer Hp"
                    style={{ marginBottom: "5px", width: "90%" }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Catatan"
                    style={{ marginBottom: "5px", width: "90%" }}
                  />

                  <p
                    style={{
                      marginTop: "70px",
                      marginLeft: "210px",
                      marginBottom: "0",
                    }}
                  >
                    Tax : Rp. 0
                  </p>
                  <p style={{ color: "#198754", marginLeft: "210px" }}>
                    Total Harga : {formatRupiah(totalHarga)}{" "}
                  </p>
                  <button
                    className="btn btn-outline-success w-80"
                    style={{ marginLeft: "20%", marginLeft: "300px" }}
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="alert alert-danger" role="alert">
              Keranjang Kosong
            </div>
          </>
        )}
      </div> */}
    </div>
  );
}
