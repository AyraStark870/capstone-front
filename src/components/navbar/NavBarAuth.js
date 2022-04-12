import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Button,
} from "@mui/material";

export const NavBarAuth = () => {
  const { logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <>
      {" "}
      <AppBar position="sticky">
        <Toolbar>
          <Link className="logo " to="/">
            <Typography variant="h6">My Shop</Typography>
          </Link>
          <div className="grow"></div>
          <div className="navbar">
            <Link className="cart" to="checkout">
              {cart.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.length}>
                  Cart
                </Badge>
              ) : (
                "Cart"
              )}
            </Link>
            <Link className="account" to="user-orders">
              Orders
            </Link>

            <Button className="logout-btn" onClick={logout}>
              logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
