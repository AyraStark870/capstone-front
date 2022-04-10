import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import types from "./types";
import uiReducer from "./uiReducer";

export const UIContext = createContext({});

export const ContextUIProvider = ({ children }) => {
  const initialValue = { openModal: false, openModalCheckout: true };
  const [uiState, dispatch] = useReducer(uiReducer, initialValue);

  const handleOpen = () => {
    dispatch({ type: types.openModal });
  };
  const handleClose = () => {
    dispatch({ type: types.closeModal });
  };
  const handleOpenCheckout = () => {
    dispatch({ type: types.openModalCheckout });
  };
  const handleCloseCheckout = () => {
    dispatch({ type: types.closeModalCheckout });
  };

  return (
    <UIContext.Provider
      value={{
        ...uiState,
        handleClose,
        handleOpen,
        handleCloseCheckout,
        handleOpenCheckout,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
