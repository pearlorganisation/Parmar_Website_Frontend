import React, { Fragment } from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
const ContactElements = () => {
  return (
    <Fragment>
      <div
        className="text-center mx-auto pb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: 800 }}
      >
        <h1 className="display-5 text-capitalize text-primary mb-3">
          Contact Us
        </h1>
        <p className="mb-0">
          Travel should be like a book. When you’re done reading it, you close
          the cover and remember the story, Travel is my love language.
          Departures, arrivals, hotels, and getting lost ― We love it all.
          {/* <a
            className="text-primary fw-bold"
            href="https://htmlcodex.com/contact-form"
          >
            Download Now
          </a> */}
          .
        </p>
      </div>

      <div className="row g-5">
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
          <div className="row g-5">
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="contact-add-item p-4">
                <div className="contact-icon mb-4">
                  {/* <i className="fas fa-map-marker-alt fa-2x" /> */}
                  <FaLocationDot size={35} />
                </div>
                <div>
                  <h4>Address</h4>
                  <p className="mb-0">Ahmedabad, Gujarat</p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="contact-add-item p-4">
                <div className="contact-icon mb-4">
                  {/* <i className="fas fa-envelope fa-2x" /> */}
                  <IoMdMailUnread size={35} />
                </div>
                <div>
                  <h4>Mail Us</h4>
                  <p className="mb-0">info@travelpack365.com</p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="contact-add-item p-4">
                <div className="contact-icon mb-4">
                  {/* <i className="fa fa-phone-alt fa-2x" /> */}
                  <FaPhone size={35} />
                </div>
                <div>
                  <h4>Telephone</h4>
                  <p className="mb-0"> +91 7567992575</p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="contact-add-item p-4">
                <div className="contact-icon mb-4">
                  {/* <i className="fab fa-firefox-browser fa-2x" /> */}
                  <MdOutlineSupportAgent size={35} />
                </div>
                <div>
                  <h4> info@travelpack365.com </h4>
                  <p className="mb-0"> +91 7567992575</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactElements;
