import React from "react";
import "./SecondaryButton.scss";

const SecondaryButton = ({ onClick, className, children, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`secondary-button ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
