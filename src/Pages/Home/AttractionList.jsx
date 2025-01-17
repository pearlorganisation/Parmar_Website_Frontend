import React, { Fragment, useState, useEffect } from "react";

import AttractionCard from "../../Components/Home/AttractionCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const filtersForQuery = [
  {
    title: "Theme park",
    url: "/img/theme  park.svg",
  },
  {
    title: "Cruises and dinner",
    url: "/img/cruise and dinner.svg",
  },
  {
    title: "Zoo and Aquariums",
    url: "/img/zoo and aquariums.svg",
  },
  {
    title: "Snow activities",
    url: "/img/snow activity.svg",
  },
  {
    title: "Indoor activities",
    url: "/img/indoor act.svg",
  },
  {
    title: "Garden and parks",
    url: "/img/Outdoor Swimming Pool.svg",
  },
  {
    title: "Water activities",
    url: "/img/water activity.svg",
  },
  {
    title: "City tours",
    url: "/img/ciity tour.svg",
  },
];

const AttractionList = (props) => {
  const { attList, introduction, currencyRate, currRate } = props;

  const [filterAttractions, setFilterAttractions] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    applyFilter();
  }, [searchKey, attList]);

  const applyFilter = () => {
    // Make a copy of attList to avoid modifying the original array
    let updatedList = [...attList];

    // Filter by searchKey (attName)
    if (searchKey !== "") {
      updatedList = updatedList.filter((item) =>
        item.attName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    // Sort by gwtAdultOfferPrice (ascending order: min to max)
    updatedList = updatedList.sort(
      (a, b) => a.gwtAdultOfferPrice - b.gwtAdultOfferPrice
    );

    setFilterAttractions(updatedList);
  };

  const handleFilterClick = (title) => {
    searchParams.set("attraction", title); // Set the search parameter
    navigate({ search: searchParams.toString() }); // Update the URL
  };

  return (
    <Fragment>
      {console.log("currencyRatecurrencyRate", currencyRate)}
      <div className="container-fluid categories pb-5">
        <div className="md:px-20 px-10 mb-5 mt-5 relative">
          <input
            type="text"
            style={{
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
            placeholder=" Search Your Tour"
            onChange={(e) => setSearchKey(e.target.value)}
            className="block  w-full py-3 px-4 text-gray-900 border-2 placeholder:font-semibold placeholder:text-sm placeholder:text-slate-500  rounded-md focus:ring-[#01b8cc] focus:border-[#01b8cc] dark:bg-gray-700 dark:border-[#01b8cc] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#01b8cc] dark:focus:border-[#01b8cc] focus:outline-none focus:ring-2 active:ring-2 active:border-[#01b8cc]"
          />
          <div className="absolute top-5 flex justify-center px-1">
            <svg
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1795 14.9717L14.2726 12.0647M10.4968 13.6351C11.9147 13.6351 13.2745 13.0719 14.2771 12.0692C15.2797 11.0666 15.843 9.70682 15.843 8.28893C15.843 6.87103 15.2797 5.51121 14.2771 4.50861C13.2745 3.50601 11.9147 2.94275 10.4968 2.94275C9.07892 2.94275 7.7191 3.50601 6.71649 4.50861C5.71389 5.51121 5.15063 6.87103 5.15063 8.28893C5.15063 9.70682 5.71389 11.0666 6.71649 12.0692C7.7191 13.0719 9.07892 13.6351 10.4968 13.6351Z"
                stroke="black"
                stroke-width="0.761088"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* static query filters  */}

        <div className="flex flex-col  items-center justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            Top Things To Do
          </h1>

          <div className="w-64 h-1 bg-[#01b8cc]"></div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-2  justify-between md:px-4 pb-16">
          {filtersForQuery.map((el) => {
            return (
              <div
                // onClick={() => {
                //   alert(`${el.title} Clicked  `);
                // }}
                onClick={() => handleFilterClick(el.title)}
                className="flex flex-col items-center justify-center"
              >
                <div className="rounded-full bg-[#01b8cc] w-24 h-24 md:w-24 md:h-24 lg:w-24 lg:h-24 overflow-hidden flex items-center justify-center">
                  <img
                    src={el.url}
                    alt=""
                    className="w-full h-full object-contain p-4 bg-transparent"
                  />
                </div>

                <p className="font-sans text-wrap text-black text-sm md:text-sm lg:text-xs flex items-center justify-center mt-6 ">
                  {el.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="container pb-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Our <span className="text-primary">Attractions </span>
            </h1>
            <p className="mb-0 text-sm md:text-lg font-serif text-justify md:text-center">
              {introduction}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center relative">
          <div className="w-[92%] md:w-[90%] ">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              modules={[Navigation, Pagination]}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                420: {
                  slidesPerView: 2,
                  spaceBetween: 4,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 6,
                },
                540: {
                  slidesPerView: 2,
                  spaceBetween: 8,
                },
                // 640: {
                //   slidesPerView: 2,
                //   spaceBetween: 10,
                // },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                840: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                960: {
                  slidesPerView: 2,
                  spaceBetween: 3,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper"
            >
              {filterAttractions &&
                filterAttractions.slice(0, 8).map((item, index) => {
                  return (
                    <SwiperSlide key={index} className="">
                      <div className="flex justify-center items-center rounded-full w-full mb-20 md:mb-12 px-2 ">
                        <AttractionCard item={item} currRate={currRate} />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            <button className="custom-swiper-button-prev absolute top-1/2 left-8 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full text-white  shadow-lg">
              <svg
                width="33"
                height="51"
                viewBox="0 0 33 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29 47L7 23.0856L29 4"
                  stroke="white"
                  stroke-width="9"
                />
              </svg>
            </button>
            <button className="custom-swiper-button-next absolute top-1/2 right-8 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full text-white shadow-lg">
              <svg
                width="33"
                height="51"
                viewBox="0 0 33 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4L26 27.9144L4 47"
                  stroke="white"
                  stroke-width="9"
                />
              </svg>
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AttractionList;
