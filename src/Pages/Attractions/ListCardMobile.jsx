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
              src={imageurl + item?.attGwtThumbnailImage}
              className="img-fluid w-100 rounded-top"
              alt={item?.attName}
              loading="lazy"
            />
          </div>
          <div className="categories-content rounded-bottom p-1 ">
            <h4 className="font-bold">{item?.attName}</h4>

            <div className="flex justify-center text-[#ffc107]">
              <div>{item?.attCity}</div>
            </div>

            {/* <div className="categories-review mb-4">
              <div className="me-3">4.5 Review</div>
              <div className="d-flex justify-content-center text-secondary">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star text-body" />
              </div>
            </div> */}
            <div className="mb-4 mt-4 px-3">
              <h4 className="bg-[#00646f] text-primary rounded-pill py-2 px-4 mb-0 font-bold">
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
              </h4>
            </div>

            <div className="px-3 mb-2 flex justify-end">
              <button
                href="#"
                className="btn btn-primary rounded-pill d-flex justify-content-center py-1 "
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
