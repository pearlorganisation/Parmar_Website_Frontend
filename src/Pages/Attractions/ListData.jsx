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
        <div className="min-h-32 min-w-32 max-h-32 max-w-32  md:min-h-48 md:min-w-48 md:max-h-48 md:max-w-48  lg:min-h-60 lg:min-w-60 lg:max-h-60 lg:max-w-60 ">
          <img
            src={imageurl + item.attThumbnailImage}
            className="rounded-l-lg h-full w-full object-cover"
            alt={item?.attName}
            loading="lazy"
          />
        </div>
        <div className=" flex flex-col justify-center w-[60%]">
          <h4 className="font-bold text-xs md:text-sm lg:text-xl">{item.attName}</h4>
          <div className="flex flex-col  gap-3 ">
            <div className="text-yellow-300 py-2 font-bold text-xs md:text-sm lg:text-xl"> {item.attCity},            <span className="text-black font-semibold text-xs md:text-sm lg:text-xl">{item.attCountryCode}</span>
            </div>
            <div className="font-sans text-black line-clamp-2 lg:line-clamp-4 ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque est impedit facere sit laboriosam temporibus inventore ab nobis non fugiat adipisci rerum sapiente perferendis laudantium, odio quasi modi placeat veniam!</div>
          </div>
        </div>
        <div className="min-h-32 min-w-24 max-h-32 max-w-24  md:min-h-48 md:min-w-32 md:max-h-48 md:max-w-32  lg:min-h-60 lg:min-w-40 lg:max-h-60 lg:max-w-40  flex border-3 border-yellow-500 flex-col justify-between p-3 ml-auto bg-[#00646f] rounded-r-lg">
          <div className="mt-auto mb-3">
            <div className="text-right">
              <div className="lg:text-lg md:text-base text-sm font-bold text-white ">From</div>
              <div className="lg:text-3xl md:text-2xl text-xl  font-bold text-[#ffc107]">
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
                    ).toFixed(2) }

                <span className="text-xs md:text-sm lg:text-lg text-white">
                  &nbsp; {currentCurrency.currency}
                </span>
              </div>
              <div className="text-xs mb-2  lg:text-lg text-white">Per Adult</div>

              <button
                className="px-2 py-1.5 btn-primary rounded text-xs  lg:text-lg"
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
