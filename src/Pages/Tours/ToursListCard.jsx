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
        <div className="p-5">
          <h4 className="font-bold text-xl">{item.tourName}</h4>
          <div>{item.tourCity}</div>

          {item.tourDescription && (
            <div
              dangerouslySetInnerHTML={{
                __html: `${item.tourDescription.substring(0, 200)}${
                  item.tourDescription.length > 200 ? "..." : ""
                }`,
              }}
            />
          )}
        </div>

        <div className="absolute w-full bottom-0 flex justify-between p-5">
          <div className="text-[#ea001e] font-bold text-2xl">
            {" "}
            {item.tourNofDays} Days
          </div>{" "}
          <div className="text-[#ea001e] font-bold  text-2xl">
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
      <div className="w-2/5">
        <img
          src={imageurl + item.tourLogo}
          alt={item.tourName}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ToursListCard;
