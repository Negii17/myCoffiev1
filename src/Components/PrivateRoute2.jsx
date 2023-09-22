import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { GlobalContext } from "../GlobalState/GlobalContext";

export default function PrivateRoute() {
  const [globalState] = useContext(GlobalContext);
  return (
    <div>
      {globalState.dataUserLogin !== "owner" ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
}
