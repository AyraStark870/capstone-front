import types from "./types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case types.auth:
      return {
        ...state,
        user: action.payload,
      };
    case types.logout:
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};

export default AuthReducer;
