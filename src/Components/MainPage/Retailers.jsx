import { Link } from "react-router-dom";
import "./Retailers.scss";

import React from "react";
import Rating from "react-rating";
import { ReactSVG } from "react-svg";

const Retailers = () => {
  const DUMMY_RETAILERS = [
    {
      id: 1,
      storeName: "Super store",
      date: "18/02/2023",
      time: "07:30 PM",
      ratingsCount: "3,276",
      rating: 5,
      img: "./store.jpg",
    },
    {
      id: 2,
      storeName: "Super store",
      date: "18/02/2023",
      time: "07:30 PM",
      ratingsCount: "3,276",
      rating: 5,
      img: "./store.jpg",
    },
    {
      id: 3,
      storeName: "Super store",
      date: "18/02/2023",
      time: "07:30 PM",
      ratingsCount: "3,276",
      rating: 4,
      img: "./store.jpg",
    },
    {
      id: 4,
      storeName: "Super store",
      date: "18/02/2023",
      time: "07:30 PM",
      ratingsCount: "3,276",
      rating: 4,
      img: "./store.jpg",
    },
  ];

  return (
    <div className="retailers-wrapper">
      <div className="retailers-top">
        <h3>Top retailers</h3>
        <Link to={"/top-retailers"}>
          <h4>See all</h4>
        </Link>
      </div>
      <div className="retailers-main">
        {DUMMY_RETAILERS.map((retailer) => {
          return (
            <div key={retailer.id} className="single-retailer">
              <div className="single-retailer-left">
                <img src={retailer.img} />
                <div className="retailer-detail">
                  <h5>{retailer.storeName}</h5>
                  <div className="detail-date">
                    <p>{retailer.date}</p>
                    <hr />
                    <p>{retailer.time}</p>
                  </div>
                </div>
              </div>
              <div className="single-retailer-right">
                <div className="right-rating">
                  <p>({retailer.ratingsCount})</p>
                  <Rating
                    initialRating={retailer.rating}
                    readonly
                    emptySymbol={
                      <ReactSVG src="./tools-icons/star-empty.svg" />
                    }
                    fullSymbol={
                      <ReactSVG src="./tools-icons/star-filled.svg" />
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Retailers;
