import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../Components/Common/Banner";
import { useParams } from "react-router-dom";
import { instance } from "../../Components/Others/AxiosInstance";
import ComboDescription from "./ComboDescription";
import ComboBookingForm from "./ComboBookingForm";
import ComboCard from "../../Components/Home/ComboCard";
import BannerImages from "./BannerImages";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { fetchComboList } from "../../Components/Reducers/comboListSlice";
const ComboDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comboDetails, setcomboDetails] = useState(null);
  const currentCurrency = useSelector((state) => state.authData);
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));
  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );

  const comboList = useSelector((state) => state.comboList.data);
  const comboIsLoading = useSelector((state) => state.comboList.isLoading);

  useEffect(() => {
    getComboDetails();
    getComboList();
    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, [currentCurrency.currency]);

  const getComboDetails = async () => {
    try {
      const response = await instance.post("getTravelPackComboOffer", {
        platformId: 2,
        currencyCode: "AED",
        attUniqueId: id,
      });
      setcomboDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComboList = async () => {
    dispatch(
      fetchComboList({
        attractionId: 1,
        currencyCode: currentCurrency.currency,
        platformId: 1,
        langCode: currentCurrency.language,
      })
    );
  };
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000, // Change this value to set the autoplay time in milliseconds
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    // rtl: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );
  //getTravelPackComboOffer
  return (
    <Fragment>
      {/* <Banner title={comboDetails?.comboName} /> */}

      <BannerImages
        combodetails={comboDetails}
        currRate={currRate?.convertionRate}
        currentCurrency={currentCurrency}
      />
      <div className="container-fluid team">
        <div className="container ">
          <div className="md:flex justify-between gap-5">
            <div className="md:w-4/12 w-full  md:order-last">
              {/* offer price and reguler price show here */}
              {/* <div className=" bg-white p-4 shadow-lg rounded">
               
                {comboDetails !== null && (
                  <div>
                    <div>{comboDetails?.offerB2cAdultPrice}</div>
                    <div>{comboDetails?.offerB2cChildPrice}</div>
                  </div>
                )}
              </div> */}
              <div className=" bg-white p-4 shadow-lg rounded mb-3">
                <div className="border-b-2 border-gray-200">
                  <h3 className="text-xl text-capitalize ">Price</h3>
                </div>
                <div className=" mb-3 md:flex md:justify-between text-xl font-bold">
                  <div className="text-red-500 line-through">
                    {currRate?.convertionRate
                      ? (
                          Number(currRate?.convertionRate) *
                          Number(comboDetails?.actualTvlPackB2cAdultPrice)
                        ).toFixed(2)
                      : Number(
                          comboDetails?.actualTvlPackB2cAdultPrice
                        ).toFixed(2)}
                    <span className="text-[10px] ">
                      {currentCurrency.currency}
                    </span>
                  </div>
                  <div>
                    <span className="text-primary">
                      {currRate?.convertionRate
                        ? (
                            Number(currRate?.convertionRate) *
                            Number(comboDetails?.offerB2cAdultPrice)
                          ).toFixed(2)
                        : Number(comboDetails?.offerB2cAdultPrice).toFixed(2)}
                      <span className="text-[10px] ">
                        {currentCurrency.currency}
                      </span>{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className=" bg-white p-4 shadow-lg rounded">
                {comboDetails !== null && (
                  <ComboBookingForm
                    currRate={currRate?.convertionRate}
                    currentCurrency={currentCurrency}
                    comboOfferId={comboDetails?.comboOfferId}
                    attName={comboDetails?.comboName}
                    adultPrice={comboDetails?.offerB2cAdultPrice}
                    childPrice={comboDetails?.offerB2cChildPrice}
                  />
                )}
              </div>
            </div>
            <div className="md:w-8/12 w-full">
              <div className="bg-white p-4 shadow-lg rounded">
                <ComboDescription
                  description={comboDetails?.comboDescription}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid categories pb-5 mt-5 ">
            <div className="container pb-5">
              <div className="slider-container bg-white">
                <h3 className="text-xl md:text-3xl  text-capitalize mb-3">
                  Related <span className="text-primary">Combo Pack</span>
                </h3>
                <Slider {...settings}>
                  {comboList &&
                    comboList.map((item, index) => (
                      <div className="md:w-[22%] mb-2 px-5" key={index}>
                        <ComboCard item={item} />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ComboDetails;
