import React, { Fragment } from "react";
import { imageurl } from "../Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EmojiImage from "../../icons/emoji.png";
import LocationImage from "../../icons/location.png";

const ComboCard = (props) => {
  const currentCurrency = useSelector((state) => state.authData);
  const { item, currRate } = props;
  const navigate = useNavigate();
  return (
    <Fragment>
      {/* <div
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
      </div> */}

      <div
        className="cursor-pointer relative hover:scale-105 w-full sm:h-80 md:h-96 lg:h-96 rounded-2xl overflow-hidden  flex flex-col items-center gap-4"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
        }}
        onClick={() => navigate(`/combopack-details/${item.attUniqueId}`)}
      >
        {/* Responsive Image */}
        <div className="relative w-[90%] flex justify-center">
          <img
            src={`${imageurl}${item?.thumbImageFile}`}
            className=" h-44 w-full sm:h-40 md:h-44 lg:h-44 object-cover rounded-xl  mt-4"
            alt={item?.comboName || "Combo Card"}
            loading="lazy"
          />

          {/* Rating Badge */}
          <div className="absolute bottom-0 left-10   transform -translate-x-1/3 -translate-y-1/4 rounded-full shadow-lg bg-white px-2 py-1  md:px-4 md:py-2">
            <div className="flex items-center gap-1 flex-nowrap">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49398 0.883129C7.62885 0.468027 8.21611 0.468028 8.35098 0.883129L9.84444 5.47952C9.90476 5.66516 10.0778 5.79085 10.2729 5.79085H15.1059C15.5423 5.79085 15.7238 6.34936 15.3707 6.60591L11.4608 9.44664C11.3029 9.56137 11.2368 9.76474 11.2971 9.95038L12.7906 14.5468C12.9254 14.9619 12.4503 15.3071 12.0972 15.0505L8.18731 12.2098C8.02939 12.095 7.81556 12.095 7.65765 12.2098L3.74772 15.0505C3.39462 15.3071 2.91951 14.9619 3.05439 14.5468L4.54785 9.95037C4.60817 9.76474 4.54209 9.56137 4.38417 9.44664L0.474247 6.60591C0.121141 6.34936 0.302614 5.79085 0.739077 5.79085H5.57201C5.76721 5.79085 5.9402 5.66516 6.00052 5.47952L7.49398 0.883129Z"
                  fill="#FFB649"
                />
              </svg>
              <span className="text-xs md:text-sm  font-semibold">4.5 </span>
              <span className="text-xs md:text-sm  font-semibold"> (37)</span>

              <img
                src={EmojiImage}
                alt="Emoji"
                className="w-2.5 h-2.5 md:w-4 md:h-4"
              />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-white flex flex-col justify-between w-full px-4 space-y-1">
          <h4 className="text-xs md:text-base  lg:text-xl line-clamp-2 font-bold text-center ">
            {item?.comboName}
          </h4>

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
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs sm:text-sm mb-1 mt-1">
            <div className="flex items-center gap-1">
              <img
                src={LocationImage}
                className="w-2.5 h-2.5 md:w-4 md:h-4"
                alt="Location"
              />
              <span className="text-xs md:text-base  lg:text-xl">Dubai</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ComboCard;
