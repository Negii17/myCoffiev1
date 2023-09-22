import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { dataProduct } from "./Data";
import { GlobalContext } from "../../GlobalState/GlobalContext";
// import { Link } from "react-router-dom";

export default function DetailProucts() {
  // relog g kereset
  const { id: idProduct } = useParams();
  // relog g kereset
  const [globalState, globalDispacth] = useContext(GlobalContext);
  const navigate = useNavigate;

  const [searchResultsDataProduct, setsearchResultsDataProduct] =
    useState(dataProduct);

  const [dataProductById, setDataProductById] = useState();
  useEffect(() => {
    getDataProductById();
  }, []);
  const getDataProductById = () => {
    const data = dataProduct.find((item) => item.id === idProduct);
    // console.log(data);
    setDataProductById(data);
  };

  const handleOrder = (id) => {
    if (globalState.isLogin) {
      const dataById = searchResultsDataProduct.find((item) => item.id === id);
      console.log("idproduct", dataById);
      globalDispacth({
        type: "SEND_TO_CART",
        data: dataById,
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          {dataProductById && (
            <>
              <div
                className="card"
                style={{ width: "18rem", marginTop: "35px" }}
              >
                <img
                  className="img-fluid card h-100 shadow"
                  src={require("../../Images/" + dataProductById.img)}
                  alt={dataProductById.productName}
                />
              </div>
            </>
          )}
        </div>
        <div className="col-lg-8" style={{ marginTop: "80px" }}>
          {dataProductById && (
            <>
              <h2>{dataProductById.productName}</h2>
              <h2>{dataProductById.price}</h2>
              <p>aogdiagdiuga9uwihdouiahjdoiwhdohawda</p>
              <button
                className="btn btn-success"
                style={{ marginTop: "100px", width: "100px" }}
                onClick={() => {
                  handleOrder(dataProductById.id);
                }}
              >
                Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
