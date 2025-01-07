import React, { Fragment } from "react";
import { imageurl } from "../Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AttractionCard = (props) => {
  const navigate = useNavigate();
  const { item, currRate } = props;
  const currentCurrency = useSelector((state) => state.authData);
  const loginData = useSelector((state) => state.authData);
  return (
    <Fragment>
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
      >
        <img
          src={imageurl + item?.attGwtThumbnailImage}
          className="img-fluid w-100 rounded-top h-44"
          alt={item?.attName}
          loading="lazy"
        />
        <div className="mt-3 ">
          {" "}
          <h4 className="font-bold">{item?.attName}</h4>
        </div>
        <div className="flex justify-between ">
          <div className="text-black  font-black line-through">
            {currRate
              ? (Number(currRate) * Number(item.gwtAdultPrice)).toFixed(2)
              : Number(item.gwtAdultPrice).toFixed(2)}

            {currentCurrency.currency}
          </div>
          <div className="text-[#ffc107] font-black">
            {currRate
              ? (
                  Number(currRate) *
                  Number(
                    loginData?.data?.userType === "b2b"
                      ? item.gwtAdultOfferPrice
                      : item.gwtB2cAdultPrice
                  )
                ).toFixed(2)
              : Number(
                  loginData?.data?.userType === "b2b"
                    ? item.gwtAdultOfferPrice
                    : item.gwtB2cAdultPrice
                ).toFixed(2)}

            <span className="text-[10px]"> {currentCurrency.currency}</span>
          </div>
        </div>
      </div>
      {/* <div
        className="categories-item p-4 cursor-pointer"
        onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
      >
        <div className="categories-item-inner">
          <div className="categories-img rounded-top h-44">
            <img
              src={imageurl + item?.attGwtThumbnailImage}
              className="img-fluid w-100 rounded-top h-44"
              alt
            />
          </div>
          <div className="categories-content rounded-bottom p-1 ">
            <h4 className="font-bold">{item?.attName}</h4>

            <div className="flex justify-center text-[#ffc107]">
              <div>{item?.attCity}</div>
            </div>

            <div className="mb-4 mt-4 px-3">
              <h4 className="bg-[#00646f] text-primary rounded-pill py-2 px-1 mb-0 font-bold">
                <div className="flex justify-between">
                  <div className="relative text-white">
                    <span className="before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-[4px] before:bg-red-500 before:transform before:-rotate-12 before:origin-bottom-left">
                      {currRate
                        ? (
                            Number(currRate) * Number(item.gwtAdultPrice)
                          ).toFixed(2)
                        : Number(item.gwtAdultPrice).toFixed(2)}

                      <span className="text-[10px]">
                        {" "}
                        {currentCurrency.currency}
                      </span>
                    </span>
                  </div>

                  <div>
                    {currRate
                      ? (
                          Number(currRate) * Number(item.gwtAdultOfferPrice)
                        ).toFixed(2)
                      : Number(item.gwtAdultOfferPrice).toFixed(2)}
                    <span className="text-[10px]">
                      {" "}
                      {currentCurrency.currency}
                    </span>
                  </div>
                </div>
              </h4>
            </div>

            <div className="px-3 mb-2 flex justify-end">
              <button
                href="#"
                className="btn btn-primary rounded-pill d-flex justify-content-center py-1 "
                onClick={() =>
                  navigate(`/attraction-details/${item?.attUniqueId}`)
                }
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default AttractionCard;
