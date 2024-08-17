import "./Revenue.scss";

import React, { useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import Chart from "./Chart";
import Transanctions from "./Transanctions";
import SystemActivity from "./SystemActivity";

const Revenue = () => {
  const [selectedTimeFrameButton, setSelectedTimeFrameButton] = useState(2);
  const [selectedMainButton, setSelectedMainButton] = useState("balance");

  const timeFrameButtons = [
    { id: 0, label: "Weekly" },
    { id: 1, label: "Daily" },
    { id: 2, label: "Monthly" },
  ];

  const handleTimeFrameButtonClick = (id) => {
    setSelectedTimeFrameButton(id);
  };

  const mainButtons = [
    { id: "revenue", label: "Revenue", amount: "9,432" },
    { id: "withdrawn", label: "Withdrawn", amount: "9,432" },
    { id: "payout", label: "Payout", amount: "9,432" },
    { id: "balance", label: "Balance", amount: "9,432" },
  ];

  const handleMainButtonClick = (id) => {
    setSelectedMainButton(id);
  };

  return (
    <div className="revenue-wrapper">
      <div className="revenue-top">
        <h3>Revenue</h3>
        <div className="revenue-top-buttons">
          {timeFrameButtons.map((button) => (
            <SecondaryButton
              key={button.id}
              onClick={() => handleTimeFrameButtonClick(button.id)}
              className={
                selectedTimeFrameButton === button.id ? "button-active" : ""
              }
            >
              {button.label}
            </SecondaryButton>
          ))}
        </div>
      </div>
      <div className="revenue-main">
        <div className="revenue-main-buttons">
          {mainButtons.map((button) => (
            <div className="revenue-button-wrapper" key={button.id}>
              <h4>{button.label}</h4>
              <SecondaryButton
                className={`revenue-button ${
                  selectedMainButton === button.id
                    ? "active-revenue-button"
                    : ""
                }`}
                onClick={() => handleMainButtonClick(button.id)}
              >
                ${button.amount}
                <span className="revenue-zeros">.00</span>
              </SecondaryButton>
            </div>
          ))}
          <div className="withdraw-button-wrapper">
            <SecondaryButton className="withdraw-button">
              Withdraw
            </SecondaryButton>
          </div>
        </div>
        <div className="revenue-main-chart-wrapper">
          <Chart />
        </div>
      </div>
      <div className="revenue-bottom">
        <div className="revenue-bottom-left">
          <Transanctions />
        </div>
        <div className="revenue-bottom-right">
          <SystemActivity />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
