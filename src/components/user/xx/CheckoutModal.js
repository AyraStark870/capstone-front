import React, { useContext, useState } from "react";
import {
  Grid,
  // Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  //Modal,
  // Box,
  TextField,
} from "@mui/material";
import { UIContext } from "../../../context/UIContext";
import { AuthContext } from "../../../context/authContext";
import { HandleForm } from "../../../helpers/customHook";
import postsApi from "../../../helpers/postsApi";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";
import { CartContext } from "../../../context/cartContext";
import { useNavigate } from "react-router-dom";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#fff",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        style={{ textAlign: "center" }}
        color="secondary"
        variant="h6"
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          color="secondary"
          className={classes.closeButton}
          onClick={onClose}
        >
          {/* <CloseIcon />s */}X
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
}))(MuiDialogContent);

export function ModalCheckout({ cart }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { openModalCheckout, handleCloseCheckout, handleOpenCheckout } =
    useContext(UIContext);
  const { userState } = useContext(AuthContext);
  const { emptyCart } = useContext(CartContext);

  const navigate = useNavigate();

  const initialValue = {
    name: "",
    address: "",
  };
  const [formValue, handleInputChange, resetForm] = HandleForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValue.name === "" || formValue.address === "") {
      enqueueSnackbar(`name and address are required fields`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
    const orderItems = cart.map((x) => ({
      _id: x._id,
      quantity: x.qty,
      price: x.price,
    }));
    let config = {
      headers: {
        authorization: "Bearer " + userState.user.token,
      },
    };
    const data = {
      user: userState.user._id,
      orderItems,
      userAddress: formValue.address,
      numberOfItems: cart.reduce((a, x) => a + x.qty, 0),
      total: cart.reduce((a, x) => a + x.qty * x.price, 0),
    };
    try {
      const res = await postsApi.post("orders", data, config);
      enqueueSnackbar(
        `order successfully save in the DB, with id: ${res.data.order._id}`,
        {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      emptyCart();
      handleCloseCheckout();
      navigate("/");
    } catch (error) {
      const alert = error.response.data.msg;
      enqueueSnackbar(alert, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleCloseCheckout}
        aria-labelledby="customized-dialog-title"
        open={openModalCheckout}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseCheckout}>
          Order Form
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit} className="">
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="name"
                  label="name"
                  value={formValue.name}
                  inputProps={{ type: "name" }}
                  onChange={handleInputChange}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="address"
                  label="address"
                  value={formValue.address}
                  inputProps={{ type: "address" }}
                  onChange={handleInputChange}
                ></TextField>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  Submit
                </Button>
              </ListItem>
            </List>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
