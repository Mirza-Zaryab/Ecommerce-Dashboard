import "./Products.scss";

import React, { useState, useEffect } from "react";
import { Modal } from "antd";

import { Link } from "react-router-dom";

import Topbar from "../../Components/Layout/Topbar";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import ProductsTable from "../../Components/Tables/ProductsTable";
import PrimaryButton from "../../Components/UI/PrimaryButton";

import { getRequest } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";
import { ToastContainer,toast } from "react-toastify";

const initialState = {
  productName: "",
  packages: "",
  itemsPerPackage: "",
  groupPrice: "",
  singlePrice: "",
  requiredForGroup: "",
};

const Products = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
[]
const getProductList = async () => {
    const onSuccess = (res) => {
      console.log('res____________',res)
      setData(res.list.productsList);
    //   toast.success(res.message, {
    //     position: toast.POSITION.TOP_RIGHT
      
    //   // setAnyState(res.)
    // })
   }
    const onError = (err) => {
      // console.log('err___', err)
      toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
    });        // handle error
    }

    await getRequest('', routes.productListing, true, onSuccess, onError)

    console.log("e");
}
  useEffect(()=>{
    getProductList()

  },[])

//  console.log("afeeeeee",data)

  // useEffect(() => {
  //   const array = [];
  //   for (let i = 1; i < 100; i++) {
  //     array.push({
  //       key: i,
  //       productName: `Product ${i * Math.random().toFixed() * 9}`,
  //       packages: `336${i * Math.random().toFixed() * 9}`,
  //       itemsPerPackage: 20,
  //       groupPrice: "190.00",
  //       singlePrice: "300.00",
  //       requiredForGroup: "10",
  //       description: "This is a great product. We are greatful to use it.",
  //     });
  //   }
  //   setData(array);
  // }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item._id !== id);
    setData(newData);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData(record);
    setFormErrors({});
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName]) {
        errors[fieldName] = "This field is required";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // submit form data
      // console.log(formData);
      setVisible(false);
      setFormErrors({});
      setFormData(initialState);
    }
  };

  return (
    <div className="products-page">
      <ToastContainer />
      <Topbar inputPlaceholder="product" showInput={true} />
      <div className="products-page-main">
        <div className="products-page-main-top">
          <div className="name-div">
            <h1>Products</h1>
            <Link to={"./add-new-product"}>
              <PrimaryButton>Add new product</PrimaryButton>
            </Link>
          </div>
          <div className="top-buttons">
            <SecondaryButton>Removed</SecondaryButton>
          </div>
        </div>
        <div className="products-page-main-bottom">
          <ProductsTable
            productsData={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
      <Modal
        centered
        title={<h2>Edit product</h2>}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="products-edit-form">
          <div className="form-field">
            <label htmlFor="productName">Product name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
            />
            {formErrors.productName && (
              <div className="error-message">{formErrors.productName}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="packages">Packages</label>
            <input
              type="number"
              min={0}
              name="packages"
              value={formData.packages}
              onChange={handleInputChange}
            />
            {formErrors.packages && (
              <div className="error-message">{formErrors.packages}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="itemsPerPackage">Items per package</label>
            <input
              type="number"
              min={0}
              name="itemsPerPackage"
              value={formData.itemsPerPackage}
              onChange={handleInputChange}
            />
            {formErrors.itemsPerPackage && (
              <div className="error-message">{formErrors.itemsPerPackage}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="groupPrice">Group price</label>
            <input
              type="number"
              name="groupPrice"
              min={0.0}
              step="0.10"
              value={formData.groupPrice}
              onChange={handleInputChange}
            />
            {formErrors.groupPrice && (
              <div className="error-message">{formErrors.groupPrice}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="singlePrice">Single price</label>
            <input
              type="number"
              min={0.0}
              step="0.10"
              name="singlePrice"
              value={formData.singlePrice}
              onChange={handleInputChange}
            />
            {formErrors.singlePrice && (
              <div className="error-message">{formErrors.singlePrice}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="requiredForGroup">Required for group</label>
            <input
              type="number"
              min={0}
              step="1"
              name="requiredForGroup"
              value={formData.requiredForGroup}
              onChange={handleInputChange}
            />
            {formErrors.requiredForGroup && (
              <div className="error-message">{formErrors.requiredForGroup}</div>
            )}
          </div>
          <PrimaryButton
            className="products-form-button"
            key="submit"
            onClick={handleSubmit}
          >
            Submit
          </PrimaryButton>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
