import React, { Fragment } from "react";
import { imageurl } from "../../Components/Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ListData = ({ item, currRate }) => {
  const navigate = useNavigate();
  const currentCurrency = useSelector((state) => state.authData);
  const loginData = useSelector((state) => state.authData);
  return (
    <Fragment>
      <div className="flex rounded border-2 p-1 border-[#1f2e4e] gap-3 mb-3">
        <div className="w-3/12">
          <img
            src={imageurl + item.attGwtThumbnailImage}
            className="rounded-l-lg h-48 w-full object-cover"
            alt={item?.attName}
            loading="lazy"
          />
        </div>
        <div className="w-7/12">
          <h4 className="font-bold">{item.attName}</h4>
          <div className="flex gap-3">
            <div> {item.attCity},</div>
            <div>{item.attCountryCode}</div>
          </div>
        </div>
        <div className="w-2/12 flex flex-col justify-betweenp-3 ml-auto bg-[#00646f] rounded-r-lg">
          <div className="mt-auto mb-3">
            <div className="mr-1 text-right">
              <div className="text-[15px] text-white ">From</div>
              <div className="text-2xl font-bold text-[#ffc107]">
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

                <span className="text-[10px] text-white">
                  {currentCurrency.currency}
                </span>
              </div>
              <div className="text-[10px] text-white">Per Adult</div>

              <button
                className="btn btn-primary rounded "
                // href={() => navigate(`/attraction-details/${item.attUniqueId}`)}
                onClick={() =>
                  navigate(`/attraction-details/${item.attUniqueId}`)
                }
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListData;
