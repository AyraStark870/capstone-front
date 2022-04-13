import { Grid } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { UIContext } from "../../context/UIContext";
import postsApi from "../../helpers/postsApi";
import { Search } from "../search/Search";
import { Product } from "./Product";

export const ListOfProducts = () => {
  const { userState } = useContext(AuthContext);
  const { filteredProducts, setReload, loadingProducts } =
    useContext(UIContext);
  //const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(false);

  //const [reload, setReload] = useState(true);

  // const fetchProducts = async () => {
  //   const { data } = await postsApi.get("products");
  //   setProducts(data.products);
  // };

  useEffect(() => {
    setReload(true);
  }, []);

  return (
    <>
      {userState.user?.role === "administrator" ? (
        <Link className="link add" to="product/new">
          Add New Product
        </Link>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Search />
      </div>
      <Grid style={{ marginTop: "2px" }} container spacing={3}>
        {filteredProducts.map((product) => (
          <Product product={product} />
        ))}
      </Grid>
    </>
  );
};
