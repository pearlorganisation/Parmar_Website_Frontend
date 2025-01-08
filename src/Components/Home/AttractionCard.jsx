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
      style={{boxShadow:" rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"}}
        className="cursor-pointer hover:scale-105 h-80 w-60 rounded-t-md overflow-hidden rounded-b-2xl   flex items-center gap-4 flex-col"
        onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
      >
        <img
          src={imageurl + item?.attGwtThumbnailImage}
          className="img-fluid w-100 rounded-top h-44"
          alt={item?.attName}
          loading="lazy"
        />

        <div  className="px-1  bg-white h-full  flex flex-col justify-start  items-start ">
        <div className=" ">
          {" "}
          <h4 className="font-bold">{item?.attName}</h4>
        </div>
        <div className="flex justify-between   ">
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

            <span className="text-base"> {currentCurrency.currency}</span>
          </div>
        </div>
        </div>
        
      </div>
     
    </Fragment>
  );
};

export default AttractionCard;
