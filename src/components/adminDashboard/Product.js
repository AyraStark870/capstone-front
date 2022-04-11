import React, { useContext } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { UIContext } from "../../context/UIContext";

export const Product = ({ product }) => {
  const { userState } = useContext(AuthContext);
  const { cart, addCart } = useContext(CartContext);
  const { handleOpen } = useContext(UIContext);
  const { imageUrl, name, description, price, _id } = product;
  const imgUrlShow = imageUrl
    ? `${process.env.REACT_APP_API_URL}${imageUrl}`
    : "";

  const goToLogin = () => {
    handleOpen();
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
      <Card
        sx={{
          marginRight: "5px",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={imgUrlShow}
            height={200}
            width={200}
            title={name}
          ></CardMedia>
          <CardContent>
            <Typography>{name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "space-between" }}>
          {userState?.user?.role === "user" && (
            <Typography>${price}</Typography>
          )}

          {userState?.user?.role === "administrator" ? (
            <Link className="blue-link" to={`product/${_id}`}>
              Product detail
            </Link>
          ) : (
            <Button
              onClick={
                userState?.user?.token
                  ? () => addCart(product)
                  : () => goToLogin()
              }
              size="small"
              color="secondary"
            >
              Add to cart
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
