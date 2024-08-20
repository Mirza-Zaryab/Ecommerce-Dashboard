import { Table } from "antd";
import { useState, useEffect } from "react";
import Rating from "react-rating";
import { ReactSVG } from "react-svg";

const SellersTable = ({ sellersdata, onDelete }) => {
  const [data, setData] = useState([]);

  const parseRating = (ratingText) => {
    const ratingFraction = ratingText.split(" ")[0];
    const rating = parseFloat(ratingFraction.split("/")[0].replace(",", ""));
    const finalRating = rating / 5;
    return finalRating;
  };

  useEffect(() => {
    setData(sellersdata);
  }, [sellersdata]);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Delivered",
      dataIndex: "delivered",
      key: "delivered",
      align: "center",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Last delivered",
      dataIndex: "lastDelivered",
      key: "lastDelivered",
      align: "center",
    },
    {
      title: "Date added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      align: "center",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
      render: (text) => (
        <span>
          <Rating
            initialRating={parseRating(text)}
            readonly
            start={0}
            stop={1}
            emptySymbol={<ReactSVG src="/tools-icons/star-empty.svg" />}
            fullSymbol={<ReactSVG src="/tools-icons/star-filled.svg" />}
          />
          <span>
            <strong style={{ marginLeft: "5px" }}>
              {text.split(" ")[0]}
              <span className="total-review-numbers">{text.split(" ")[1]}</span>
            </strong>
          </span>
        </span>
      ),
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

export default SellersTable;
