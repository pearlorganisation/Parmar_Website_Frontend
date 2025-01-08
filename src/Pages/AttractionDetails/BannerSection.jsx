import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageurl } from "../../Components/Others/ApiUrls";
import { useSelector } from "react-redux";
const BannerSection = ({
  images,
  name,
  adultPrice,
  childPrice,
  attVideo,
  attUniqueId,
  currRate,
}) => {
  // const imageUrl = import.meta.env.VITE_IMG_URL;

  const currentCurrency = useSelector((state) => state.authData);
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000, // Change this value to set the autoplay time in milliseconds
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [tempImageList, settempImageList] = useState();

  useEffect(() => {
    prepareImages();
  }, [images]);

  const prepareImages = () => {
    let filterImage = images?.filter((item) => item.platformId === 2);

    const totalImage = filterImage;

    let tempImage = [...filterImage]; // Creating a copy of the original array

    if (totalImage.length < 4 && totalImage.length !== 0) {
      const imagesToAdd = 4 - totalImage.length;

      for (let i = 0; i < imagesToAdd; i++) {
        tempImage.push({
          fileName: totalImage[totalImage.length - 1].fileName,
        });
      }

      settempImageList(tempImage);
    } else {
      settempImageList(filterImage);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg ">
        {tempImageList && tempImageList.length > 0 ? (
          <div className="h-56 md:h-[400px] lg:h-[400px]">
            <div className="hidden md:block lg:block">
              <div class="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[400px] lg:h-[400px">
                <div class="md:col-span-2 md:row-span-2 relative overflow-hidden ">
                  {/* <img
                    src={imageUrl + tempImageList[0].fileName}
                    class="object-cover w-full h-full"
                  /> */}

                  {/* <>
                    {attVideo != null ? (
                      <div className=" aspect-video">
                        <iframe
                          className="object-fill"
                          width="100%"
                          height="400px"
                          src={`https://www.youtube.com/embed/${attVideo}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&infinite=1&playlist=${attVideo}`}
                          frameborder="0"
                          loading="lazy"

                          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                      </div>
                    ) : (
                      <img
                        src={imageurl + tempImageList[0].fileName}
                        class="object-fill w-full h-full "
                      />
                    )}
                  </> */}

                  <img
                    src={imageurl + tempImageList[0]?.fileName}
                    class="object-fill w-full h-full "
                    alt={name}
                    loading="lazy"
                  />
                </div>
                <div class="md:col-span-1 relative overflow-hidden ">
                  <img
                    src={imageurl + tempImageList[1]?.fileName}
                    class="object-fill w-full h-full "
                    alt={name}
                    loading="lazy"
                  />
                </div>
                <div className="relative overflow-hidden md:col-span-1">
                  <img
                    src={imageurl + tempImageList[2]?.fileName}
                    className="object-fill w-full h-full"
                    alt={name}
                    loading="lazy"
                  />
                </div>
                <div className="relative overflow-hidden md:col-span-1">
                  <img
                    src={imageurl + tempImageList[3]?.fileName}
                    className="object-fill w-full h-full"
                    alt={name}
                    loading="lazy"
                  />
                </div>
                <div className="relative overflow-hidden md:col-span-1">
                  <img
                    src={imageurl + tempImageList[4]?.fileName}
                    className="object-fill w-full h-full"
                    alt={name}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className=" md:hidden lg:hidden">
              {images && (
                <Slider {...settings}>
                  {images
                    .filter((item) => item.platformId === 2)
                    .map((item, index) => (
                      <div
                        className="relative h-56 md:h-72 lg:h-72"
                        key={index}
                      >
                        <img
                          src={imageurl + item.fileName}
                          height="100%"
                          width="100%"
                          className="object-fill object-center w-full h-full"
                          alt={name}
                          loading="lazy"
                        />
                      </div>
                    ))}
                </Slider>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* {attVideo != null && (
              <div className=" md:h-[400px] lg:h-[400px] ">
                <div className=" aspect-video">
                  <iframe
                    className="object-fill"
                    width="100%"
                    height="400px"
                    src={`https://www.youtube.com/embed/${attVideo}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&infinite=1&playlist=${attVideo}`}
                    frameborder="0"
                    loading="lazy"

                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            )} */}
          </>
        )}

        <div className="items-center justify-between md:p-5 md:flex p-3">
          <div className="flex justify-between ">
            <div className="  border-gray-200 mb-3">
              <h3 className="text-xl md:text-3xl text-capitalize font-extrabold">
                {name}
              </h3>
            </div>
          </div>
          <div className="md:flex justify-between text-gray-500 md:justify-end font-Kanit800 md:space-x-10">
            <div className="text-[13px] flex md:space-x-2 justify-between font-bold items-center">
              <div> Starting Price</div>{" "}
              <span>
                <span className="font-extrabold text-3xl text-blue-900">
                  {currRate
                    ? (Number(currRate) * Number(adultPrice)).toFixed(2)
                    : Number(adultPrice).toFixed(2)}
                </span>{" "}
                {currentCurrency.currency}
              </span>
            </div>
            {/* <div className=" text-[13px] flex md:space-x-2 justify-between font-bold items-center">
              <div> Child Price</div>{" "}
              <span>
                <span className="font-extrabold  text-blue-900 text-3xl">
                  {currRate
                    ? (Number(currRate) * Number(childPrice)).toFixed(2)
                    : Number(childPrice).toFixed(2)}
                </span>
                {currentCurrency.currency}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
