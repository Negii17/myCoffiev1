import axios from "axios";
// import { useContext } from "react";
// import { GlobalContext } from "../GlobalState/GlobalContext";

export const ApiVersi1 = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});
export const ApiVersi2 = axios.create({
  baseURL: "http://localhost:3001/api/v2",
});

// const [globalState, globalDispacth] = useContext(GlobalContext);

// export const checkToken = async (token) => {
//   try {
//     const responseCheckToken = await ApiVersi1.get("/checktoken", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     globalDispacth({
//       type: "PROCESS_LOGIN",
//       data: responseCheckToken.data.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
