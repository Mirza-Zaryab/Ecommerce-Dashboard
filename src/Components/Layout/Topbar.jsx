import "./Topbar.scss";

import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Dropdown, Space, Drawer } from "antd";
import { Link, NavLink } from "react-router-dom";

import SecondaryButton from "../UI/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Reducers/authSlice";

const Topbar = ({ showInput, inputPlaceholder }) => {

  const userImage = useSelector((state) => state.authReducer.user.profile_image);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    console.log("logout");
    dispatch(logout())
    window.location('/login')

  };

  const items = [
    {
      label: <Link to={"/profile"}>Update Profile</Link>,
      key: "0",
    },
    {
      label: <Link to={"/update-password"}>Update Password</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={logoutHandler}>Logout</div>,
      key: "3",
    },
  ];

  return (
    <div className="topbar">
      <div className="search-wrapper">
        {showInput && (
          <div className="search">
            <input type="text" placeholder={`Search a ${inputPlaceholder}`} />
            <ReactSVG
              style={{ maxHeight: "27px" }}
              src="/tools-icons/search.svg"
            />
          </div>
        )}
      </div>
      <div className="main-topbar-wrapper">
        <NavLink to={"/products"}>
          <SecondaryButton className={"topbar-button"}>
            <ReactSVG src="/topbar-icons/products.svg" />
            <h4>Products</h4>
          </SecondaryButton>
        </NavLink>
        {/* <NavLink to={"/products"}>
          <SecondaryButton className={"topbar-button"}>
            <ReactSVG src="/topbar-icons/products.svg" />
            <h4>Categories</h4>
          </SecondaryButton>
        </NavLink> */}
        <div className="menu-and-picture-actions">
          <div className="mobile-menu-button">
            <img
              src="/tools-icons/menu-icon.svg"
              className="svg-menu"
              onClick={showDrawer}
            />
          </div>
          <div className="picture-actions">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="button-more-actions">
                  <img src={userImage} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <Drawer
        title={
          <Link to={"/"}>
            <img src="/logo-admin.svg" />
          </Link>
        }
        placement={"left"}
        closable={true}
        onClose={onClose}
        open={open}
        width={`${window.screen.width * 0.8}px`}
        key={"right"}
        className="mobile-menu-drawer"
      >
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
      </Drawer>
    </div>
  );
};

export default Topbar;
