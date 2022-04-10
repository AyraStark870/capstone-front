import { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import postsApi from "../helpers/postsApi";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import types from "./types";

export const CartContext = createContext({});

export const ContextCartProvider = ({ children }) => {
  const navigate = useNavigate();
  const init = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return { cart };
  };

  const [cartState, dispatch] = useReducer(CartReducer, {}, init);

  const addCart = (item) => {
    //localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.cartAdd, payload: item });
  };
  const removeCartItem = (item) => {
    //localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.cartRemoveItem, payload: item });
  };
  const emptyCart = () => {
    const cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: types.cartEmpty });
    // navigate("/");
  };
  const updateCartQtyItem = async (item, qty) => {
    const { data } = await postsApi.get(`products/${item._id}`);
    console.log(data);
    if (data.inStock < qty) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: types.cartUpdateQtyItem, payload: { ...item, qty } });
  };
  return (
    <CartContext.Provider
      value={{
        ...cartState,
        emptyCart,
        addCart,
        removeCartItem,
        updateCartQtyItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
