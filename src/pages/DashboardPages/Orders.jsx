import "./Orders.scss";

import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Layout/Topbar";
import SecondaryButton from "../../Components/UI/SecondaryButton";
import OrdersTable from "../../Components/Tables/OrdersTable";
import { getRequest } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";
import { ToastContainer, toast } from "react-toastify";

const Orders = () => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("");

  const getOrderList = async () => {
    const onSuccess = (res) => {
      // console.log('res____________',res)
      setData(res.list.order);
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

    await getRequest('', routes.orderListing, true, onSuccess, onError)

    // console.log("e");
}
  useEffect(()=>{
    getOrderList()
  },[])


// console.log(data)


  const handleDelete = (id) => {
    const newData = data.filter((item) => item._id !== id);
    setData(newData);
  };

  const selectButtonHandler = (buttonName) => {
    if (activeButton === buttonName) {
      setActiveButton("");
      return;
    }
    setActiveButton(buttonName);
  };

  return (
    <div className="orders-page">
      <ToastContainer />
      <Topbar inputPlaceholder="n order" showInput={true} />
      <div className="orders-page-main">
        <div className="orders-page-main-top">
          <h1>Orders</h1>
          <div className="top-buttons">
            <SecondaryButton
              className={activeButton === "Delivered" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Delivered")}
            >
              Delivered
            </SecondaryButton>
            <SecondaryButton
              className={activeButton === "Declined" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Declined")}
            >
              Declined
            </SecondaryButton>
            <hr />
            <SecondaryButton
              className={activeButton === "Chama" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Chama")}
            >
              Chama group buy
            </SecondaryButton>
            <SecondaryButton
              className={activeButton === "Group" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Group")}
            >
              Group buy
            </SecondaryButton>
            <SecondaryButton
              className={activeButton === "Single" ? "button-active" : ""}
              onClick={() => selectButtonHandler("Single")}
            >
              Single buy
            </SecondaryButton>
          </div>
        </div>
        <div className="orders-page-main-bottom">
          <OrdersTable ordersData={data} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
