import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { dataProduct } from "./Data";
// import { Link } from "react-router-dom";

export default function DetailProucts() {
  // relog g kereset
  const { id: idProduct } = useParams();
  // relog g kereset

  const [dataProductById, setDataProductById] = useState();
  useEffect(() => {
    getDataProductById();
  }, []);
  const getDataProductById = () => {
    const data = dataProduct.find((item) => item.id === idProduct);
    // console.log(data);
    setDataProductById(data);
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
        <div className="col-lg-8" style={{ marginTop: "50px" }}>
          {dataProductById && (
            <>
              <h2>{dataProductById.productName}</h2>
              <h2>{dataProductById.price}</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
