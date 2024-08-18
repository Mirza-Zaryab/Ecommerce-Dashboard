import "./Dashboard.scss";

import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../Components/Layout/Layout";
import Main from "./DashboardPages/Main";
import Orders from "./DashboardPages/Orders";
import Sellers from "./DashboardPages/Sellers";
import Customers from "./DashboardPages/Customers";
import NuvvSpaces from "./DashboardPages/NuvvSpaces";
import Transanctions from "./DashboardPages/Transanctions";
import Profile from "./DashboardPages/Profile";
import UpdatePassword from "./DashboardPages/UpdatePassword";
import Products from "./DashboardPages/Products";
import NewProduct from "./DashboardPages/NewProduct";
import OrderDetails from "./DashboardPages/OrderDetails";
import SelectSeller from "./DashboardPages/SelectSeller";
import NewSeller from "./DashboardPages/NewSeller";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/orders/:orderId/order-details"
            element={<OrderDetails />}
          />
          <Route
            path="/orders/:orderId/order-details/select-a-seller"
            element={<SelectSeller />}
          />

          <Route path="/sellers" element={<Sellers />} />
          <Route path="/sellers/add-new-seller" element={<NewSeller />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/nuvv-spaces" element={<NuvvSpaces />} />
          <Route path="/transanctions" element={<Transanctions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add-new-product" element={<NewProduct />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Dashboard;
