import React, { Fragment, useEffect, useState } from "react";
import { instance } from "../../Components/Others/AxiosInstance";
import { imageurl } from "../../Components/Others/ApiUrls";
const Herosection = () => {
  const [bannerImageList, setbannerImageList] = useState([]);
  useEffect(() => {
    getBannerImages();
  }, []);

  const getBannerImages = async () => {
    try {
      const res = await instance.post("getWebsiteBannerImagesList", {
        id: 1,
      });

      const filterImage = res.data.filter(
        (item) => item.category === "travelpackb2c"
      );

      setbannerImageList(filterImage);
      console.log("kabxhabhxa", res.data);
    } catch (error) {
      console.log(error);
      console.log("kabxhabhxa", error);
    }
  };
  return (
    <Fragment>
      {/* Carousel Start */}
      <div className="header-carousel">
        <div
          id="carouselId"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="false"
        >
          {/* Dynamic carousel indicators */}
          <ol className="carousel-indicators custom-carousel-indicators">
            {bannerImageList.map((item, index) => (
              <li
                key={item.id}
                data-bs-target="#carouselId"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`${item.altText} slide`}
              />
            ))}
          </ol>

          <div className="relative">
            <div className="carousel-inner " role="listbox">
              {bannerImageList.map((item, index) => (
                <div
                  key={item.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={imageurl + item.fileName}
                    className="img-fluid w-100 h-[1920px]"
                    alt={item.altText}
                    loading="lazy"
                  />
                  <div className="carousel-caption">
                    <div className="container py-4">
                      <div className="row g-5">
                        {/* <div
                          className="col-lg-6 d-none d-lg-flex fadeInRight animated"
                          data-animation="fadeInRight"
                          data-delay="1s"
                          style={{ animationDelay: "1s" }}
                        >
                          <div className="text-left">
                            <h1 className="display-5 text-white">
                              {item.title}
                            </h1>
                            <p>{item.description}</p>
                          </div>
                        </div> */}
                        <div
                          className="col-lg-6 fadeInLeft animated"
                          data-animation="fadeInLeft"
                          data-delay="1s"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End */}
    </Fragment>
  );
};

export default Herosection;
