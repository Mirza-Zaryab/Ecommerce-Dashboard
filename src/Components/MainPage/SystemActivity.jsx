import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./SystemActivity.scss";

const data = [
  { date: "2023-05-01", activeUsers: 3232, inactiveUsers: 33973 },
  { date: "2023-05-02", activeUsers: 11234, inactiveUsers: 32761 },
  { date: "2023-05-03", activeUsers: 11234, inactiveUsers: 31567 },
  { date: "2023-05-04", activeUsers: 6234, inactiveUsers: 30345 },
  { date: "2023-05-05", activeUsers: 13234, inactiveUsers: 29123 },
  { date: "2023-05-06", activeUsers: 4234, inactiveUsers: 27901 },
  { date: "2023-05-07", activeUsers: 10234, inactiveUsers: 26679 },
];

const SystemActivity = () => {
  return (
    <>
      <div className="system-activity-top">
        <h3>
          System Activity <span>(users)</span>
        </h3>
        <Link to={"/transanctions"}>
          <h4>See all</h4>
        </Link>
      </div>
      <div className="system-activity-chart">
        <div className="activity-top-indicators">
          <h6>
            Active: <span className="user-number">9,323</span>
          </h6>
          <h6>
            Inactive: <span className="user-number">9,323</span>
          </h6>
        </div>
        <ResponsiveContainer width={"100%"} height={107}>
          <LineChart data={data}>
            {/* <XAxis dataKey="date" />
      <YAxis /> */}
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" store />
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SystemActivity;
