import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
const FooterComponent = () => {
  return (
    <Fragment>
      <div>
        {/* Footer Start */}
        <div
          className="container-fluid footer py-5 wow fadeIn bg-[#00646f]"
          data-wow-delay="0.2s"
        >
          <div className="container py-5 text-white">
            <div className="row g-5">
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="footer-item d-flex flex-column">
                  <div className="footer-item">
                    <div className=" mb-2 rounded p-1">
                      <img
                        src="/img/logo.png"
                        alt="travelpack365"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="text-white mb-4">About Us</h4>
                    <p className="mb-3 ">
                      TRAVELPACK365 Tourism comprise of professionals in the
                      tourism industry. It was a big challenge to establish a
                      company but through hard work, dedication and strong
                      determination, we became one of the leading tour operators
                      in the UAE.
                    </p>
                  </div>
                  {/* <div className="position-relative">
                    <input
                      className="form-control rounded-pill w-100 py-3 ps-4 pe-5"
                      type="text"
                      placeholder="Enter your email"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2"
                    >
                      Subscribe
                    </button>
                  </div> */}
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="footer-item d-flex flex-column">
                  <h4 className="text-white mb-4">Quick Links</h4>
                  <Link to="/about-us">
                    <i className="fas fa-angle-right me-2" /> About
                  </Link>
                  <Link href="/attraction-list">
                    <i className="fas fa-angle-right me-2" /> Attractions
                  </Link>
                  <Link to="/combopack-list">
                    <i className="fas fa-angle-right me-2" /> Combo packs
                  </Link>
                  <Link to="tourpackages-list">
                    <i className="fas fa-angle-right me-2" /> Tours
                  </Link>

                  <Link to="contact-us">
                    <i className="fas fa-angle-right me-2" /> Contact us
                  </Link>
                  <Link to="our-privacy">
                    <i className="fas fa-angle-right me-2" /> Privacy Policy
                  </Link>
                  <Link to="our-termsandconditions">
                    <i className="fas fa-angle-right me-2" /> Terms And
                    Conditions
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="footer-item d-flex flex-column">
                  <h4 className="text-white mb-4">Contact Info</h4>
                  <div className="mb-3">
                    <h6 className="text-muted mb-0">Dubai, UAE</h6>
                    <p className="text-white mb-0">+971 529418587</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-muted mb-0">
                      Golden wings Tours & Travels 303, Zodiac Plaza near
                      Girivar Society near nabard vihar flats, Navrangpura,
                      Ahmedabad-380009
                    </h6>
                    <p className="text-white mb-0"> +91 7567992575</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-muted mb-0">Email:</h6>
                    <p className="text-white mb-0">info@travelpack365.com </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="footer-item d-flex flex-column">
                  <h4 className="text-white mb-4">AUTHORIZED SELLER ON</h4>
                  <div className=" mb-2 rounded p-1">
                    <img
                      src="/img/TripAdvisorLogo.png"
                      alt="travelpack365"
                      loading="lazy"
                    />
                  </div>

                  <div className=" mb-2 rounded p-1">
                    <img
                      src="/img/viator.png"
                      alt="travelpack365"
                      loading="lazy"
                    />
                  </div>

                  <div className="bg-white mb-2 rounded p-1">
                    <img
                      src="/img/weAccept.jpg"
                      alt="travelpack365"
                      loading="lazy"
                    />
                  </div>

                  <div className="d-flex">
                    <a
                      className="hover:bg-[#01b8cc] btn-secondary btn-md-square rounded-circle me-3"
                      href="https://www.facebook.com/travelpack365"
                      target="_blank"
                    >
                      <FaFacebook />
                    </a>
                    {/* <a
                      className="btn btn-secondary btn-md-square rounded-circle me-3"
                      href
                    >
                      <i className="fab fa-twitter text-white" />
                    </a> */}
                    <a
                      href="https://www.instagram.com/travelpack365/"
                      className="hover:bg-[#01b8cc] btn-secondary btn-md-square rounded-circle me-3"
                      target="_blank"
                    >
                      <div>
                        <FaSquareInstagram />
                      </div>
                    </a>
                    {/* <a
                      className="btn btn-secondary btn-md-square rounded-circle me-0"
                      href
                    >
                      <i className="fab fa-linkedin-in text-white" />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid copyright py-2 bg-[#ffc107]  mb-1"></div>
        {/* Footer End */}
        {/* Copyright Start */}
        <div className="container-fluid copyright py-2 bg-[#ffc107]">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 text-center text-md-start mb-md-0">
                <span className="text-body">
                  <a href="#" className="border-bottom text-white">
                    <i className="fas fa-copyright text-light me-2" />
                    Travelpack365
                  </a>
                  , All right reserved.
                </span>
              </div>
              {/* <div className="col-md-6 text-center text-md-end text-body">
              
                Distributed By{" "}
                <a className="border-bottom text-white" href="http://senest.in">
                  SENEST
                </a>
              </div> */}
            </div>
          </div>
        </div>
        {/* Copyright End */}
      </div>
    </Fragment>
  );
};

export default FooterComponent;
