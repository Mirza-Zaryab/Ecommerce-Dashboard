import { Table } from "antd";
import { useState, useEffect } from "react";

const NuvvSpacesTable = ({ spacesData, onDelete }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(spacesData);
  }, [spacesData]);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const columns = [
    {
      title: "Space name",
      dataIndex: "spaceName",
      key: "spaceName",
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Messages",
      dataIndex: "messages",
      key: "messages",
      align: "center",
    },
    {
      title: "Last active",
      dataIndex: "lastActive",
      key: "lastActive",
      align: "center",
    },
    {
      title: "Date created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "250px",
      ellipsis: true,
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
    <Table
      scroll={{ scrollToFirstRowOnChange: true, x: window.innerWidth <= 768 }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default NuvvSpacesTable;
