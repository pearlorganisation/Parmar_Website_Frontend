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
      <div className="blog-item">
        <div className="blog-img">
          <img
            src={imageurl + item.tourThumbnailImage}
            className="img-fluid rounded-top w-100"
            alt={item.tourName}
            loading="lazy"
          />
        </div>
        <div className="blog-content rounded-bottom p-4">
          <div className="blog-date">
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
          <div
            className="h4 d-block mb-3"
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
            Read More <i className="fa fa-arrow-right" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ToursCardMobile;
