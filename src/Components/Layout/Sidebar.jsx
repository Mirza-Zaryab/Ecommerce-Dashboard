import React from "react";
import { ReactSVG } from "react-svg";

import "./Sidebar.scss";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/"}>
        <img src="/logo-admin.svg" />
      </Link>
      <div className="sidebar-menu">
        <NavLink to={"/"}>
          <ReactSVG src="/menu-icons/dashboard.svg" />
          Dashboard
        </NavLink>
        <NavLink to={"/orders"}>
          <ReactSVG src="/menu-icons/orders.svg" />
          Orders
        </NavLink>
        <NavLink to={"/sellers"}>
          <ReactSVG src="/menu-icons/business.svg" />
          Sellers
        </NavLink>
        <NavLink to={"/customers"}>
          <ReactSVG src="/menu-icons/customer.svg" />
          Customers
        </NavLink>
        <NavLink to={"/nuvv-spaces"}>
          <ReactSVG src="/menu-icons/spaces.svg" />
          Nuvv Spaces
        </NavLink>
        <NavLink to={"/transanctions"}>
          <ReactSVG src="/menu-icons/transanctions.svg" />
          Transanctions
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
