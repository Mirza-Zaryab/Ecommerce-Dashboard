import { Table } from "antd";
import { useState, useEffect } from "react";

const CustomersTable = ({ customersData, onDelete, onSeeCustomer }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(customersData);
  }, [customersData]);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const toggle = (record) => {
    onSeeCustomer(record);
  };

  const columns = [
    {
      title: "Customer name",
      dataIndex: "first_name",
      key: "customerName",
      render: (text, record) => (
        <strong style={{ cursor: "pointer" }} onClick={() => toggle(record)}>
          {text}
        </strong>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      key: "phoneNumber",
    },
    {
      title: "Email address",
      dataIndex: "email",
      key: "emailAddress",
    },
    {
      title: "Last order",
      dataIndex: "lastOrderDate",
      key: "lastOrder",
      align: "center",
    },
    {
      title: "Date joined",
      dataIndex: "createdAt",
      key: "dateJoined",
      align: "center",
    },
    {
      title: "Total orders",
      dataIndex: "orderCount",
      key: "totalOrders",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="table-actions">
          <img
            className="action"
            src="/tools-icons/delete.svg"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        scroll={{ scrollToFirstRowOnChange: true, x: window.innerWidth <= 768 }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default CustomersTable;
