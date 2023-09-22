import React from "react";
import { formatRupiah } from "../Config/Config";

export default function Transactions() {
  return (
    <div>
      <div className="container mt-5">
        <p style={{ fontSize: "35px", fontWeight: "bold" }}>Transactions</p>

        <table
          className="table table-bordered"
          style={{ marginTop: "10px", width: "80%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#FDF5E6" }}>
              <th style={{ width: "1%", textAlign: "center" }}>Id</th>
              <th style={{ textAlign: "center" }}>Nama</th>
              <th style={{ textAlign: "center" }}>Alamat</th>
              <th style={{ textAlign: "center" }}>Kode Pos</th>
              <th style={{ textAlign: "center" }}>Income</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center", width: "30%" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Juandi</td>
              <td>Lombok</td>
              <td style={{ textAlign: "center" }}>13414</td>
              <td>{formatRupiah}10000</td>
              <td>Belum Bayar</td>
              <td style={{ textAlign: "center" }}>
                <span>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "20px" }}
                  >
                    Cancel
                  </button>
                </span>

                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    width: "80px",
                    marginLeft: "20px",
                  }}
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
