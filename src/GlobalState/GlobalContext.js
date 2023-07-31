import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const initialState = {
  myName: "Jun",
  // isLogin: isLogin,
  idProduct: "",
  dataCarts: [],
  isLogin: false,
  dataUserLogin: [],
};

// const reducer = () => {};
const reducer = (state, action) => {
  if (action.type === "PROCESS_LOGIN") {
    return {
      ...state,
      isLogin: true,
      dataUserLogin: action.data,
    };
  } else if (action.type === "GET_IDPRODUCT") {
    return {
      ...state,
      idProduct: action.idProduct,
    };
  } else if (action.type === "SEND_TO_CART") {
    const checkProductAlreadyExist = state.dataCarts.filter(
      (item) => item.id === action.data.id
    );
    if (checkProductAlreadyExist.length > 0) {
      return {
        ...state,
        dataCarts: state.dataCarts.map((item) =>
          item.id === action.data.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        ),
      };
    }

    return {
      ...state,
      dataCarts: [
        ...state.dataCarts,
        {
          ...action.data,
          qty: 1,
        },
      ],
    };
  } else if (action.type === "REDUCE_PRODUCT") {
    const checkProductAlreadyExist = state.dataCarts.find(
      (item) => item.id === action.data.id
    );
    if (checkProductAlreadyExist.qty > 1) {
      return {
        ...state,
        dataCarts: state.dataCarts.map((item) =>
          item.id === action.data.id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        ),
      };
    }
    return {
      ...state,
      dataCarts: state.dataCarts.filter((item) => item.id !== action.data.id),
    };
  } else if (action.type === "REMOVE_PRODUCT") {
    return {
      ...state,
      dataCarts: state.dataCarts.filter((item) => item.id !== action.data.id),
    };
  }
};
