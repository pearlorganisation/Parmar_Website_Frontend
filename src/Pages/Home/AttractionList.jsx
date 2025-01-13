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
    title: "Tickets",
    url: "/img/Two Tickets.svg",
  },
  {
    title: "Combos",
    url: "/img/Two Tickets.svg",
  },
  {
    title: "Theme Parks",
    url: "/img/Roller Coaster.svg",
  },
  {
    title: "Tours",
    url: "/img/Tour Guide.svg",
  },
  {
    title: "Zoos",
    url: "/img/Elephant.svg",
  },
  {
    title: "Water Parks",
    url: "/img/Outdoor Swimming Pool.svg",
  },
  {
    title: "Museum",
    url: "/img/Museum.svg",
  },
  {
    title: "Landmarks",
    url: "/img/Frame 603.svg",
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
        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-0  justify-between md:px-20 pb-16">
          {filtersForQuery.map((el) => {
            return (
              <div
                // onClick={() => {
                //   alert(`${el.title} Clicked  `);
                // }}
                onClick={() => handleFilterClick(el.title)}
                className="border-1  flex py-2 px-3 md:px-3 sm:px-2 hover:scale-105 items-center hover:cursor-pointer border-blue-500  hover:border-[#C3F1F5] rounded-md justify-between "
                style={{
                  boxShadow:
                    "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                }}
              >
                <div className="flex justify-center items-center">
                  <img src={el.url} alt="" srcset="" />
                </div>
                <p className="font-sans text-black text-sm md:text-md ">
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
          <div className="w-[70%] md:w-[85%] ">
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
