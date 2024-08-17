import React from "react";
import "./PrimaryButton.scss";

const PrimaryButton = ({ onClick, className, children, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`primary-button ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
