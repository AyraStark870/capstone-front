import { Routes, Route } from "react-router-dom";
import { ListOfProducts } from "../components/adminDashboard/ListOfProducts";
import { Layout } from "../components/Layout";
import { Auth } from "../components/auth/Auth";
import { ProductDetailed } from "../components/adminDashboard/ProductDetailed";
import { CreateProduct } from "../components/adminDashboard/CreateProduct";
import { CartView } from "../components/user/xx/CartView";
import { UserInfo } from "../components/user/xx/UserInfo";

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListOfProducts />} />
        <Route path="login" element={<Auth />} />
        <Route path="checkout" element={<CartView />} />
        <Route path="product/new" element={<CreateProduct />} />
        <Route path="product/:id" element={<ProductDetailed />} />
        <Route path="user-orders" element={<UserInfo />} />
      </Routes>
    </Layout>
  );
};
