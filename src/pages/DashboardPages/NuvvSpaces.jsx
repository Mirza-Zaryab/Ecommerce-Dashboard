import "./NuvvSpaces.scss";

import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Layout/Topbar";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import NuvvSpacesTable from "../../Components/Tables/NuvvSpacesTable";

const NuvvSpaces = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push({
        key: i,
        spaceName: `Space ${i * Math.random().toFixed() * 9}`,
        createdBy: `John ${i * Math.random().toFixed() * 9}`,
        messages: "5,343",
        lastActive: "19/05/2023",
        dateCreated: "15/05/2023",
        description:
          "Lorem ipsum dolor sit amet consectetur. Interdum a Lorem ipsum dolor sit amet consectetur. Interdum a",
      });
    }
    setData(array);
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.key !== id);
    setData(newData);
  };

  return (
    <div className="spaces-page">
      <Topbar inputPlaceholder=" Nuvv space" showInput={true} />
      <div className="spaces-page-main">
        <div className="spaces-page-main-top">
          <h1>Nuvv Spaces</h1>
          <div className="top-buttons">
            <SecondaryButton>Removed</SecondaryButton>
          </div>
        </div>
        <div className="spaces-page-main-bottom">
          <NuvvSpacesTable spacesData={data} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default NuvvSpaces;
