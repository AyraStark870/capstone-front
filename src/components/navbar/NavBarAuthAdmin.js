import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

export const NavBarAuthAdmin = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      {" "}
      <AppBar position="sticky">
        <Toolbar>
          <Link color="primary" className="logo" to="/">
            <Typography variant="h6">My Shop</Typography>
          </Link>
          <div className="grow"></div>

          <button className="logout-btn" onClick={logout}>
            logout admin
          </button>
        </Toolbar>
      </AppBar>
    </>
  );
};
