import React, { useContext, useEffect, useState } from "react";
// import { dataProduct } from "./Products/Data";
import { GlobalContext } from "../GlobalState/GlobalContext";
import { useNavigate } from "react-router-dom";
import { ApiVersi1, ApiVersi2 } from "../Config/ApiConfig";
import { formatRupiah } from "../Config/Config";

export default function Home() {
  const [globalState, globalDispatch] = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    getDataProductApi();
  }, []);

  const setFormatRupiah = formatRupiah;
  const [allDataProducts, setAllDataProducts] = useState([]);
  const [image, setImage] = useState("");

  const getDataProductApi = async () => {
    const response = await ApiVersi1.get("/getdataproducts");

    // console.log(response);
    setAllDataProducts(response.data.data);
  };
  const getImage = async (id) => {
    const response = await ApiVersi2.get(`/uploads/${id}`);

    console.log(response);
  };

  const handleOrder = (id) => {
    if (globalState.isLogin) {
      const dataById = allDataProducts.find((item) => item.id === id);
      console.log("idproduct", dataById);
      globalDispatch({
        type: "SEND_TO_CART",
        data: dataById,
      });
    } else {
      navigate("/login");
    }
  };

  const handleOrder2 = async (id) => {
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

  const getDataCart = async () => {
    try {
      const token = localStorage.token;
      const response = await ApiVersi1.get("/getdatacart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // setDataCarts(response.data.data);
      globalDispatch({
        type: "PROCCESS_GET_DATA_CART",
        data: response.data.data,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="mt-5 mb-5 h-100 shadow">
        <div className="card text-white " style={{ border: "opx" }}>
          <img
            className="img-fluid"
            src={require("../Images/Jumbotron.png")}
            alt=""
          />
        </div>
      </div>
      {/* Data Product */}
      <div className="mt-5">
        <h2 style={{ color: "	#6B8E23", fontWeight: "bolder" }}>
          Let's Order . . .
        </h2>
        <div className="row row-cols-1 row-cols-md-4 g-4 ">
          {allDataProducts.map((item, index) => {
            return (
              <div key={index} className="col">
                <div className="card shadow ">
                  <button
                    onClick={() => {
                      getImage(item.img);
                    }}
                  >
                    view
                  </button>
                  <div
                    style={{
                      backgroundColor: "#FDF5E6",
                    }}
                  >
                    <img
                      src={image}
                      className="card-img-top"
                      alt="..."
                      style={{
                        height: "20rem",
                        width: "18rem",
                        margin: "0.5rem",
                      }}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{item.productName}</h5>
                      <p className="card-text">{setFormatRupiah(item.price)}</p>
                      <div className="row">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-outline-success w-100"
                            onClick={() => {
                              console.log(item.id);
                              globalDispatch({
                                type: "GET_IDPRODUCT",
                                idProduct: item.id,
                              });
                              navigate("/detail-products/" + item.id);
                            }}
                          >
                            Detail
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button
                            onClick={() => {
                              // handleOrder(item.id);
                              handleOrder2(item.id);
                            }}
                            className="btn btn-success w-100"
                          >
                            Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* End Data Product */}
    </div>
  );
}
