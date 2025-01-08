import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HeroSection2 = () => {
  const images = [
    "https://t4.ftcdn.net/jpg/07/87/16/69/360_F_787166948_1YEZeLZl8XTsp6OXXK78rovNTNPC6PoC.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDsou-9Yj0s2NTQ1pGx4zvMQj12BW1NUvgLA&s",
    "https://www.shutterstock.com/image-photo/calm-weather-on-sea-ocean-600nw-2212935531.jpg",
  ];

  return (
    <div className="relative h-[500px] w-full">
      {/* Slider */}
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        loop={true}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed Navigation Buttons */}
      <button className="swiper-button-prev absolute top-1/2 left-8 transform -translate-y-1/2 bg-white bg-opacity-50 text-black rounded-full p-3 shadow-lg">
        &#8592;
      </button>
      <button className="swiper-button-next absolute top-1/2 right-8 transform -translate-y-1/2 bg-white bg-opacity-50 text-black rounded-full p-3 shadow-lg">
        <svg
          width="33"
          height="51"
          viewBox="0 0 33 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 4L26 27.9144L4 47" stroke="white" stroke-width="9" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection2;
