import "./Customers.scss";

import React, { useState, useEffect } from "react";
import { Modal } from "antd";

import Topbar from "../../Components/Layout/Topbar";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import CustomersTable from "../../Components/Tables/CustomersTable";
import { routes } from "../../ApiFunctions/Api/routes";
import { ToastContainer,toast } from "react-toastify";
import { getRequest } from "../../ApiFunctions/Api";

const Customers = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const getCustomerList = async () => {
    const onSuccess = (res) => {
      // console.log('res____________',res)
      setData(res.customer);
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

    await getRequest('', routes.customerListing, true, onSuccess, onError)

    console.log("e");
}
  useEffect(()=>{
    getCustomerList()

  },[])

 console.log("afeeeeee",data)



  // useEffect(() => {
  //   const array = [];
  //   for (let i = 0; i < 100; i++) {
  //     array.push({
  //       key: i,
  //       customerName: `Customer ${i * Math.random().toFixed() * 9}`,
  //       phoneNumber: `+66 94739847`,
  //       emailAddress: "admin@example.com",
  //       lastOrder: "18/05/2023",
  //       dateJoined: "08/05/2023",
  //       totalOrders: 20,
  //     });
  //   }
  //   setData(array);
  // }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item._id !== id);
    setData(newData);
  };

  const toggle = (record = null) => {
    setSelectedRecord(record);
    setVisible(!visible);
  };

  return (
    <div className="customers-page">
      <ToastContainer />
      <Topbar inputPlaceholder=" customer" showInput={true} />
      <div className="customers-page-main">
        <div className="customers-page-main-top">
          <h1>Customers</h1>
          <div className="top-buttons">
            <SecondaryButton>Removed</SecondaryButton>
            <hr />
            <SecondaryButton>Top Customers</SecondaryButton>
            <hr />
            <SecondaryButton>Active groups</SecondaryButton>
          </div>
        </div>
        <div className="customers-page-main-bottom">
          <CustomersTable
            customersData={data}
            onDelete={handleDelete}
            onSeeCustomer={toggle}
          />
        </div>
      </div>
      <Modal
        open={visible}
        onCancel={toggle}
        width={window.screen.width > 767 && 846}
        centered
        footer={[
          <h2 className="modal-back-button" onClick={toggle}>
            Back
          </h2>,
        ]}
      >
        {selectedRecord && (
          <div className="customer-modal-body-wrapper">
            <h1>Customer details</h1>
            <img src={selectedRecord.profile_image} alt="user image" />
            <h2>{selectedRecord.first_name}</h2>
            <div className="contact-details">
              <div>
                <h5 className="contact-name">Phone number:</h5>
                <h5 className="contact-name">Email address:</h5>
              </div>
              <div>
                <h5>{selectedRecord.phone_number}</h5>
                <h5>{selectedRecord.email}</h5>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Customers;
