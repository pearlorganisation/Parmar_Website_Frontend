import React, { Fragment } from "react";

const AboutIntro = () => {
  return (
    <Fragment>
      {/* About Start */}
      <div className="container-fluid overflow-hidden about py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
              <div className="about-item">
                <div className="pb-5">
                  <h1 className="display-5 text-capitalize">
                     <span className="text-primary">About </span>
                     Travel Pack 365
                  </h1>
                  <p className="text-md text-justify font-semibold">
                    Welcome to Travelpack 365, the leading travel agency in the
                    UAE with a legacy of excellence and decades of experience.
                    We specialize in crafting unforgettable travel experiences
                    tailored to your unique needs and desires. Our dedicated
                    team of travel experts combines deep industry knowledge with
                    a passion for exploration, ensuring every journey is
                    seamless and extraordinary.
                  </p>
                </div>
                <div className="row g-4">
                  <div className="col-lg-6 ">
                    <div className="about-item-inner border p-4">
                      <div className="about-icon mb-4">
                        <img
                          src="img/about-icon-1.png"
                          className="img-fluid w-50 h-50"
                          alt="travelpack365"
                          loading="lazy"
                        />
                      </div>
                      <h5 className="mb-3 font-bold text-md">Our Vision</h5>
                      <p className="py-3 font-serif text-balance">
                        Our vision is to be the foremost travel agency in the
                        UAE, renowned for creating exceptional and personalized
                        travel experiences. We aim to inspire and connect people
                        through unforgettable journeys, driven by our commitment
                        to innovation, excellence, and customer satisfaction.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="about-item-inner border p-4">
                      <div className="about-icon mb-4">
                        <img
                          src="img/about-icon-2.png"
                          className="img-fluid h-50 w-50"
                          alt="travelpack365"
                          loading="lazy"
                        />
                      </div>
                      <h5 className="pb-3 font-bold text-md">Our Mission</h5>
                      <p className="mb-0 font-serif text-balance ">
                        Our mission is to provide unparalleled travel
                        experiences by offering expert guidance, personalized
                        service, and innovative solutions. We strive to exceed
                        our clients’ expectations, ensuring every journey is
                        memorable and seamless while fostering a passion for
                        exploration and discovery.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-item my-4 font-black text-pretty">
                  At TP 365, we are committed to delivering unparalleled service
                  and personalized travel solutions. Whether you're dreaming of
                  a luxurious escape, a thrilling adventure, or a peaceful
                  retreat, our extensive network and expertise are at your
                  service. Discover the world with us and let us turn your
                  travel dreams into reality.
                </p>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="text-center rounded bg-secondary p-4">
                      <h1 className="display-6 text-white">25</h1>
                      <h5 className="text-light font-bold ">Years Of Experience</h5>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 font-bold text-start  flex justify-center items-center">
                    <div className="rounded">
                      <p className="mb-2">
                        <i className="fa fa-check-circle text-primary me-1" />{" "}
                        Morbi tristique senectus
                      </p>
                      <p className="mb-2">
                        <i className="fa fa-check-circle text-primary me-1" /> A
                        scelerisque purus
                      </p>
                      <p className="mb-2">
                        <i className="fa fa-check-circle text-primary me-1" />{" "}
                        Dictumst vestibulum
                      </p>
                      <p className="mb-0">
                        <i className="fa fa-check-circle text-primary me-1" />{" "}
                        dio aenean sed adipiscing
                      </p>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-5 d-flex align-items-center">
                    <a href="#" className="btn btn-primary rounded py-3 px-5">
                      More About Us
                    </a>
                  </div> */}
                  <div className="col-lg-7">
                    {/* <div className="d-flex align-items-center">
                      <img
                        src="img/parmar.png"
                        className="img-fluid rounded-circle  border-4 border-secondary"
                        style={{ width: 100, height: 100 }}
                        alt="travelpack365"
                        loading="lazy"
                      />
                      <div className="ms-4">
                        <h4>Narsaram Mali</h4>
                        <p className="mb-0">Founder & CEO</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.2s">
              <div className="">
                <div className=" ">
                  <img
                    src="img/about1.jpeg"
                    className="img-fluid rounded h-100 w-100"
                    alt="travelpack365"
                    loading="lazy"
                  />
                </div>
                {/* <div className="img-2">
                  <img
                    src="img/about2.jpeg"
                    className="img-fluid rounded w-100"
                    alt="travelpack365"
                    loading="lazy"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </Fragment>
  );
};

export default AboutIntro;
