import "./SelectSeller.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

import Topbar from "../../Components/Layout/Topbar";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import SelectSellerTable from "../../Components/Tables/SelectSellerTable";
import Breadcrumb from "../../Components/Utilities/BreadCrumb";

const SelectSeller = () => {
  const [data, setData] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [activeButton, setActiveButton] = useState("");

  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  console.log(selectedRowKey);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push({
        key: i,
        name: `Retailer ${i}`,
        phoneNumber: "+66 393343498",
        reviews: `2.5/5 (3,454)`,
        address: "36-M, ABC street, Mainer block, Hap city, 876 YU.",
      });
    }
    setData(array);
  }, []);

  const selectButtonHandler = (buttonName) => {
    if (activeButton === buttonName) {
      setActiveButton("");
      return;
    }
    setActiveButton(buttonName);
  };

  return (
    <div className="select-seller-page">
      <Topbar inputPlaceholder=" seller" showInput={true} />
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
      <div className="detail-items">
        <div className="order-detail-item">
          <h4 className="item-label">Product</h4>
          <div className="item-description">
            <img src="/store.jpg" />
            Tenet TV series
          </div>
        </div>
        <div className="order-detail-item">
          <h4 className="item-label">Delivery address</h4>
          <div className="item-description center-description">
            36-M, ABC street, Mainer block, Hap city, 876 YU.
          </div>
        </div>
        <div className="order-detail-item">
          <h4 className="item-label">Quantity</h4>
          <div className="item-description center-description">20 </div>
        </div>
      </div>
      <div className="select-seller-page-main">
        <div className="select-seller-page-main-top">
          <h2>Seller</h2>
          <div className="top-buttons">
            <SecondaryButton
              className={activeButton === "Top" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Top")}
            >
              Top Sellers
            </SecondaryButton>
          </div>
        </div>
        <div className="select-seller-page-main-bottom">
          <SelectSellerTable
            sellersdata={data}
            selectedRowKey={selectedRowKey}
            setSelectedRowKey={setSelectedRowKey}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSeller;
