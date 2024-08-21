import "./Transanctions.scss";

import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Layout/Topbar";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import TransanctionsTable from "../../Components/Tables/TransanctionsTable";
import { Input } from "antd";

const Transanctions = () => {
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    initiatedBy: "",
    initiatedTo: "",
    initiatedOn: "",
    completedOn: "",
  });

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      const statuses = ["Failed", "Completed", "Pending"];
      const types = ["Balance Withdraw", "Payment", "PPP Comission"];

      array.push({
        key: i,
        initiatedBy: `User ${i * Math.random().toFixed() * 9}`,
        initiatedTo: `Nuvv ${i * Math.random().toFixed() * 9}`,
        initiatedOn: `16/4/2023 at 04:59 PM`,
        completedOn: `16/4/2023 at 05:00 PM`,
        status: `${statuses[i % 3]}`,
        amount: "3,334.00",
        type: `${types[i % 3]}`,
      });
    }
    setData(array);
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.key !== id);
    setData(newData);
  };

  const handleMore = () => {
    setIsMoreClicked(!isMoreClicked);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const filteredData = data.filter((item) => {
    return (
      item.initiatedBy.includes(filters.initiatedBy) &&
      item.initiatedTo.includes(filters.initiatedTo) &&
      item.initiatedOn.includes(filters.initiatedOn) &&
      item.completedOn.includes(filters.completedOn)
    );
  });

  return (
    <div className="transanctions-page">
      <Topbar inputPlaceholder=" transanction" showInput={true} />
      <div className="transanctions-page-main">
        <div className="transanctions-page-main-top">
          <h1>Transanctions</h1>
          <div className="top-buttons">
            {isMoreClicked && (
              <>
                <SecondaryButton>Payment</SecondaryButton>
                <SecondaryButton>Balance withdraw</SecondaryButton>
                <SecondaryButton>PPP commission</SecondaryButton>
                <hr />
              </>
            )}
            <SecondaryButton>Completed</SecondaryButton>
            <SecondaryButton>Pending</SecondaryButton>
            <SecondaryButton>Failed</SecondaryButton>
            <hr />
            <SecondaryButton
              className={isMoreClicked && "button-active"}
              onClick={handleMore}
            >
              {isMoreClicked ? "Less" : "More"}
            </SecondaryButton>
          </div>
        </div>
        {isMoreClicked && (
          <div className="transanctions-page-main-inputs">
            <div>
              <label htmlFor="initiatedBy">Initiated By:</label>
              <Input
                id="initiatedBy"
                name="initiatedBy"
                value={filters.initiatedBy}
                onChange={handleFilterChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="initiatedTo">Initiated To:</label>
              <Input
                id="initiatedTo"
                name="initiatedTo"
                value={filters.initiatedTo}
                onChange={handleFilterChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="initiatedOn">Initiated On:</label>
              <Input
                id="initiatedOn"
                name="initiatedOn"
                value={filters.initiatedOn}
                onChange={handleFilterChange}
                placeholder="Date / Time"
              />
            </div>
            <div>
              <label htmlFor="completedOn">Completed On:</label>
              <Input
                id="completedOn"
                name="completedOn"
                value={filters.completedOn}
                onChange={handleFilterChange}
                placeholder="Date / Time"
              />
            </div>
          </div>
        )}
        <div className="transanctions-page-main-bottom">
          <TransanctionsTable
            transanctionsData={filteredData}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Transanctions;
