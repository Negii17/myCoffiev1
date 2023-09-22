import React, { useContext } from "react";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function MyTransactions() {
  const [globalState, globalDispacth] = useContext(GlobalContext);

  return (
    <div className="card shadow" style={{ marginTop: "40px" }}>
      <h2 style={{ color: "#198754" }}>My Transactions</h2>
      <table>
        <tr>
          <td>No</td>
          <td>Nama Produk</td>
          <td>Jumlah</td>
          <td>Harga</td>
          <td>Status</td>
        </tr>
      </table>
    </div>
  );
}
