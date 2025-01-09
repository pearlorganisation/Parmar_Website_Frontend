import React, { useEffect, useState } from "react";
import { instance } from "../../Components/Others/AxiosInstance";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const dummyImages = [
  {
    url: "https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "DummyImg1",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "DummyImg2",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "DummyImg3",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "DummyImg4",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "DummyImg5",
  },
];

const Herosection = () => {
  const [bannerImageList, setBannerImageList] = useState(dummyImages);

  // useEffect(() => {
  //   getBannerImages();
  // }, []);

  // const getBannerImages = async () => {
  //   try {
  //     const res = await instance.post("getWebsiteBannerImagesList", {
  //       id: 1,
  //     });

  //     const filterImage = res.data.filter(
  //       (item) => item.category === "travelpackb2c"
  //     );

  //     setBannerImageList(filterImage);
  //     console.log("Filtered Images:", res.data);
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //   }
  // };

  return (
    <section>
      {bannerImageList && (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {bannerImageList.map((el, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[80vh]">
                {" "}
                {/* Hero section height */}
                <img
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={el?.url || "/img/default.jpg"}
                  alt={el?.alt || "Hero Image"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Herosection;
