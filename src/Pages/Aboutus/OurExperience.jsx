import React, { Fragment } from "react";
import { FaThumbsUp, FaCar, FaBuilding, FaClock } from "react-icons/fa";
const OurExperience = () => {
  return (
    <Fragment>
      {/* Fact Counter */}
      <div className="container-fluid counter py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="counter-item text-center">
                <div className="counter-item-icon mx-auto">
                  {/* <i className="fas fa-thumbs-up fa-2x" /> */}
                  <FaThumbsUp size={35} />
                </div>
                <div className="counter-counting my-3">
                  <span
                    className="text-white fs-2 fw-bold"
                    data-toggle="counter-up"
                  >
                    38,762
                  </span>
                  <span className="h1 fw-bold text-white">+</span>
                </div>
                <h4 className="text-white mb-0">Happy Clients</h4>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="counter-item text-center">
                <div className="counter-item-icon mx-auto">
                  {/* <i className="fas fa-car-alt fa-2x" /> */}
                  <FaCar size={35} />
                </div>
                <div className="counter-counting my-3">
                  <span
                    className="text-white fs-2 fw-bold"
                    data-toggle="counter-up"
                  >
                    165
                  </span>
                  <span className="h1 fw-bold text-white">+</span>
                </div>
                <h4 className="text-white mb-0">Attractions</h4>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="counter-item text-center">
                <div className="counter-item-icon mx-auto">
                  {/* <i className="fas fa-building fa-2x" /> */}
                  <FaBuilding size={35} />
                </div>
                <div className="counter-counting my-3">
                  <span
                    className="text-white fs-2 fw-bold"
                    data-toggle="counter-up"
                  >
                    566
                  </span>
                  <span className="h1 fw-bold text-white">+</span>
                </div>
                <h4 className="text-white mb-0">Partners</h4>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="counter-item text-center">
                <div className="counter-item-icon mx-auto">
                  {/* <i className="fas fa-clock fa-2x" /> */}
                  <FaClock size={35} />
                </div>
                <div className="counter-counting my-3">
                  <span
                    className="text-white fs-2 fw-bold"
                    data-toggle="counter-up"
                  >
                    465
                  </span>
                  <span className="h1 fw-bold text-white">+</span>
                </div>
                <h4 className="text-white mb-0">Destinations</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fact Counter */}
    </Fragment>
  );
};

export default OurExperience;
