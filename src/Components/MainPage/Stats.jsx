import React from "react";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

import "./Stats.scss";

const Stats = ({count}) => {
  // console.log(count)
  return (
    <div className="stats">
      <div>
        <h5>
          <Link to={"/"}>
            Total users <ReactSVG src="./tools-icons/arrow-link.svg" />
          </Link>
        </h5>
        <h2>{count?.totalUsers}</h2>
      </div>
      <hr />
      <div className="totals">
        <div>
          <h5>
            <Link to={"/"}>
              Total retailers
              <ReactSVG src="./tools-icons/arrow-link.svg" />
            </Link>
          </h5>
          <h2>0</h2>
        </div>
        <div>
          <h5>
            <Link to={"/"}>
              Total customers <ReactSVG src="./tools-icons/arrow-link.svg" />
            </Link>
          </h5>
          <h2>{count?.totalCustomers}</h2>
        </div>
      </div>
    </div>
  );
};

export default Stats;
