import React from "react";

import Sidebar from "./Sidebar";

import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
