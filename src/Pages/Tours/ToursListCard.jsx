import React from "react";
import { imageurl } from "../../Components/Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ToursListCard = (props) => {
  // const currentCurrency = useSelector((state) => state.authData);
  const navigate = useNavigate();
  const { item, index, currentCurrency, currRate } = props;
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex justify-between ${
        !isEven ? "flex-row-reverse" : ""
      } rounded border-2 p-1 border-[#1f2e4e]`}
    >
      <div className="w-3/4 relative ">
        <div className="px-5 py-3">
          <h4 className="font-bold md:text-base lg:text-xl">{item.tourName}</h4>
          <div className="md:text-sm  font-semibold text-yellow-300 lg:text-lg">
            {item.tourCity}
          </div>

          {item.tourDescription && (
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: `${item.tourDescription.substring(0, 200)}${
                  item.tourDescription.length > 200 ? "..." : ""
                }`,
              }}
            />
          )}
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-12  py-2 gap-4 items-start">
          <div className="text-[#ea001e] font-bold text-base md:text-lg lg:text-xl">
            {" "}
            {item.tourNofDays} Days
          </div>{" "}
          <div className="text-[#ea001e] font-bold text-base md:text-lg lg:text-xl">
            {currRate
              ? (Number(currRate) * Number(item.tourPrice)).toFixed(2)
              : Number(item.tourPrice).toFixed(2)}
            - {currentCurrency.currency} /Per Person
          </div>{" "}
          <div>
            {" "}
            <button
              className="btn btn-primary rounded "
              onClick={() =>
                navigate(`/tourpackages-details/${item.tourPackageId}`)
              }
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/4 ">
        <img
          src={imageurl + item.tourThumbnailImage}
          alt={item.tourName}
          loading="lazy"
          className="h-full min-w-32"
        />
      </div>
    </div>
  );
};

export default ToursListCard;
