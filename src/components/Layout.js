import { Box } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ModalAuth, CustomizedDialogs } from "./auth/Modal";
import { NavBar } from "./navbar/NavBar";
import { NavBarAuth } from "./navbar/NavBarAuth";
import { NavBarAuthAdmin } from "./navbar/NavBarAuthAdmin";

export const Layout = ({ children }) => {
  const { userState } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!userState.user.token ? (
        <NavBar />
      ) : userState.user.role === "administrator" ? (
        <NavBarAuthAdmin />
      ) : (
        <NavBarAuth />
      )}

      <Box sx={{ padding: "10px 200px" }}>
        <CustomizedDialogs />
        {/* <ModalAuth /> */}
        {children}
      </Box>
    </Box>
  );
};
