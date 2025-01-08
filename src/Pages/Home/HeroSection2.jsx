import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const HeroSection2 = () => {
  const images = [
    "https://s3-alpha-sig.figma.com/img/5abe/d640/10cf7bf158b73573dc0810471b05d79c?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ihboGlX8-3TgkudkV2BDQEs4gsj2aJCWVlv9yo726Hql0aYybkODBUtQ1hYa0BJsHKyZ5vUmD63~nAxv4v6heQpaTCObQyVsIZ~Dhqg8-LLt~K86OtwAPD5Lnlkv38ivw8Irp0aesUoDl7PEuXjcfvgvfCu5Sf4GuHp8g8vlM97a1CLE2KjVfm48K7Zjut~VUzjVRIF190TZIQyPzN-I1mARjV0e9AKwIRE64MOb6xlTUDNy~BY-n7AGGRg3u0M17qM3p-LBHRa54z54k43~izTTWIu~L0NKgOMx6uDqmwZw0j90p~LAg4URc-MKz99eYyJ105VxTUt~KbdJ3gzOAw__",
    "https://s3-alpha-sig.figma.com/img/91a5/1c24/8eafa661aa7c0f7cb8af2427f96c2451?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a7pgqWj9li7NUtguzzwv1QbjyAC~NjzNkWcxHVRPtQxK~JZnu7vb43~Q2z3lui0BPs8E2rjeph~s32PFFA0414W-0U4T41NGC4UpaDqFm4pK19IfjtBy4oHHxib7AaSx-OwinkLyy6pprXOtCMIf-ykGpKMXW1is4K92eI5EB8Zo8s0R6w8y9W6eqwYdz4fID50z3laNPk1gT7f1lv0Yv6QK7PtrHiOEAxRnAGyf4sEynK4gWsVttWMsvbmbKlbgQEPjqy7r3WfxyVVZiKChVi~I6U68NQ1k-01WWYD35NI01u~INsetCQYGTr42VxpGKPFy2H1QyqykksdBNpXsHQ__",
    "https://www.shutterstock.com/image-photo/calm-weather-on-sea-ocean-600nw-2212935531.jpg",
  ];

  return (
    <div className="relative h-[500px] w-full">
      {/* Slider */}
      <Swiper
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        autoplay={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
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
      <button className="custom-swiper-button-prev absolute top-1/2 left-8 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full text-white  shadow-lg">
        <svg
          width="33"
          height="51"
          viewBox="0 0 33 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M29 47L7 23.0856L29 4" stroke="white" stroke-width="9" />
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
          <path d="M4 4L26 27.9144L4 47" stroke="white" stroke-width="9" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection2;
