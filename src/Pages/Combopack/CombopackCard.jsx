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
        className="team-item p-4 pt-0 cursor-pointer border-2 border-[#01b8cc] lg:min-h-72 lg:max-h-72 md:min-h-64 md:max-h-64   "
        onClick={() => {
          //combopack-details
          navigate(`/combopack-details/${item.attUniqueId}`);
        }}
      >
        <div className="team-img">
          {/* <img
            src={
              imageurl + item.thumbImageFile ||
              "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
            }
            className="h-44 w-full sm:h-40 md:h-44 lg:h-44 object-cover rounded-xl  mt-4"
            alt={item?.comboName}
            loading="lazy"
          /> */}

          <img
            src={
              item?.thumbImageFile
                ? `${imageurl}${item.thumbImageFile}`
                : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
            }
            className="h-44 w-full sm:h-40 md:h-44 lg:h-44 object-cover rounded-xl mt-4"
            alt={item?.comboName || "No image available"}
            loading="lazy"
          />
        </div>
        <div className="team-content pt-4">
          <div className="flex justify-between p-3">
            <div className="text-red-500 text-[16px] md:text-[16px] lg:text-[22px] line-through font-extrabold ">
              {currRate
                ? (
                    Number(currRate) * Number(item.actualTvlPackB2cAdultPrice)
                  ).toFixed(2)
                : Number(item.actualTvlPackB2cAdultPrice).toFixed(2)}

              <span className="text-[12px] md:text-[12px] ">
                {currentCurrency.currency}
              </span>
            </div>
            &nbsp;
            <div className="text-blue-950 font-extrabold text-[16px] md:text-[16px] lg:text-[22px]">
              {currRate
                ? (Number(currRate) * Number(item.offerB2cAdultPrice)).toFixed(
                    2
                  )
                : Number(item.offerB2cAdultPrice).toFixed(2)}
              <span className="text-[12px] md:text-[12px] xl:border-3 xl:border-pink-600">
                {currentCurrency.currency}
              </span>
            </div>
          </div>
          <h4 className="text-xs font-bold md:text-sm line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
            {item.comboName}
          </h4>
        </div>
      </div>
    </Fragment>
  );
};

export default CombopackCard;
