import "./RecentGroups.scss";
import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const RecentGroups = ({ recentGroups }) => {
  console.log(recentGroups.latestRegularGroup);
  const regulargroups = recentGroups.latestRegularGroup;
  const chamagroups = recentGroups.latestChamaGroup;

  // console.log(regulargroups);
  // console.log(chamagroups);

  return (
    <div className="recent-group-container">
      <h3>Regular Group</h3>
      <div className="groups">
        {regulargroups &&
          regulargroups.map((regulargroup) => {
            return (
              <div key={regulargroup._id} className="single-group">
                <div className="group-pictures">
                  <img src="./man.jpg" />
                  {/* <img src="./man.jpg" />
                  <img src="./man.jpg" /> */}
                  {/* <h6>+{2 - regulargroup.members.length }</h6> */}
                </div>
                {/* <hr /> */}
                <div className="group-stats">
                  <div className="stat">
                    <h5>Required</h5>
                    <h4>{regulargroup.required_members}</h4>
                  </div>
                  <div className="stat">
                    <h5>Joined</h5>
                    <h4>{regulargroup.members.length}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        <Link to={"/recent-groups"}>
          <h4 className="see-all">
            See all groups
            <ReactSVG src="./tools-icons/arrow-link.svg" />
          </h4>
        </Link>
      </div>
          <hr />
      <h3>Chama Group</h3>
      <div className="groups">
        {chamagroups &&
          chamagroups.map((chamagroup) => {
            return (
              <div key={chamagroup._id} className="single-group">
                <div className="group-pictures">
                  <img src="./man.jpg" />
                  {/* <img src="./man.jpg" />
                  <img src="./man.jpg" />
                  <h6>+{chamagroup.members.length - 3}</h6> */}
                </div>
                {/* <hr /> */}
                <div className="group-stats">
                  <div className="stat">
                    <h5>Required</h5>
                    <h4>{chamagroup.required_members}</h4>
                  </div>
                  <div className="stat">
                    <h5>Joined</h5>
                    <h4>{chamagroup.members.length}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        <Link to={"/recent-groups"}>
          <h4 className="see-all">
            See all groups
            <ReactSVG src="./tools-icons/arrow-link.svg" />
          </h4>
        </Link>
      </div>
    </div>
  );
};


export default RecentGroups;
