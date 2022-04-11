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
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";
import { UIContext } from "../../../context/UIContext";
import { CartTable } from "./CartTable";
import { ModalCheckout } from "./CheckoutModal";

export const CartView = () => {
  const { cart } = useContext(CartContext);
  const { handleOpenCheckout } = useContext(UIContext);

  return (
    <div style={{ marginTop: "25px" }}>
      <ModalCheckout cart={cart} />
      {cart.length === 0 ? (
        <Typography>the cart is empty</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <CartTable cart={cart} />
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h">
                    Total amount to pay: $
                    {cart?.reduce((a, x) => a + x.qty * x.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItem>
                    <Typography>
                      {cart?.reduce((a, x) => a + x.qty, 0)} items
                    </Typography>
                  </ListItem>
                </ListItem>
              </List>
              <Button
                onClick={handleOpenCheckout}
                variant="contained"
                color="primary"
                fullWidth
              >
                Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
