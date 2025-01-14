import React, { Fragment } from "react";
import { imageurl } from "../../Components/Others/ApiUrls";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerImages = ({ tourpackDetails, currRate, currentCurrency }) => {
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000, // Change this value to set the autoplay time in milliseconds
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <div className="container-fluid team">
        <div className="container py-5">
          <div className="bg-white rounded-lg shadow-lg relative">
            {/* Image Slider Section */}
            <div className="h-56 md:h-[400px] lg:h-[400px]">
              <div className="hidden md:block lg:block">
                <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[400px] lg:h-[400px]">
                  <div className="md:col-span-2 md:row-span-2 relative overflow-hidden">
                    <img
                      src={imageurl +'6755797239834576917.jpg'} 
                        // tourpackDetails?.tvl_galleryImage_1}
                      className="object-fill w-full h-full"
                      alt="Your Image"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:col-span-1 relative overflow-hidden">
                    <img
                      // src={imageurl + tourpackDetails?.tvl_galleryImage_2}
                      src={imageurl + '6755797239834576917.jpg'}
                      className="object-fill w-full h-full"
                      alt="Your Image"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:col-span-1 relative overflow-hidden">
                    <img
                      // src={imageurl + tourpackDetails?.tvl_galleryImage_3}
                      src={imageurl + '6755797239834576917.jpg'}

                      className="object-fill w-full h-full"
                      alt="Your Image"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:col-span-1 relative overflow-hidden">
                    <img
                      // src={imageurl + tourpackDetails?.tvl_galleryImage_4}
                      src={imageurl + '6755797239834576917.jpg'}

                      className="object-fill w-full h-full"
                      alt="Your Image"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:col-span-1 relative overflow-hidden">
                    <img
                      // src={imageurl + tourpackDetails?.tvl_galleryImage_5}
                      src={imageurl + '6755797239834576917.jpg'}

                      className="object-fill w-full h-full"
                      alt="Your Image"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Slider */}

              <div className="md:hidden lg:hidden">
                {tourpackDetails ? ( // Check if combodetails is not null or undefined
                  <Slider {...settings}>
                    {[1, 2, 3, 4, 5].map((i) => {
                      const imageUrl = tourpackDetails[`tvl_galleryImage_${i}`]; // Get the image URL
                      return imageUrl ? ( // Check if the image exists
                        <div key={i}>
                          <img
                            src={imageurl + imageUrl} // Only render if the image URL is valid
                            className="object-fill object-center w-full h-56"
                            alt={`Gallery Image ${i}`}
                            loading="lazy"
                          />
                        </div>
                      ) : null; // Return null if the image does not exist
                    })}
                  </Slider>
                ) : null}{" "}
                {/* If combodetails is null or undefined, return null */}
              </div>
            </div>

            {/* Details Section */}
            <div className="items-center justify-between md:p-5 md:flex p-3 bg-white shadow-lg relative ">
              <div className="flex justify-between">
                <div className="border-gray-200 mb-3">
                  <h3 className="text-xl md:text-3xl text-capitalize font-extrabold">
                    {tourpackDetails?.tourName}
                  </h3>
                </div>
              </div>
              <div className="md:flex justify-between text-gray-500 md:justify-end font-Kanit800 md:space-x-10">
                <div className="text-[13px] flex md:space-x-2 justify-between font-bold items-center">
                  <div>Price</div>
                  <span>
                    <span className="font-extrabold text-3xl text-blue-900">
                      {currRate
                        ? (
                            Number(currRate) *
                            Number(tourpackDetails?.tourPrice)
                          ).toFixed(2)
                        : Number(tourpackDetails?.tourPrice).toFixed(2)}
                      - {currentCurrency?.currency} /Per Person
                    </span>{" "}
                  </span>
                </div>
                {/* <div className="text-[13px] flex md:space-x-2 justify-between font-bold items-center">
                  <div>Child Price</div>
                  <span>
                    <span className="font-extrabold text-3xl text-blue-900">
                      {tourpackDetails?.offerB2cChildPrice}
                    </span>{" "}
                    AED
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BannerImages;
