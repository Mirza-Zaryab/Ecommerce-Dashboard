import "./Sellers.scss";

import { useState, useEffect } from "react";
import Topbar from "../../Components/Layout/Topbar";
import PrimaryButton from "../../Components/UI/PrimaryButton";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import SellersTable from "../../Components/Tables/SellersTable";
import { Link } from "react-router-dom";

const Sellers = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push({
        key: i,
        name: `Seller ABC ${i}`,
        delivered: `${i + 20} p`,
        phoneNumber: "+66 393343498",
        lastDelivered: "16/02/2023",
        dateAdded: "09/01/2021",
        reviews: `2.5/5 (3,454)`,
        emailAddress: "admin@example.com",
      });
    }
    setData(array);
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.key !== id);
    setData(newData);
  };

  const selectButtonHandler = (buttonName) => {
    if (activeButton === buttonName) {
      setActiveButton("");
      return;
    }
    setActiveButton(buttonName);
  };

  return (
    <div className="sellers-page">
      <Topbar inputPlaceholder=" business" showInput={true} />
      <div className="sellers-page-main">
        <div className="sellers-page-main-top">
          <div className="top-page-name">
            <h1>Sellers</h1>
            <Link to={"./add-new-seller"}>
              <PrimaryButton>Add new seller</PrimaryButton>
            </Link>
          </div>
          <div className="top-buttons">
            <SecondaryButton
              className={activeButton === "Removed" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Removed")}
            >
              Removed
            </SecondaryButton>
            <hr />
            <SecondaryButton
              className={activeButton === "Top" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Top")}
            >
              Top Sellers
            </SecondaryButton>
          </div>
        </div>
        <div className="sellers-page-main-bottom">
          <SellersTable sellersdata={data} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Sellers;
