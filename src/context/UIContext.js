import { createContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postsApi from "../helpers/postsApi";
import types from "./types";
import uiReducer from "./uiReducer";

export const UIContext = createContext({});

export const ContextUIProvider = ({ children }) => {
  const initialValue = { openModal: false, openModalCheckout: false };
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

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [reload, setReload] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await postsApi.get("products");
      setFilteredProducts(data.products);
      setProducts(data.products);
      setLoadingProducts(false);
      setReload(false);
    } catch (error) {
      console.log(error);
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (reload) {
      fetchProducts();
      setReload(false);
    }
  }, [reload]);

  const filterProductByName = (searchTerm) => {
    var searchResults = products.filter((x) => {
      if (x.name.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
        return x;
      }
    });
    setFilteredProducts(searchResults);
  };
  const listOfProducts = {
    filterProductByName,
    filteredProducts,
    setReload,
    loadingProducts,
  };

  return (
    <UIContext.Provider
      value={{
        ...uiState,
        handleClose,
        handleOpen,
        handleCloseCheckout,
        handleOpenCheckout,
        ...listOfProducts,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
