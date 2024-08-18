import React, { useEffect, useState } from "react";

import "./Main.scss";

import Topbar from "../../Components/Layout/Topbar";
import RecentGroups from "../../Components/MainPage/RecentGroups";
import Stats from "../../Components/MainPage/Stats";
import Retailers from "../../Components/MainPage/Retailers";
import Revenue from "../../Components/MainPage/Revenue";
import { getRequest } from "../../ApiFunctions/Api";
import { routes } from "../../ApiFunctions/Api/routes";
import { ToastContainer,toast } from "react-toastify";

const Main = () => {

  const [count, setCount] = useState({});
  const [recentGroups, setRecentGroups] = useState({});
  const [activeInactiveUsers, setActiveInactiveUsers] = useState({});


const getDashboardData = async () => {
    const onSuccess = (res) => {
      // console.log('res____________',res)
      setCount(res.data.count);
      setRecentGroups(res.data.recentGroups);
      setActiveInactiveUsers(res.data.activeInactiveUsers);
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

    await getRequest('', routes.adminDashboard, true, onSuccess, onError)

    // console.log("e");
}
  useEffect(()=>{
    getDashboardData()

  },[])



  return (
    <div className="main-page">
      <ToastContainer />
      <div className="main-mobile-topbar">
        <Topbar showInput={false} />
      </div>
      <div className="main-left">
        <Stats count={count}  />
        <RecentGroups recentGroups={recentGroups} />
        <Retailers />
      </div>
      <div className="main-right">
        <div className="main-desktop-topbar">
          <Topbar showInput={false} />
        </div>
        <Revenue />
      </div>
    </div>
  );
};

export default Main;
