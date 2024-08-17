import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", earnings: 5000 },
  { month: "Feb", earnings: 2500 },
  { month: "Mar", earnings: 4000 },
  { month: "Apr", earnings: 1500 },
  { month: "May", earnings: 3000 },
  { month: "Jun", earnings: 1500 },
  { month: "Jul", earnings: 6000 },
  { month: "Aug", earnings: 0 },
  { month: "Sep", earnings: 0 },
  { month: "Oct", earnings: 0 },
  { month: "Nov", earnings: 0 },
  { month: "Dec", earnings: 0 },
];

function Chart() {
  function formatEarnings(value) {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value}`;
  }

  const axisStyle = {
    fill: "#99A69D",
    fontSize: "14px",
  };
  const yAxisStyle = {
    fill: "#99A69D",
    fontSize: "12px",
  };

  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} strokeDasharray={"0 0"} />
        <XAxis
          dataKey="month"
          axisLine={{ stroke: "transparent" }}
          tickMargin={10}
          tick={{ ...axisStyle }}
        />
        <YAxis
          tickFormatter={formatEarnings}
          axisLine={{ stroke: "transparent" }}
          tickMargin={10}
          tick={{ ...yAxisStyle }}
        />
        <Tooltip formatter={formatEarnings} />
        <Bar dataKey="earnings" fill="#494761" barSize={30} radius={15} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
