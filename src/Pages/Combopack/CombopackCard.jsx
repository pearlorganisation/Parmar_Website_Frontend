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
        className="team-item p-4 pt-0 cursor-pointer "
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
            <div className="text-red-500 line-through font-extrabold text-xl">
              {currRate
                ? (
                    Number(currRate) * Number(item.actualTvlPackB2cAdultPrice)
                  ).toFixed(2)
                : Number(item.actualTvlPackB2cAdultPrice).toFixed(2)}

              <span className="text-[10px] ">{currentCurrency.currency}</span>
            </div>
            <div className="text-blue-950 font-extrabold text-xl">
              {currRate
                ? (Number(currRate) * Number(item.offerB2cAdultPrice)).toFixed(
                    2
                  )
                : Number(item.offerB2cAdultPrice).toFixed(2)}

              <span className="text-[10px] ">{currentCurrency.currency}</span>
            </div>
          </div>
          <h4>{item.comboName}</h4>
        </div>
      </div>
    </Fragment>
  );
};

export default CombopackCard;
