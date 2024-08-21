import { Table } from "antd";
import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

const TransanctionsTable = ({ transanctionsData, onDelete }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(transanctionsData);
  }, [transanctionsData]);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const columns = [
    {
      title: "Initiated by",
      dataIndex: "initiatedBy",
      key: "initiatedBy",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Initiated to",
      dataIndex: "initiatedTo",
      key: "initiatedTo",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Initiated on",
      dataIndex: "initiatedOn",
      key: "initiatedOn",
    },
    {
      title: "Completed on",
      dataIndex: "completedOn",
      key: "completedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <p className={text === "Failed" ? "failed-red" : ""}>{text}</p>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <>${text}</>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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

export default TransanctionsTable;
