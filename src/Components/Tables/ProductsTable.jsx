import { Table, Modal } from "antd";
import { useState, useEffect } from "react";

const ProductsTable = ({ productsData, onDelete, onEdit }) => {
  const [data, setData] = useState([]);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    setData(productsData);
  }, [productsData]);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (record) => {
    onEdit(record);
  };

  const toggleProductModal = (record) => {
    // console.log(record)
    if (record?.name)setSelectedRecord(record);
    setProductModalVisible(!productModalVisible);
  };

  const columns = [
    {
      title: "Product name",
      dataIndex: "name",
      key: "productName",
      render: (text, record) => (
        <strong
          className="product-name"
          onClick={() => toggleProductModal(record)}
        >
          {text}
        </strong>
      ),
    },
    {
      title: "Packages",
      dataIndex: "package_in_stock",
      key: "packages",
      align: "center",
    },
    {
      title: "Items per package",
      dataIndex: "item_per_package",
      key: "itemsPerPackage",
      align: "center",
    },
    {
      title: "Group type",
      dataIndex: "group_type",
      key: "groupType",
    },
    {
      title: "Group price",
      dataIndex: "group_type",
      key: "group_type",
      render: (text, record) => {
        return<>
          <span className="price-text">${text==="chama" ? `${record?.chama?.price_for_chama}` : `${record?.regular?.price_for_regular}`}</span>/p
        </>
      },
    },
    {
      title: "Single price",
      dataIndex: "price",
      key: "singlePrice",
      render: (text) => (
        <>
          <span className="price-text">${text}</span>/p
        </>
      ),
    },
    {
      title: "Required for group",
      dataIndex: "group_type",
      key: "group_type",
      render: (text, record) => {
        // console.log(record)
        return<>
          <span className="price-text">{text==="chama" ? `${record?.chama?.no_of_person}` : `${record?.regular?.no_of_person}`}</span>/p
        </>
      },
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
          <img
            style={{ marginLeft: "15px" }}
            className="action"
            src="/tools-icons/pencil.svg"
            onClick={() => handleEdit(record)}
          />
        </div>
      ),
    },
  ];

  // console.log(selectedRecord)

  return (
    <>
      <Table
        scroll={{ scrollToFirstRowOnChange: true, x: window.innerWidth <= 768 }}
        columns={columns}
        dataSource={productsData}
      />
      <Modal
        width={800}
        open={productModalVisible}
        onCancel={toggleProductModal}
        centered
        footer={[
          <div className="products-modal-footer" key={"1"}>
            <h3 className="modal-back-button" onClick={toggleProductModal}>
              Back
            </h3>
          </div>,
        ]}
      >
        {selectedRecord && (
          <div className="products-modal-body-wrapper">
            <h1>Product details</h1>
            <img src={selectedRecord?.images[0]} alt="user image" />
            <h2>{selectedRecord?.name}</h2>
            <div className="product-details">
              <div className="details-wrapper">
                <div className="product-wrapper">
                  <h5 className="product-name">Name</h5>
                  <h5 className="product-data">{selectedRecord?.name}</h5>
                </div>
                <div className="product-wrapper">
                  <h5 className="product-name">Packages</h5>
                  <h5 className="product-data">
                    {selectedRecord?.package_in_stock}
                  </h5>
                </div>
                <div className="product-wrapper">
                  <h5 className="product-name">Items/package</h5>
                  <h5 className="product-data">
                    {selectedRecord?.item_per_package}
                  </h5>
                </div>
                <div className="product-wrapper">
                  <h5 className="product-name">Price for group</h5>
                  <h5 className="product-data">
                    {selectedRecord?.group_type === "chama"
                      ? `$${selectedRecord?.chama.price_for_chama}`
                      : `$${selectedRecord?.regular.price_for_regular}`}
                  </h5>
                </div>

                <div className="product-wrapper">
                  <h5 className="product-name">Single buy price</h5>
                  <h5 className="product-data">${selectedRecord?.price}</h5>
                </div>
                <div className="product-wrapper">
                  <h5 className="product-name">People for group</h5>
                  <h5 className="product-data">
                  {selectedRecord?.group_type === "chama"
                      ? `${selectedRecord?.chama.no_of_person}`
                      : `${selectedRecord?.regular.no_of_person}`}
                  </h5>
                </div>
                <div className="product-wrapper">
                  <h5 className="product-name">Description</h5>
                  <h5 className="product-data">{selectedRecord?.desc}</h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductsTable;
