import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { UIContext } from "../../context/UIContext";

export const NavBar = () => {
  const { openModal, handleClose, handleOpen } = useContext(UIContext);
  console.log(openModal);
  return (
    <>
      {" "}
      <AppBar position="sticky">
        <Toolbar>
          <Link className="logo " to="/">
            <Typography variant="h6">My Shop</Typography>
          </Link>
          <div className="grow"></div>
          <Button onClick={handleOpen} className="logo ">
            <Typography variant="h6">login</Typography>
          </Button>
          {/* <Link className="logo " to="/login">
            <Typography variant="h6">login</Typography>
          </Link> */}
        </Toolbar>
      </AppBar>
      {/* <nav className="navbar navbar-dark bg-dark d-flex justify-content-between py-3 px-4">
        <div>
          <Link className="logo " to="/">
            <span>M</span>y<span>S</span>hop
          </Link>
        </div>
        <div className="">
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </div>
      </nav> */}
    </>
  );
};
