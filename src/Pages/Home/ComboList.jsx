import React, { Fragment } from "react";
import ComboCard from "../../Components/Home/ComboCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ComboList = (props) => {
  const { comboList, introduction, currRate } = props;

  return (
    <Fragment>
      <div className="container-fluid categories py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Combo<span className="text-primary">pack</span> Offers
            </h1>
            <p className="mb-0">{introduction}</p>
          </div>

          <div class="container-fluid categories pb-5">
            <div class="container pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {comboList &&
                  comboList.slice(0, 6).map((item, index) => (
                    <div className="mb-2" key={index}>
                      <ComboCard item={item} currRate={currRate} />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* <div className="flex items-center justify-center relative">
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
                {tourList &&
                  tourList.slice(0, 8).map((item, index) => {
                    return (
                      <SwiperSlide key={index} className="">
                        <div className="flex justify-center items-center rounded-full w-full mb-20 md:mb-12 px-2 ">
                          <ToursCard item={item} currRate={currRate} />
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
            </div>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default ComboList;
