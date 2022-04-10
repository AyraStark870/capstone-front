import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import postsApi from "../../helpers/postsApi";
import { ProductGrid } from "./ProductGrid";

export const ProductDetailed = () => {
  const params = useParams();
  const { id } = params;

  const { userState } = useContext(AuthContext);
  const [productState, setProductState] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const { data } = await postsApi.get(`products/${id}`);
      setProductState(data.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (reload) {
      fetchProduct();
      setReload(false);
    }
  }, [reload]);

  const deleteProduct = async () => {
    try {
      let config = {
        headers: {
          authorization: "Bearer " + userState.user.token,
        },
      };
      const res = await postsApi.delete(`products/${id}`, config);
      navigate(`/`);
    } catch (error) {
      alert(error.response?.data?.msg);
    }
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ProductGrid
          productState={productState}
          deleteProduct={deleteProduct}
          setReload={setReload}
        />
      )}
    </>
  );
};
