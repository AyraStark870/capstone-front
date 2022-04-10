import types from "./types";

const uiReducer = (state, action) => {
  switch (action.type) {
    case types.openModal:
      return {
        ...state,
        openModal: true,
      };
    case types.closeModal:
      return {
        ...state,
        openModal: false,
      };
    case types.openModalCheckout:
      return {
        ...state,
        openModalCheckout: true,
      };
    case types.closeModalCheckout:
      return {
        ...state,
        openModalCheckout: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
