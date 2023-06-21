import React, { useContext } from "react";
import { dataProduct } from "./Products/Data";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function Home() {
  // console.log("dataProduct di jsx", dataProduct);
  const [globalState] = useContext(GlobalContext);
  console.log("Global Di Home", globalState);
  return (
    <div className="container mb-5">
      <div className="mt-5">
        <img
          className="img-fluid"
          src={require("../Images/Jumbotron.png")}
          alt=""
          style={{ width: "100%", height: "10cm" }}
        />
      </div>
      {/* Data Product */}
      <div className="mt-5">
        <h2 style={{ color: "	#6B8E23" }}>Let's Order . . .</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {dataProduct.map((item, index) => {
            return (
              <div key={index} className="col">
                <div className="card h-100 shadow">
                  <div style={{ backgroundColor: "#FDF5E6" }}>
                    <img
                      src={require(`../Images/${item.img}`)}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.productName}</h5>
                      <p className="card-text">{item.price}</p>
                      <div className="row">
                        <div className="col-lg-6">
                          <button className="btn btn-outline-success w-100">
                            Detail
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button className="btn btn-success w-100">
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
