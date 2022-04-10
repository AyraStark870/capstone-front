import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthReducer from "./AuthReducer";
import types from "./types";

export const AuthContext = createContext({});

export const ContextAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const init = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return { user };
  };

  const [userState, dispatch] = useReducer(AuthReducer, {}, init);

  const auth = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.auth, payload: user });
    navigate("/");
  };
  const logout = () => {
    const user = {};
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.logout });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userState, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
