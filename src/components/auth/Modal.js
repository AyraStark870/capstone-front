import React, { useContext, useState } from "react";
import { List, ListItem, Typography, Button, TextField } from "@mui/material";
import { UIContext } from "../../context/UIContext";
import { AuthContext } from "../../context/authContext";
import { HandleForm } from "../../helpers/customHook";
import postsApi from "../../helpers/postsApi";

import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export function CustomizedDialogs() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { openModal, handleClose, handleOpen } = useContext(UIContext);
  const { auth } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const initialValue = {
    email: "",
    password: "",
  };
  const [formValue, handleInputChange, resetForm] = HandleForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const path = isLogin ? "users/login" : "users/new";
      const res = await postsApi.post(path, formValue);
      const { token, user } = res.data;
      auth({ token, ...user });
      handleClose();
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
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isLogin ? "Login Form" : "Register Form"}
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit} className="">
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="email"
                  label="Email, admin@gmail to login as administrator"
                  value={formValue.email}
                  inputProps={{ type: "email" }}
                  onChange={handleInputChange}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label=" Password, 123456 to login as administrator"
                  value={formValue.password}
                  inputProps={{ type: "password" }}
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
                  {isLogin ? "Login" : "register"}
                </Button>
              </ListItem>
              <Button
                onClick={() => setIsLogin(!isLogin)}
                style={{ marginLeft: "2px" }}
                color="secondary"
              >
                {isLogin ? (
                  <Typography>Don't have an account? Register</Typography>
                ) : (
                  <Typography>Already have an account? Login</Typography>
                )}
              </Button>
            </List>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  //z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 600,
  bgcolor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  border: "2px solid red",
  padding: "16px 32px 24px 32px",
});
export const ModalAuth = ({}) => {
  const { openModal, handleClose, handleOpen } = useContext(UIContext);
  const { auth } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const initialValue = {
    email: "",
    password: "",
  };
  const [formValue, handleInputChange, resetForm] = HandleForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const path = isLogin ? "users/login" : "users/new";
      const res = await postsApi.post(path, formValue);
      const { token, user } = res.data;
      auth({ token, ...user });
      handleClose();
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div>
      {" "}
      <Modal
        className="modal"
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="">
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="email"
                  label="Email"
                  value={formValue.email}
                  inputProps={{ type: "email" }}
                  onChange={handleInputChange}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  value={formValue.password}
                  inputProps={{ type: "password" }}
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
                  {isLogin ? "Login" : "register"}
                </Button>
              </ListItem>
              <Button
                onClick={() => setIsLogin(!isLogin)}
                style={{ marginLeft: "2px" }}
              >
                {isLogin ? (
                  <Typography>Don't have an account? Register</Typography>
                ) : (
                  <Typography>Already have an account? Login</Typography>
                )}
              </Button>
            </List>
          </form>
        </Box>
      </Modal>{" "}
    </div>
  );
};
