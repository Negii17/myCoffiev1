import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalState/GlobalContext";
import { ApiVersi1 } from "../Config/ApiConfig";
import { formatRupiah } from "../Config/Config";

export default function Cart2() {
  const [globalState, globalDispacth] = useContext(GlobalContext);
  const [dataCarts, setDataCarts] = useState([]);

  useEffect(() => {
    getDataCart();
  }, []);

  const getDataCart = async () => {
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.get("/getdatacart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setDataCarts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addQtyProduct = async (id) => {
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.post(
        "/adddatacart",
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      getDataCart();
    } catch (error) {
      console.log(error);
    }
  };
  const reduceQtyProduct = async (id) => {
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.post(
        "/reduceqtyproduct",
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response);
      getDataCart();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCart = async (id) => {
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.delete(`/deletecart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getDataCart();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  let totalHarga = 0;
  dataCarts.forEach((item) => {
    totalHarga += item.Product.price * item.qty;
  });

  return (
    <div>
      <div style={{ marginTop: "60px" }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            color: "#198754",
            fontWeight: "bold",
          }}
        >
          My Cart
        </h2>
        {/* <pre>{JSON.stringify(globalState.dataCarts, null, 2)}</pre> */}
        <div>
          {globalState.dataCarts.length > 0 ? (
            <>
              <div className="row">
                <div className="col-lg-8">
                  <div className="scrollbox">
                    <div>
                      <ul className="list-group list-group-flush">
                        {dataCarts.map((item, index) => {
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
                                      {/* <img
                                      src={require("../Images/" + item.img)}
                                      alt={item.productName}
                                      className="card-img-top card-img-bottom "
                                      style={{
                                        width: "auto",
                                        height: "auto",
                                      }}
                                    /> */}
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
                                      {item.Product.productName}
                                    </span>
                                    <br />
                                    <span
                                      style={{
                                        fontSize: "15px",
                                        color: "#198754",
                                      }}
                                    >
                                      Harga : {item.Product.price}
                                    </span>

                                    <div
                                      style={{
                                        width: "120px",
                                        marginTop: "8px",
                                      }}
                                      className="input-group mb-3"
                                    >
                                      <span
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                          reduceQtyProduct(item.Product.id);
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
                                          addQtyProduct(item.Product.id);
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
                                        deleteCart(item.id);
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
                                      Sub Total :
                                      {formatRupiah(
                                        item.Product.price * item.qty
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
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
                      placeholder="Kode pos"
                      style={{ marginBottom: "5px", width: "90%" }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Catatan"
                      style={{ marginBottom: "5px", width: "90%" }}
                    />

                    <p style={{ marginTop: "70px", marginBottom: "0" }}>
                      Tax: Rp. 0
                    </p>
                    <p style={{ color: "#198754" }}>
                      Total Harga: {formatRupiah(totalHarga)}
                    </p>
                    <button
                      className="btn btn-outline-success w-80"
                      style={{ marginLeft: "20%" }}
                    >
                      Payment
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="alert alert-danger" role="alert">
                Keranjang Kosong
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
