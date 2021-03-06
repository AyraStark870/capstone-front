import React, { useState, useContext } from "react";
import {
  Grid,
  // Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { HandleForm } from "../../helpers/customHook";
import postsApi from "../../helpers/postsApi";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export const UpdateProduct = ({ productState, setEditing, setReload }) => {
  const navigate = useNavigate();
  const { userState } = useContext(AuthContext);
  const [archive, setArchive] = useState("");

  const [formValue, handleInputChange, resetForm] = HandleForm(productState);

  const readArchive = (e) => {
    setArchive(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", archive);
    formData.append("name", formValue.name);
    formData.append("price", formValue.price);
    formData.append("inStock", formValue.inStock);
    formData.append("description", formValue.description);

    let config = {
      headers: {
        authorization: "Bearer " + userState.user.token,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await postsApi.put(
        `products/${formValue._id}`,
        formData,
        config
      );
      setEditing(false);
      setReload(true);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg);
    }
  };
  return (
    <div>
      <Box className="">
        <form onSubmit={handleClick} className="myform">
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                name="name"
                label="name"
                onChange={handleInputChange}
                value={formValue.name}
                inputProps={{ type: "text" }}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                name="description"
                label="description"
                onChange={handleInputChange}
                value={formValue.description}
                inputProps={{ type: "text" }}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                name="inStock"
                label="in stock"
                onChange={handleInputChange}
                value={formValue.inStock}
                inputProps={{ type: "text" }}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                name="price"
                label="price"
                onChange={handleInputChange}
                value={formValue.price}
                inputProps={{ type: "text" }}
              ></TextField>
            </ListItem>

            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                name="imageUrl"
                label="imagen"
                onChange={readArchive}
                filename={formValue.imageUrl}
                inputProps={{ type: "file" }}
              ></TextField>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Update
              </Button>
            </ListItem>
          </List>
        </form>
      </Box>
    </div>
  );
};
