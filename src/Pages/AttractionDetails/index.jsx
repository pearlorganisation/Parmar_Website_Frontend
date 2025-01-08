import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import Banner from "../../Components/Common/Banner";
import { instance } from "../../Components/Others/AxiosInstance";
import { useParams } from "react-router-dom";
import AttractionDescription from "./AttractionDescription";
import AttractionBookingForm from "./AttractionBookingForm";
import { fetchActivityList } from "../../Components/Reducers/attListSlice";
import { FaCarSide } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AttractionBookingFormForb2cuser from "./AttractionBookingFormForb2cuser";
import BannerSection from "./BannerSection";
import OtherDetails from "./OtherDetails";
import Slider from "react-slick";
import AttractionCard from "../../Components/Home/AttractionCard";
import { LiaHotelSolid } from "react-icons/lia";
import { GiTicket } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdAttractions } from "react-icons/md";
import { TbBuildingCircus } from "react-icons/tb";
const AttractionDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.authData);
  const [attractionDetails, setattractionDetails] = useState(null);
  const [attractionTickets, setattractionTickets] = useState([]);
  const [attId, setattId] = useState();

  const currentCurrency = useSelector((state) => state.authData);
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));
  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );

  const [showDetails, setshowDetails] = useState(false);
  const [showInclusion, setshowInclusion] = useState(false);
  const [showExclusion, setshowExclusion] = useState(false);

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

  useEffect(() => {
    getAttractionDetails();
    console.log(loginData?.data?.userType);

    dispatch(
      fetchActivityList({
        attractionId: 1,
        agencyId: 0,
        agencyUserId: 0,
        currencyCode: currentCurrency.currency,
        platformId: 2,
        langCode: currentCurrency.language,
      })
    );

    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, [id, currentCurrency.currency, currentCurrency.language]);

  const getAttractionDetails = async () => {
    try {
      const response = await instance.post("/getAttractionDetailsTravelPack", {
        attUniqueId: id,
        fetchId: 2,
        agencyId: 0,
        agencyUserId: 0,
        currencyCode: currentCurrency.currency,
        platformId: 2,
        langCode: currentCurrency.language,
      });
      const attractionData = response.data;
      setattractionDetails(attractionData);
      setattId(attractionData.attractionsId);
      getgetaddonbannerlist(attractionData.attractionsId);

      if (
        loginData.data !== null &&
        (loginData.data.userType === "b2b" ||
          loginData.data.userType === "b2buser")
      ) {
        // gettickettypelistbyattraction(attractionData.attractionsId);
        gettickettypelistforb2cuser(attractionData.attractionsId);
      } else {
        gettickettypelistforb2cuser(attractionData.attractionsId);
      }

      post_itemto_gtag(
        attractionData.attractionsId,
        attractionData.attName,
        attractionData.gwtAdultPrice
      );

      console.log("response", attractionData);
    } catch (error) {
      console.log(error);
    }
  };

  const gettickettypelistforb2cuser = async (attractionId) => {
    try {
      const res = await instance.post("getTicketTypeListByAttractionTvlPack", {
        ttAttractionId: attractionId,
        platformId: 2,
      });

      const tktData = res.data.map((item) => ({
        label: item.ttTicketType,
        value: item.ticketTypeId,
        eventtypeId: item.eventtypeId,
        resourceID: item.resourceID,
        adultPrice: item.tvlPackAdultPrice,
        childPrice: item.tvlPackChildPrice,
        adultAvailCount: item.adultAvailCount,
        childAvailCount: item.childAvailCount,
      }));
      const updatedTktData = [{ label: "select one", value: 0 }, ...tktData];

      setattractionTickets(updatedTktData);
    } catch (error) {
      console.log(error);
    }
  };

  const gettickettypelistbyattraction = async (attractionId) => {
    try {
      const res = await instance.post("gettickettypelistbyattraction", {
        ttAttractionId: attractionId,
      });

      const tktData = res.data.map((item) => ({
        label: item.ttTicketType,
        value: item.ticketTypeId,
        eventtypeId: item.eventtypeId,
        resourceID: item.resourceID,
      }));

      // Add the default item at the beginning
      const updatedTktData = [{ label: "select one", value: 0 }, ...tktData];

      setattractionTickets(updatedTktData);
    } catch (error) {
      console.log(error);
    }
  };

  window.dataLayer = window.dataLayer || [];
  const post_itemto_gtag = (attid, attname, gwtAdultPrice) => {
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "AED",
        value: gwtAdultPrice,
        items: [
          {
            item_id: attid,
            item_name: attname,
            price: gwtAdultPrice,
            quantity: 1,
            // discount: 10,
            item_category: "Attraction",
            // att_id: attid,
            // att_name: attname,
            // price: gwtAdultPrice,
            // quantity: 1,
          },
        ],
      },
    });
  };
  const [bannerAddons, setbannerAddons] = useState([]);
  const getgetaddonbannerlist = async (id) => {
    try {
      const res = await instance.post("getaddonbannerlist", {
        attractionId: id,
      });
      setbannerAddons(res.data);
      console.log(res.data);
    } catch (error) {}
  };
  const attList = useSelector((state) => state.attList.data);
  const attIsLoading = useSelector((state) => state.attList.isLoading);

  const [showFormonMobile, setshowFormonMobile] = useState(false);

  // $(window).scroll(function () {
  //   // use the value from $(window).scrollTop();

  //   console.log("scroll posision", window.scrollY);
  // });

  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateContentHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      setContentHeight(height);
    };

    updateContentHeight(); // Set height initially

    // Optional: Update height on window resize or other events
    window.addEventListener("resize", updateContentHeight);

    return () => {
      window.removeEventListener("resize", updateContentHeight);
    };
  }, [showDetails]);
  const [scrollPosition, setPosition] = useState(0);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  const aminitiesDataList = [
    {
      id: 1,
      name: "Hotels",
      icon: <LiaHotelSolid />,
    },
    {
      id: 2,
      name: "Sightsheeing",
      icon: <TbBuildingCircus />,
    },
    {
      id: 3,
      name: "Entry Tickets",
      icon: <GiTicket />,
    },
    {
      id: 4,
      name: "Meals",
      icon: <IoFastFoodOutline />,
    },
    {
      id: 5,
      name: "Activities",
      icon: <MdAttractions />,
    },
    {
      id: 6,
      name: "Transfers",
      icon: <FaCarSide />,
    },
  ];

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );

  useEffect(() => {
    hashData();
  }, []);

  const hashData = async () => {
    const combinedData = "9791412273" + "jeyapalvt@gmail.com";

    try {
      // Convert the input string to a Uint8Array
      const encoder = new TextEncoder();
      const data = encoder.encode(combinedData);

      // Hash the data using SHA-256
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);

      // Convert the hash to a hexadecimal string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      // setHashedOutput(hashHex);

      console.log("Hash Result", hashHex);
    } catch (error) {
      console.error("Error generating hash:", error);
    }
  };
  return (
    <Fragment>
      {/* <Banner title={attractionDetails?.attName} /> */}

      {attractionDetails && (
        <div className="container-fluid contact py-5">
          <div className="container ">
            <BannerSection
              attVideo={attractionDetails?.attVideo}
              images={attractionDetails?.filesStorage}
              name={attractionDetails?.attName}
              currRate={currRate?.convertionRate}
              adultPrice={
                loginData?.data?.userType === "b2b"
                  ? attractionDetails.gwtAdultOfferPrice
                  : attractionDetails.gwtB2cAdultPrice
              }
              // childPrice={attractionDetails?.gwtChildOfferPrice}
              attUniqueId={id}
            />
          </div>
        </div>
      )}

      {/* 
      {bannerAddons.length > 0 && (
        <div className="container-fluid mb-5">
          <div className="container ">
            <div className=" bg-white p-4 shadow-lg rounded mb-10 md:mb-0 w-full">
              <div className="md:flex justify-between">
                {bannerAddons.map((item, index) => (
                  <div
                    key={index}
                    className="font-bold flex flex-wrap items-center gap-2 mb-2 md:mb-0"
                  >
                    <div className="text-[#0dcaf0] text-2xl">
                      {" "}
                      <i className={item.addonIcon} />
                    </div>
                    <div>{item.addonType}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}

      <div className="container-fluid">
        <div className="container">
          <div className="bg-white p-4 shadow-lg rounded mb-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {aminitiesDataList?.map((item, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <div className="text-[#01b8cc] text-3xl">{item.icon}</div>
                {item.name}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[70%_auto] gap-5">
            <div
              className={` w-full md:order-last hidden md:block z-10  transition-all delay-1000 
            `}
            >
              <div className="bg-white p-4 shadow-lg rounded mb-10 md:mb-0">
                <AttractionBookingFormForb2cuser
                  currRate={currRate?.convertionRate}
                  currentCurrency={currentCurrency}
                  attractionTickets={attractionTickets}
                  attId={attId}
                  attractionName={attractionDetails?.attName}
                />
              </div>
            </div>

            <div className="w-full mb-5">
              <div className="bg-white p-4 shadow-lg rounded">
                <AttractionDescription
                  description={attractionDetails?.attGwtDescription}
                />
              </div>
              <div className="bg-white p-4 shadow-lg rounded mt-5">
                <div className="flex justify-between">
                  <div>
                    <h6 className="text-capitalize mb-3">
                      Terms And Conditions
                    </h6>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setshowDetails(!showDetails)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
                {showDetails && (
                  <div>{attractionDetails?.attTermsAndCondition}</div>
                )}
              </div>

              <div className="bg-white p-4 shadow-lg rounded mt-5">
                <div className="flex justify-between">
                  <div>
                    <h6 className="text-capitalize mb-3">Inclusion</h6>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setshowInclusion(!showInclusion)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
                {showInclusion && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: attractionDetails?.inclusion,
                    }}
                  />
                )}
              </div>

              <div className="bg-white p-4 shadow-lg rounded mt-5">
                <div className="flex justify-between">
                  <div>
                    <h6 className="text-capitalize mb-3">Exclusion</h6>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setshowExclusion(!showExclusion)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
                {showExclusion && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: attractionDetails?.exclusion,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {/* 
          <p>Total height: {contentHeight}px</p>

          <p>{contentHeight - 500}</p>

          <p>Current Scroll Position: {scrollPosition}px</p> */}
          <div className="container-fluid categories pb-5">
            <div className="container pb-5">
              <div className="slider-container">
                <h3 className="text-xl md:text-3xl  text-capitalize mb-3">
                  Related <span className="text-primary">Attractions</span>
                </h3>
                <Slider {...settings}>
                  {attList?.map((item, index) => (
                    <div key={index} className="p-10">
                      <AttractionCard item={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
        md:hidden bg-white fixed w-[85%] top-0 z-[1030] overflow-y-auto bottom-0 py-2 pl-4
        duration-500 ${showFormonMobile ? "right-0" : "right-[-100%]"}
        `}
      >
        <div className="p-3 py-2">
          {loginData?.data?.userType === "b2b" ||
          loginData?.data?.userType === "b2cuser" ? (
            <>
              {" "}
              <AttractionBookingForm
                currRate={currRate?.convertionRate}
                currentCurrency={currentCurrency}
                attractionTickets={attractionTickets}
                attId={attId}
              />
            </>
          ) : (
            <div>
              <AttractionBookingFormForb2cuser
                currRate={currRate?.convertionRate}
                currentCurrency={currentCurrency}
                attractionTickets={attractionTickets}
                attId={attId}
                attractionName={attractionDetails?.attName}
              />
            </div>
          )}
        </div>

        <div
          className={`md:hidden lg:hidden fixed bottom-0 z-10 w-[85%] right-0  duration-500  ${
            showFormonMobile ? "right-0" : "right-[-100%]"
          }`}
        >
          <div className="w-[100%]  ">
            <div className="">
              <button
                onClick={() => setshowFormonMobile(!showFormonMobile)}
                className="btn btn-primary rounded w-[100%]"
              >
                {showFormonMobile ? "Close" : " Book Now"}{" "}
              </button>
            </div>{" "}
          </div>
        </div>
      </div>

      <div className={` p-0  ${showFormonMobile && "hidden"} w-full`}>
        <div className="md:hidden lg:hidden fixed bottom-0 z-10 w-full ">
          <div className=" ">
            <div className="bg-white border-2 rounded-lg shadow-lg p-3">
              <div className="flex justify-between">
                <button
                  onClick={() => setshowFormonMobile(!showFormonMobile)}
                  className="btn btn-primary rounded "
                >
                  {showFormonMobile ? "Close" : " Book Now"}
                </button>
                <div className="font-extrabold text-xl text-[#01b8cc]">
                  Starts From
                  {loginData?.data?.userType === "b2b"
                    ? attractionDetails?.gwtAdultOfferPrice
                    : attractionDetails?.gwtB2cAdultPrice}{" "}
                  AED
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AttractionDetails;
