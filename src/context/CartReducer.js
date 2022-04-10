import types from "./types";

const CartReducer = (state, action) => {
  switch (action.type) {
    case types.cartAdd:
      const existItem = state.cart.find((x) => x._id === action.payload._id);
      const qty = existItem ? existItem.qty + 1 : 1;
      const newCart = existItem
        ? state.cart.map((x) =>
            x._id === existItem._id ? { ...action.payload, qty } : x
          )
        : [...state.cart, { ...action.payload, qty }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };

    case types.cartUpdateQtyItem:
      // const existIt = state.cart.find(
      //   (x) => x._id === action.payload._id
      // );
      // const qtyIt = existIt ? existItem.qty + 1 : 1;
      const newCartUpdated = state.cart.map((x) =>
        x._id === action.payload._id ? { ...action.payload } : x
      );

      localStorage.setItem("cart", JSON.stringify(newCartUpdated));
      return {
        ...state,
        cart: newCartUpdated,
      };

    case types.cartRemoveItem:
      const cartItems = state.cart.filter((x) => x._id !== action.payload._id);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return {
        ...state,
        cart: cartItems,
      };

    case types.cartEmpty:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
