import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../Components/Common/Banner";
import { instance } from "../../Components/Others/AxiosInstance";
import { useParams } from "react-router-dom";
import TourpackDescription from "./TourpackDescription";
import TourBookingForm from "./TourBookingForm";
import buildingicon from "../../icons/building-icon.png";
import BannerImages from "./BannerImages";
import Slider from "react-slick";
import ToursCard from "../../Components/Home/ToursCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchToursList } from "../../Components/Reducers/tourListSlice";
import { imageurl } from "../../Components/Others/ApiUrls";
const TourDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentCurrency = useSelector((state) => state.authData);
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));
  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );

  const [tourpackDetails, settourpackDetails] = useState(null);
  const [aminitiesList, setaminitiesList] = useState([]);
  const tourList = useSelector((state) => state.tourList.data);

  const tourIsLoading = useSelector((state) => state.tourList.isLoading);
  useEffect(() => {
    getTourpackDetails();
    getAminities();
    getTourList();
    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, [id]);

  const getTourpackDetails = async () => {
    try {
      const response = await instance.post("gettourpackageDetails", {
        tourPackageId: id,
      });

      console.log(response.data);
      settourpackDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTourList = async () => {
    dispatch(
      fetchToursList({
        platformId: 2,
        currencyCode: currentCurrency.currency,
        tourStatus: true,
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

  const getAminities = async () => {
    try {
      const resData = await instance.post("getaddonbannerlisttour", {
        tourId: id,
        platformId: 2,
      });
      console.log("aminities List", resData.data);
      setaminitiesList(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const aminitiesDataList = [
    {
      id: 1,
      name: "Hotels",
      icon: null,
    },
    {
      id: 2,
      name: "Sightsheeing",
      icon: null,
    },
    {
      id: 3,
      name: "Entry Tickets",
      icon: null,
    },
    {
      id: 4,
      name: "Meals",
      icon: null,
    },
    {
      id: 5,
      name: "Activities",
      icon: null,
    },
    {
      id: 6,
      name: "Transfers",
      icon: null,
    },
  ];

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );
  return (
    <Fragment>
      {/* <Banner title={tourpackDetails?.tourName} /> */}

      <BannerImages
        tourpackDetails={tourpackDetails}
        currRate={currRate?.convertionRate}
        currentCurrency={currentCurrency}
      />

      <div className="container-fluid team ">
        <div className="container ">
          <div className="bg-white p-4 shadow-lg rounded mb-3 md:flex gap-5 justify-between">
            {aminitiesDataList?.map((item, index) => (
              <div className="flex gap-2 items-center" key={index}>
                {item?.icon}
                {item?.name}
              </div>
            ))}
          </div>

          <div className="md:flex justify-between gap-5">
            <div className="md:w-4/12 w-full  md:order-last">
              <div className=" bg-white p-4 shadow-lg rounded">
                <TourBookingForm
                  id={id}
                  tourName={tourpackDetails?.tourName}
                  currRate={currRate?.convertionRate}
                  currentCurrency={currentCurrency}
                  price={tourpackDetails?.tourPrice}
                />
              </div>
            </div>
            <div className="md:w-8/12 w-full">
              <div className="bg-white p-4 shadow-lg rounded mb-10">
                <TourpackDescription
                  description={tourpackDetails?.tourDescription}
                />
              </div>

              <div className="bg-white p-4 shadow-lg rounded mb-10">
                <div className="font-bold border-b-2 border-gray-200 mb-3">
                  <h3 className="text-3xl text-capitalize ">
                    <span className="text-primary"> Inclusions</span>
                  </h3>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: tourpackDetails?.inclusions,
                  }}
                />
                <style jsx>{`
                  .prose {
                    line-height: 1.75; /* Custom line height */
                  }
                  .prose ul {
                    list-style-type: disc;
                    margin-left: 1.25rem; /* Tailwind equivalent to ml-5 */
                  }
                  .prose li {
                    margin-bottom: 0.5rem; /* Spacing between list items */
                  }
                `}</style>
              </div>
              <div className="bg-white p-4 shadow-lg rounded mb-10">
                <div className="font-bold border-b-2 border-gray-200 mb-3">
                  <h3 className="text-3xl text-capitalize ">
                    <span className="text-primary"> Exclusions</span>
                  </h3>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: tourpackDetails?.exclusions,
                  }}
                />
                <style jsx>{`
                  .prose {
                    line-height: 1.75; /* Custom line height */
                  }
                  .prose ul {
                    list-style-type: disc;
                    margin-left: 1.25rem; /* Tailwind equivalent to ml-5 */
                  }
                  .prose li {
                    margin-bottom: 0.5rem; /* Spacing between list items */
                  }
                `}</style>
              </div>

              <div className="bg-white p-4 shadow-lg rounded">
                <div className="font-bold border-b-2 border-gray-200 mb-3 mt-10">
                  <h3 className="text-3xl text-capitalize ">
                    Tour<span className="text-primary"> Itinerary</span>
                  </h3>
                </div>
                <div className="mt-10">
                  {tourpackDetails?.packageDetail?.map((item, index) => (
                    <div key={index} className="py-6">
                      <div className="bg-white rounded border-2 border-[#000C21]">
                        <h5 className="text-xl text-capitalize font-bold p-3 ">
                          Day<span className="text-primary"> {index + 1}</span>
                        </h5>
                        <div className="bg-[#f2f2f2] rounded-b-lg">
                          <div className="p-3 md:flex justify-between gap-5">
                            <div className="w-4/12">
                              <img
                                src={imageurl + item.packageSitePhoto}
                                alt={tourpackDetails?.tourName}
                                loading="lazy"
                              />
                            </div>
                            <div className="w-8/12">
                              {item.packageDayActivity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid categories pb-5 mt-5 ">
            <div className="container pb-5">
              <div className="slider-container bg-white">
                <h3 className="text-xl md:text-3xl  text-capitalize mb-3">
                  Related <span className="text-primary">Holidays</span>
                </h3>
                <Slider {...settings}>
                  {tourList &&
                    tourList.map((item, index) => (
                      <div className="md:w-[22%] mb-2 px-5" key={index}>
                        <ToursCard item={item} />
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

export default TourDetails;
