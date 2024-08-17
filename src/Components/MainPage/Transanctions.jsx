import React from "react";

import "./Transanctions.scss";
import { Link } from "react-router-dom";

const DUMMY_TRANSANCTIONS = [
  {
    transanctionId: 1,
    transanctionName: "Super Store",
    date: "18/03/2023",
    time: "07:00 PM",
    type: "Withdraw",
    amount: "455.30",
  },
  {
    transanctionId: 2,
    transanctionName: "Super Store",
    date: "18/03/2023",
    time: "07:00 PM",
    type: "Payout",
    amount: "455.30",
  },
  {
    transanctionId: 3,
    transanctionName: "Super Store",
    date: "18/03/2023",
    time: "07:00 PM",
    type: "Payment",
    amount: "455.30",
  },
];

const Transanctions = () => {
  return (
    <>
      <div className="bottom-left-top">
        <h3>Transanctions</h3>
        <Link to={"/transanctions"}>
          <h4>See all</h4>
        </Link>
      </div>
      <div className="bottom-left-bottom">
        {DUMMY_TRANSANCTIONS.map((transanction) => {
          return (
            <div
              key={transanction.transanctionId}
              className="single-transanction"
            >
              <div className="single-transanction-left">
                <img src="./store.jpg" />
                <div className="transanction-detail">
                  <h5>{transanction.transanctionName}</h5>
                  <div className="detail-date">
                    <p>{transanction.date}</p>
                    <hr />
                    <p>{transanction.time}</p>
                  </div>
                </div>
              </div>
              <div className="single-transanction-right">
                <div className="right-detail">
                  <p>{transanction.type}</p>
                  <h6
                    className={transanction.type === "Payment" ? "blue" : "red"}
                  >
                    {transanction.type === "Payment" ? "+" : "-"} $
                    {transanction.amount}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Transanctions;
