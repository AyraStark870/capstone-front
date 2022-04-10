import { Grid } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import postsApi from "../../helpers/postsApi";
import { Product } from "./Product";

export const ListOfProducts = () => {
  const { userState } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(true);

  const fetchProducts = async () => {
    const { data } = await postsApi.get("products");
    setProducts(data.products);
  };

  useEffect(() => {
    if (reload) {
      fetchProducts();
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      {userState.user?.role === "administrator" ? (
        <Link className="link" to="product/new">
          Add New Product
        </Link>
      ) : (
        ""
      )}

      <Grid style={{ marginTop: "2px" }} container spacing={3}>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </Grid>
    </>
  );
};
