import React, { Fragment } from "react";
import { imageurl } from "../../Components/Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ListCardMobile = (props) => {
  const { item, currRate } = props;
  const currentCurrency = useSelector((state) => state.authData);
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.authData);
  return (
    <Fragment>
      {/* <div class="categories-carousel owl-carousel wow fadeInUp"> */}
      <div
        className="categories-item p-4 cursor-pointer"
        onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
      >
        <div className="categories-item-inner">
          <div className="categories-img rounded-top">
            <img
              src={imageurl + item?.attThumbnailImage}
              className="img-fluid w-100 rounded-top"
              alt={item?.attName}
              loading="lazy"
            />
          </div>
          <div className="categories-content rounded-bottom p-1 ">
            <h4 className="font-bold text-lg line-clamp-2">{item?.attName}</h4>

            <div className="flex text-base font-semibold justify-center text-[#ffc107]">
              <div>{item?.attCity}</div>
            </div>

            <div className="mb-4 mt-4 px-2">

              <p className="text-slate-600 text-xs md:text-sm font-semibold text-center line-clamp-4"> 
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste explicabo repellat alias? Suscipit, vitae? Sequi?
              </p>
            </div>

            <div className="px-3 mb-2 flex justify-between">
            <div className="flex justify-center items-center">
            <h4 className="bg-[#00646f] text-xs md:text-sm text-primary rounded-pill py-1 px-3 mb-0 font-bold">
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
                <span className="text-[9px] md:text-[10px] text-white">
                  &nbsp; {currentCurrency.currency}
                </span>
              </h4>
            </div>
              <button
                href="#"
                className="btn btn-primary text-xs md:text-sm rounded-pill d-flex justify-content-center py-1 "
                onClick={() =>
                  navigate(`/attraction-details/${item?.attUniqueId}`)
                }
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
};

export default ListCardMobile;
