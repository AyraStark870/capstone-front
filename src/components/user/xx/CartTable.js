import React, { useContext } from "react";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";

export const CartTable = () => {
  const { cart, removeCartItem, updateCartQtyItem } = useContext(CartContext);
  cart.forEach((x) => console.log(x));
  const navigate = useNavigate();
  const removeItem = (item) => {
    removeCartItem(item);
    // navigate("/");
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link className="blue-link" to="/">
                    <Typography>{item.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Select
                    value={item.qty}
                    onChange={(e) => updateCartQtyItem(item, e.target.value)}
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeItem(item)}
                  >
                    x
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
