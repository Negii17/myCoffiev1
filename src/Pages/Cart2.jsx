import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalState/GlobalContext";
import { ApiVersi1 } from "../Config/ApiConfig";

export default function Cart2() {
  const [globalState, globalDispacth] = useContext(GlobalContext);
  const [dataCarts, setDataCarts] = useState([]);
  console.log("ini Cart", dataCarts);
  const [dataProduct, setDataProduct] = useState([]);
  console.log(dataProduct);

  useEffect(() => {
    getDataCart();
  }, []);
  useEffect(() => {
    getDataProductApiById();
  }, []);

  const getDataCart = async () => {
    try {
      const response = await ApiVersi1.get("/getdatacart");
      setDataCarts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataProductApiById = async () => {
    try {
      const response = await ApiVersi1.get(
        `/getdataproductbyid/${dataProduct.data.data.length.productId}`
      );
      setDataProduct(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
        <pre>{JSON.stringify(globalState.dataCarts, null, 2)}</pre>
        <div className="row">
          <div>
            {globalState.dataCarts.length > 0 ? (
              <>
                {dataCarts.map((item, index) => {
                  return (
                    <div key={index} className="col-lg-8">
                      <div className="scrollbox" style={{ overflow: "auto" }}>
                        <div
                          data-bs-spy="scroll"
                          data-bs-root-margin="0px 0px -40%"
                          data-bs-smooth-scroll="true"
                          className="scrollspy-example bg-light p-3 rounded-2"
                          tabIndex="0"
                        >
                          <ul className="list-group list-group-flush">
                            <div>
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
                                      {/* {globalState.dataProduct.productName} */}
                                    </span>
                                    <br />
                                    <span
                                      style={{
                                        fontSize: "15px",
                                        color: "#198754",
                                      }}
                                    >
                                      {/* Harga : {globalState.dataProduct.price} */}
                                    </span>
                                    <div
                                      style={{
                                        width: "120px",
                                        marginTop: "8px",
                                      }}
                                      className="input-group mb-3"
                                    >
                                      <span className="btn btn-outline-danger">
                                        -
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control text-center"
                                        aria-label="Amount (to the nearest dollar)"
                                        value={item.qty}
                                        readOnly
                                      />
                                      <span className="btn btn-outline-success">
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
                                    <button className="btn btn-danger">
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
    </div>
  );
}
