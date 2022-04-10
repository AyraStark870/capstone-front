import React, { useState } from "react";
import {
  Grid,
  // Link,
  List,
  ListItem,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Button,
  Modal,
  Box,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UpdateProduct } from "./UpdateProduct";

export const ProductGrid = ({ productState, deleteProduct, setReload }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {editing ? (
        <UpdateProduct
          productState={productState}
          setReload={setReload}
          setEditing={setEditing}
        />
      ) : (
        <Grid sx={{ marginTop: "30px" }} container spacing={1}>
          <Grid item md={8} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1">
                  <span style={{ textDecoration: "underline" }}>
                    Product Name:
                  </span>
                  {` ${productState.name}`}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  {" "}
                  <span style={{ textDecoration: "underline" }}>Price:</span>
                  {`   $${productState.price}`}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>In stock:</span>
                  {`  ${productState.inStock}`}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography>
                  <span style={{ textDecoration: "underline" }}>
                    Description:
                  </span>
                  {` ${productState.description}`}
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={`${process.env.REACT_APP_API_URL}${productState.imageUrl}`}
                  height={250}
                ></CardMedia>
                <CardContent>
                  {" "}
                  <Button
                    onClick={() => setEditing(true)}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                  >
                    update
                  </Button>
                  <Button
                    onClick={deleteProduct}
                    fullWidth
                    variant="outlined"
                    color="error"
                  >
                    delete
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      )}

      <Link className="blue-link" to="/" style={{ marginBottom: 20 }}>
        <Typography>back to products</Typography>
      </Link>
    </>
  );
};
