import { Table } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const OrdersTable = ({ ordersData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(ordersData);
  }, [ordersData]);

  const columns = [
    {
      title: "Product name",
      dataIndex: "product",
      key: "product",
      render: (text) => {
        // {console.log(text)}
      return<strong>{text[0]?.name}</strong>},
    },
    {
      title: "Ordered by",
      dataIndex: "placedBy",
      key: "placedBy",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Quantity",
      dataIndex: "product",
      key: "product",
      render: (text) =>{ return<strong>{text[0]?.quantity}</strong>},
      align: "center",
    },
    {
      title: "Order type",
      dataIndex: "orderType",
      key: "orderType",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      // render: (text) => (
      //   <span className={text === "Pending" ? "text-red" : ""}>{text}</span>
      // ),
    },
    {
      title: "Seller assigned",
      dataIndex: "ppp",
      key: "ppp",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="table-actions">
          <Link to={`./${record._id}/order-details`}>
            <ReactSVG
              className=" action forward-arrow"
              src="/tools-icons/back-arrow.svg"
            />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Table
      scroll={{ scrollToFirstRowOnChange: true, x: window.innerWidth <= 768 }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default OrdersTable;
