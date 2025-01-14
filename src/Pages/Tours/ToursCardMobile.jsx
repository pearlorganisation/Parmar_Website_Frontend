import React, { Fragment } from "react";
import { imageurl } from "../../Components/Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ToursCardMobile = (props) => {
  // const currentCurrency = useSelector((state) => state.authData);
  const { item, currentCurrency, currRate } = props;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="blog-item border-blue-700 border-2 rounded-md px-2">
        <div className="blog-img">
          <img
            src={imageurl + item.tourThumbnailImage}
            className="img-fluid rounded-top w-100 mt-2"
            alt={item.tourName}
            loading="lazy"
          />
        </div>
        <div className="blog-content rounded-bottom p-4">
          <div className="blog-date text-sm">
            {currRate
              ? (Number(currRate) * Number(item.tourPrice)).toFixed(2)
              : Number(item.tourPrice).toFixed(2)}
            - {currentCurrency.currency} /*
          </div>
          {/* <div className="blog-comment my-3">
          <div className="small">
            <span className="fa fa-user text-primary" />
            <span className="ms-2">Martin.C</span>
          </div>
          <div className="small">
            <span className="fa fa-comment-alt text-primary" />
            <span className="ms-2">6 Comments</span>
          </div>
        </div> */}
          <div className="flex flex-row justify-between mt-2 mb-2">
            <div className="md:text-sm text-sm font-semibold text-yellow-300 lg:text-lg">
              {item.tourCity}
            </div>
            <div className="text-[#ea001e] text-sm font-bold md:text-lg lg:text-xl">
              {item.tourNofDays} Days
            </div>
          </div>
          <div
            className="h4 d-block mb-3 text-base"
            onClick={() =>
              navigate(`/tourpackages-details/${item.tourPackageId}`)
            }
          >
            {item.tourName}
          </div>
          {/* <p className="mb-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
          libero soluta impedit eligendi? Quibusdam, laudantium.
        </p> */}
          <div
            className="cursor-pointer"
            onClick={() =>
              navigate(`/tourpackages-details/${item.tourPackageId}`)
            }
          >
            View Details <i className="fa fa-arrow-right" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ToursCardMobile;
