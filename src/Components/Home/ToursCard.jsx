import React, { Fragment } from "react";
import { imageurl } from "../Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ToursCard = (props) => {
  const currentCurrency = useSelector((state) => state.authData);
  const navigate = useNavigate();
  const { item, currRate } = props;
  return (
    <Fragment>
      <div
        className="cursor-pointer  relative  p-2  min-h-80 rounded-md  hover:scale-105 "
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        onClick={() => navigate(`/tourpackages-details/${item?.tourPackageId}`)}
      >
        <img
          src={imageurl + item?.tourThumbnailImage}
          className="img-fluid w-100 rounded-top h-44"
          alt={item?.tourName}
          loading="lazy"
        />
        <div className="mt-3 ">
          {" "}
          <h4 className="font-bold line-clamp-2"> {item?.tourName}</h4>
        </div>
        <div className="flex absolute bottom-2 justify-end  ">
          <div className="text-[#ffc107] font-black">
            {currRate
              ? (Number(currRate) * Number(item?.tourPrice)).toFixed(2)
              : Number(item?.tourPrice).toFixed(2)}

            <span className="text-[10px]"> {currentCurrency.currency}</span>
          </div>
        </div>
      </div>
      {/* <div className="blog-item">
        <div className="blog-img">
          <img
            src={imageurl + item?.tourThumbnailImage}
            className="img-fluid rounded-top w-100"
            alt="Image"
          />
        </div>
        <div className="blog-content rounded-bottom p-4">
          <div className="blog-date text-xl font-bold">
            {currRate
              ? (Number(currRate) * Number(item?.tourPrice)).toFixed(2)
              : Number(item?.tourPrice).toFixed(2)}

            <span className="text-[10px]"> {currentCurrency.currency}</span>
          </div>

          <a
            className="h4 d-block mb-3 cursor-pointer"
            onClick={() =>
              navigate(`/tourpackages-details/${item?.tourPackageId}`)
            }
          >
            {item?.tourName}
          </a>

          <div
            className="cursor-pointer"
            onClick={() =>
              navigate(`/tourpackages-details/${item?.tourPackageId}`)
            }
          >
            Read More <i className="fa fa-arrow-right" />
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default ToursCard;
