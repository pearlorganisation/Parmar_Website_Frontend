import React, { Fragment } from "react";
import { imageurl } from "../Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ComboCard = (props) => {
  const currentCurrency = useSelector((state) => state.authData);
  const { item, currRate } = props;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        className="cursor-pointer p-3"
        onClick={() => navigate(`/combopack-details/${item.attUniqueId}`)}
      >
        <img
          src={imageurl + item.thumbImageFile}
          className="img-fluid w-100 rounded-top h-44"
          alt={item.comboName}
          loading="lazy"
        />
        <div className="mt-3 ">
          {" "}
          <h4 className="font-bold">{item.comboName}</h4>
        </div>
        <div className="flex justify-between ">
          <div className="text-black  font-black line-through">
            {currRate
              ? (
                  Number(currRate) * Number(item.actualTvlPackB2cAdultPrice)
                ).toFixed(2)
              : Number(item.actualTvlPackB2cAdultPrice).toFixed(2)}

            {currentCurrency.currency}
          </div>
          <div className="text-[#ffc107] font-black">
            {currRate
              ? (Number(currRate) * Number(item.offerB2cAdultPrice)).toFixed(2)
              : Number(item.offerB2cAdultPrice).toFixed(2)}

            <span className="text-[10px]"> {currentCurrency.currency}</span>
          </div>
        </div>
      </div>
      {/* <div
        className="team-item p-4 pt-0 cursor-pointer"
        onClick={() => {
          navigate(`/combopack-details/${item.attUniqueId}`);
        }}
      >
        <div className="team-img">
          <img
            src={imageurl + item.thumbImageFile}
            className="img-fluid rounded w-100"
            alt="Image"
          />
        </div>

        <div className="team-content pt-4">
          <div className="flex justify-between p-3">
            <div className="text-red-500 line-through font-extrabold ">
              {currRate
                ? (
                    Number(currRate) * Number(item.actualTvlPackB2cAdultPrice)
                  ).toFixed(2)
                : Number(item.actualTvlPackB2cAdultPrice).toFixed(2)}

              <span className="text-[10px]"> {currentCurrency.currency}</span>
            </div>
            <div className="text-blue-950 font-extrabold ">
              {currRate
                ? (Number(currRate) * Number(item.offerB2cAdultPrice)).toFixed(
                    2
                  )
                : Number(item.offerB2cAdultPrice).toFixed(2)}

              <span className="text-[10px]"> {currentCurrency.currency}</span>
            </div>
          </div>
          <h4>{item.comboName}</h4>
        </div>
      </div> */}
    </Fragment>
  );
};

export default ComboCard;
