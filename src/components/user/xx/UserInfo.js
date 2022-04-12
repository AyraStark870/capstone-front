import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import postsApi from "../../../helpers/postsApi";

export const UserInfo = () => {
  const { userState } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  let config = {
    headers: {
      authorization: "Bearer " + userState.user.token,
    },
  };
  const fetchProducts = async () => {
    try {
      const { data } = await postsApi.get(
        `orders/${userState.user._id}`,
        config
      );
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="orders">
      <Card sx={{ width: "800px" }}>
        <List>
          <ListItem>
            <Typography component="h5" variant="h5">
              Orders History
            </Typography>
          </ListItem>
          <ListItem>
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>TOTAL</TableCell>
                      <TableCell>PAID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((x) => (
                      <TableRow key={x._id}>
                        <TableCell>{x._id.substring(20, 24)}</TableCell>
                        <TableCell>{x.createdAt}</TableCell>
                        <TableCell>${x.total}</TableCell>
                        <TableCell>
                          {x.paid ? `already paid` : "not paid"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </ListItem>
        </List>
      </Card>
    </div>
  );
};
