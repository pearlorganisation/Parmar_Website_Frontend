import React, { Fragment } from "react";
import { imageurl } from "../../Components/Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CombopackCard = (props) => {
  const currentCurrency = useSelector((state) => state.authData);
  const navigate = useNavigate();
  const { item, currRate } = props;
  return (
    <Fragment>
      <div
        className="team-item p-4 pt-0 cursor-pointer border-2 border-[#01b8cc] lg:min-h-72 lg:max-h-72 md:min-h-56 md:max-h-56   "
        onClick={() => {
          //combopack-details
          navigate(`/combopack-details/${item.attUniqueId}`);
        }}
      >
        <div className="team-img">
          <img
            src={imageurl + item.thumbImageFile}
            className="img-fluid rounded w-100"
            alt={item?.comboName}
            loading="lazy"
          />
        </div>
        <div className="team-content pt-4">
          <div className="flex justify-between p-3">
            <div className="text-red-500 text-[12px] md:text-[16px] lg:text-[22px] line-through font-extrabold ">
              {currRate
                ? (
                    Number(currRate) * Number(item.actualTvlPackB2cAdultPrice)
                  ).toFixed(2)
                : Number(item.actualTvlPackB2cAdultPrice).toFixed(2)}

              <span className="text-[10px] md:text-[12px] ">{currentCurrency.currency}</span>
            </div>
            &nbsp;
            <div className="text-blue-950 font-extrabold text-[12px] md:text-[16px] lg:text-[22px]"> 
              {currRate
                ? (Number(currRate) * Number(item.offerB2cAdultPrice)).toFixed(
                    2
                  )
                : Number(item.offerB2cAdultPrice).toFixed(2)}

              <span className="text-[10px] md:text-[12px] xl:border-3 xl:border-pink-600">{currentCurrency.currency}</span>
            </div>
          </div>
          <h4 className="text-xs font-bold md:text-sm line-clamp-2 md:line-clamp-3 lg:line-clamp-4">{item.comboName}</h4>
        </div>
      </div>
    </Fragment>
  );
};

export default CombopackCard;
