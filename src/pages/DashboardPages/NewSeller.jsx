import "./NewSeller.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../Components/Layout/Topbar";
import { ReactSVG } from "react-svg";
import Breadcrumb from "../../Components/Utilities/BreadCrumb";
import PrimaryButton from "../../Components/UI/PrimaryButton";

const NewSeller = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    sellerName: "",
    phoneNumber: "",
    emailAddress: "",
    physicalAddress: "",
  });
  const [errors, setErrors] = useState({});

  const backHandler = () => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit form initialize");
    const newErrors = validateForm(formState);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // handle form submission
    console.log("submitted: ", formState);
    // reset form state
    setFormState({
      sellerName: "",
      phoneNumber: 0,
      emailAddress: 0,
      physicalAddress: 0,
    });
    setErrors({});
    navigate(-1);
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.sellerName.trim()) {
      errors.sellerName = "Product name is required";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = "Email address is required";
    }
    if (!formData.physicalAddress.trim()) {
      errors.physicalAddress = "Physical address is required";
    }

    return errors;
  };

  return (
    <div className="new-seller-page">
      <Topbar showInput={true} inputPlaceholder={" seller"} />
      <div className="new-seller-main">
        <div className="main-top">
          <ReactSVG
            src="/tools-icons/back-arrow.svg"
            className="back-button"
            onClick={backHandler}
          />
          <div className="page-name-wrapper">
            <h1>Add new seller</h1>
            <Breadcrumb />
          </div>
        </div>
        <div className="new-seller-form">
          <form onSubmit={handleSubmit}>
            <input
              className="seller-name"
              type="text"
              name="sellerName"
              placeholder="Seller name"
              value={formState.sellerName}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {errors.sellerName && (
              <p className="form-error">{errors.sellerName}</p>
            )}
            <input
              value={formState.phoneNumber}
              name="phoneNumber"
              type="number"
              placeholder="Phone number"
              min={0}
              step={0.1}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {errors.phoneNumber && (
              <p className="form-error">{errors.phoneNumber}</p>
            )}
            <input
              value={formState.emailAddress}
              name="emailAddress"
              type="email"
              placeholder="Email address"
              min={0}
              step={0.1}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {errors.emailAddress && (
              <p className="form-error">{errors.emailAddress}</p>
            )}
            <input
              value={formState.physicalAddress}
              name="physicalAddress"
              type="text"
              placeholder="Physical address"
              min={0}
              step={1}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {errors.physicalAddress && (
              <p className="form-error">{errors.physicalAddress}</p>
            )}

            <div className="submit-form-buttons">
              <h3 onClick={backHandler}>Cancel</h3>
              <PrimaryButton className="submit-form-button" type="submit">
                Add & save
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSeller;
