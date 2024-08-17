import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./BreadCrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  // Remove numeric segments from the pathnames
  const filteredPathnames = pathnames.filter((path) => !/^\d+$/.test(path));

  const breadcrumbItems = filteredPathnames.map((path, index) => {
    const isLast = index === filteredPathnames.length - 1;
    const displayName = path
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

    const routeTo = `/${filteredPathnames.slice(0, index + 1).join("/")}`;

    return (
      <React.Fragment key={index}>
        {isLast ? (
          <li aria-current="page">{displayName}</li>
        ) : (
          <li>
            <Link to={routeTo}>{displayName}</Link>
          </li>
        )}
        {!isLast && <li className="separator"> / </li>}
      </React.Fragment>
    );
  });

  return (
    <div>
      {filteredPathnames.length > 0 && (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">{breadcrumbItems}</ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
