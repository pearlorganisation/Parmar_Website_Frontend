import React, { Fragment } from "react";

const ContactForm = () => {
  return (
    <Fragment>
      <div className="row g-5">
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
          <div className="row g-5">
            <div className="col-xl-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-secondary p-5 rounded">
                <h4 className="text-primary mb-4">Send Your Message</h4>
                <form>
                  <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input
                          type="phone"
                          className="form-control"
                          id="phone"
                          placeholder="Phone"
                        />
                        <label htmlFor="phone">Your Phone</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="project"
                          placeholder="Project"
                        />
                        <label htmlFor="project">Your Project</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: 160 }}
                          defaultValue={""}
                        />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-light w-100 py-3">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-xl-1 wow fadeInUp" data-wow-delay="0.3s">
              {/* <div className="d-flex flex-xl-column align-items-center justify-content-center">
                <a
                  className="btn btn-xl-square btn-light rounded-circle mb-0 mb-xl-4 me-4 me-xl-0"
                  href
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-xl-square btn-light rounded-circle mb-0 mb-xl-4 me-4 me-xl-0"
                  href
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn btn-xl-square btn-light rounded-circle mb-0 mb-xl-4 me-4 me-xl-0"
                  href
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  className="btn btn-xl-square btn-light rounded-circle mb-0 mb-xl-0 me-0 me-xl-0"
                  href
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div> */}
            </div>
            <div className="col-12 col-xl-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="p-5 bg-light rounded">
                <div className="bg-white rounded p-4 mb-4">
                  <h4 className="mb-3">Head Office</h4>
                  <div className="d-flex align-items-center flex-shrink-0 mb-3">
                    <p className="mb-0 text-dark me-2">Address:</p>
                    <i className="fas fa-map-marker-alt text-primary me-2" />
                    <p className="mb-0">
                      API tower, TIA sarees building, Meena bazar, Bur Dubai,
                      Dubai - UAE
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-dark me-2">Telephone:</p>
                    <i className="fa fa-phone-alt text-primary me-2" />
                    <p className="mb-0"> +971 529418587</p>
                  </div>
                </div>
                <div className="bg-white rounded p-4 mb-4">
                  <h4 className="mb-3">Our Branch</h4>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0 text-dark me-2">Address:</p>
                    <i className="fas fa-map-marker-alt text-primary me-2" />
                    <p className="mb-0">
                      303, Zodics Plaza near Girivar Society near nabard vihar
                      flats, Navrangpura, Ahmedabad-380009
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-dark me-2">Telephone:</p>
                    <i className="fa fa-phone-alt text-primary me-2" />
                    <p className="mb-0"> +91 7567992575</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactForm;
