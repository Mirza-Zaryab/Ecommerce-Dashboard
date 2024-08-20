import "./OrderDetails.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Topbar from "../../Components/Layout/Topbar";
import { ReactSVG } from "react-svg";
import Breadcrumb from "../../Components/Utilities/BreadCrumb";
import PrimaryButton from "../../Components/UI/PrimaryButton";

const OrderDetails = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("Pending");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <div className="order-details-page">
      <Topbar inputPlaceholder="n order" showInput={true} />
      <div className="order-details-main">
        <div className="main-top">
          <ReactSVG
            src="/tools-icons/back-arrow.svg"
            className="back-button"
            onClick={backHandler}
          />
          <div className="page-name-wrapper">
            <h1>Order details</h1>
            <Breadcrumb />
          </div>
        </div>
        <div className="main-bottom">
          <div className="detail-items-line">
            <div className="order-detail-item">
              <h4 className="item-label">Product</h4>
              <div className="item-description">
                <img src="/store.jpg" />
                Tenet TV series
              </div>
            </div>
            <div className="order-detail-item">
              <h4 className="item-label">Customer</h4>
              <div className="item-description">
                <img src="/store.jpg" />
                Customer ABC
              </div>
            </div>
          </div>
          <div className="detail-items-line">
            <div className="order-detail-item">
              <h4 className="item-label">Quantity</h4>
              <div className="item-description center-description">20 </div>
            </div>
            <div className="order-detail-item">
              <h4 className="item-label">Type</h4>
              <div className="item-description center-description">
                Chama group buy
              </div>
            </div>
          </div>
          <div className="detail-items-line">
            <div className="order-detail-item item-100">
              <h4 className="item-label">Seller assigned</h4>
              <div className="item-description center-description">
                ABC Retailer
              </div>
            </div>
            <Link className="select-a-seller" to={"./select-a-seller"}>
              Select <ReactSVG src="/tools-icons/back-arrow.svg" />
            </Link>
          </div>
          <div className="order-detail-item item-100">
            <h4 className="item-label">Delivery address</h4>
            <div className="item-description center-description">
              36-M, ABC street, Mainer block, Hap city, 876 YU.
            </div>
          </div>
          <div className="order-detail-item item-100">
            <h4 className="item-label">Delivery address</h4>
            <div className="radio-div ">
              <label>
                <input
                  type="radio"
                  value="Pending"
                  checked={selectedOption === "Pending"}
                  onChange={handleOptionChange}
                />
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  value="Approved"
                  checked={selectedOption === "Approved"}
                  onChange={handleOptionChange}
                />
                Approved
              </label>
              <label>
                <input
                  type="radio"
                  value="Declined"
                  checked={selectedOption === "Declined"}
                  onChange={handleOptionChange}
                />
                Declined
              </label>
              <label>
                <input
                  type="radio"
                  value="Delivered"
                  checked={selectedOption === "Delivered"}
                  onChange={handleOptionChange}
                />
                Delivered
              </label>
            </div>
          </div>
          <div className="page-buttons">
            <button className="button-cancel">Cancel</button>
            <PrimaryButton className="button-update">
              Update status
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
