import { Table } from "antd";
import { useState, useEffect } from "react";
import Rating from "react-rating";
import { ReactSVG } from "react-svg";

const SelectSellerTable = ({
  sellersdata,
  selectedRowKey,
  setSelectedRowKey,
}) => {
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

  const handleCheckboxChange = (record) => {
    if (selectedRowKey === record.key) {
      setSelectedRowKey(null); // Deselect the checkbox
    } else {
      setSelectedRowKey(record.key); // Select the checkbox
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
      title: "Seller address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="table-actions">
          <label>
            <input
              type="checkbox"
              checked={record.key === selectedRowKey}
              disabled={
                selectedRowKey !== null && record.key !== selectedRowKey
              }
              onChange={() => handleCheckboxChange(record)}
            />
            Assign
          </label>
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

export default SelectSellerTable;
