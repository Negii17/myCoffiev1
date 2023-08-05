import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailProucts from "./Pages/Products/DetailProucts";
import PrivateRoute from "./Components/PrivateRoute";
import Profil from "./Pages/Profil";
import { GlobalContext } from "./GlobalState/GlobalContext";
import { ApiVersi1 } from "./Config/ApiConfig";
import PublicRoute from "./Components/PublicRoute";

function App() {
  const [globalState, globalDispacth] = useContext(GlobalContext);

  // const [tesInput, setTesInput] = useState("");
  // console.log(tesInput);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      if (localStorage.token) {
        const token = localStorage.token;
        // console.log("chek token disini", token);
        const responseCheckToken = await ApiVersi1.get("/checktoken", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Cek token: ", responseCheckToken);
        globalDispacth({
          type: "PROCESS_LOGIN",
          data: responseCheckToken.data.data,
          // data: [
          //   {
          //     email: responseCheckToken.data.data.email,
          //     fullName: responseCheckToken.data.data.fullname,
          //     id: responseCheckToken.data.data.id,
          //   },
          // ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      {/* <input
        type="text"
        className="form-control"
        onChange={(e) => {
          setTesInput(e.target.value);
        }}
      /> */}
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/detail-products/:id" element={<DetailProucts />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profil" element={<Profil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
