import React from "react";
import { imageurl } from "../Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import EmojiImage from "../../icons/emoji.png";
import LocationImage from "../../icons/location.png";
import ClockImage from "../../icons/clock.png";
import GroupImage from "../../icons/group.png";

const AttractionCard = ({ item, currRate }) => {
  const navigate = useNavigate();
  const { data: loginData, currency } = useSelector((state) => state.authData);

  // Calculate prices
  const isB2BUser = loginData?.userType === "b2b";
  const basePrice = Number(item.gwtAdultPrice);
  const offerPrice = Number(
    isB2BUser ? item.gwtAdultOfferPrice : item.gwtB2cAdultPrice
  );
  const conversionRate = currRate || 1;
  const originalPrice = (conversionRate * basePrice).toFixed(2);
  const finalPrice = (conversionRate * offerPrice).toFixed(2);

  console.log(item, "item");
  return (
    <div
      className="cursor-pointer relative hover:scale-105 w-full sm:h-96 md:h-96 lg:h-96 rounded-2xl overflow-hidden  flex flex-col items-center gap-4"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      }}
      onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
    >
      {/* Responsive Image */}
      <div className="relative w-[90%] flex justify-center">
        <img
          src={`${imageurl}${item?.attThumbnailImage}`}
          className=" h-44 w-full sm:h-40 md:h-44 lg:h-44 object-cover rounded-xl  mt-4"
          alt={item?.attName || "Attraction"}
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
          {item?.attName}
        </h4>

        <p className="text-center text-xs md:text-base  lg:text-xl  md:hidden ">
          <span className="text-yellow-700">
            {`${finalPrice} ${currency}`}/-
          </span>{" "}
          per person
        </p>
        <div className="md:hidden flex flex-wrap justify-center gap-2 md:gap-4 text-xs sm:text-sm mb-1 mt-1">
          <div className="flex items-center gap-1">
            <img
              src={ClockImage}
              className="w-2.5 h-2.5 md:w-4 md:h-4"
              alt="Clock"
            />
            <span className="text-xs md:text-base  lg:text-xl">4 Days</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src={GroupImage}
              className="w-2.5 h-2.5 md:w-4 md:h-4"
              alt="Group"
            />
            <span className="text-xs md:text-base  lg:text-xl">10+</span>
          </div>
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

      <div className="hidden md:block absolute bottom-2 md:bottom-2 bg-white mb-4">
        <p className=" text-center text-xs md:text-base  lg:text-xl ">
          <span className="text-yellow-700">
            {`${finalPrice} ${currency}`}/-
          </span>{" "}
          per person
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm mt-0 px-2">
          <div className="flex items-center gap-1">
            <img src={ClockImage} className="w-4 h-4" alt="Clock" />
            <span className="text-xs md:text-base  lg:text-lg">4 Days</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={GroupImage} className="w-4 h-4" alt="Group" />
            <span className="text-xs md:text-base  lg:text-lg">10+</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={LocationImage} className="w-3 h-3" alt="Location" />
            <span className="text-xs md:text-base  lg:text-base"> Dangar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
