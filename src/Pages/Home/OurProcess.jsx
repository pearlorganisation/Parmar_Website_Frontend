import React, { Fragment } from "react";

const OurProcess = (props) => {
  const { title1, title2, introduction } = props;
  return (
    <Fragment>
      {/* Car Steps Start */}
      <div className="container-fluid steps py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize text-white mb-3">
              {title1} <span className="text-primary"> {title2}</span>
            </h1>
            <p className="mb-0 text-white">
              {/* Booking tickets online is a simple and convenient process that
              allows you to secure your spot at your favorite attractions
              without any hassle. Follow these steps to easily choose your
              attraction, select the right tickets, and receive your tickets
              instantly. */}
              {introduction}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="wow fadeInUp" data-wow-delay="0.1s">
              <div className="steps-item p-4 mb-4 md:min-h-72">
                <h4 className="text-[#ffc107]">
                  Choose Your Attraction and Tickets
                </h4>
                <p className="mb-0">
                  Start by selecting the attraction you'd like to visit. Browse
                  through the available attractions and choose the one that
                  interests you. After selecting an attraction, pick the ticket
                  type that suits your needs, such as adult, child, or group
                  tickets. Each ticket type may offer different benefits or
                  prices, so choose accordingly.
                </p>
                <div className="setps-number">01.</div>
              </div>
            </div>
            <div className=" wow fadeInUp " data-wow-delay="0.3s">
              <div className="steps-item p-4 mb-4 md:min-h-72">
                <h4> Fill in Your Details</h4>
                <p className="mb-0">
                  Once you've chosen your tickets, you'll be guided to a form
                  where you need to enter your personal details. This includes
                  your name, contact information, and any other required
                  details. Ensure that the information you provide is accurate,
                  as it will be used for ticket confirmation and communication.
                </p>
                <div className="setps-number">02.</div>
              </div>
            </div>
            <div className="wow fadeInUp" data-wow-delay="0.5s">
              <div className="steps-item p-4 mb-4 md:min-h-72">
                <h4>Get Instant Tickets</h4>
                <p className="mb-0">
                  After filling in your details, proceed to the payment section
                  to complete your booking. Once the payment is successful, your
                  tickets will be instantly generated and sent to your email.
                  You can either print your tickets or show the digital version
                  at the attraction entrance for seamless entry.
                </p>
                <div className="setps-number">03.</div>
              </div>
            </div>
          </div>

          {/* <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
              <div className="steps-item p-4 mb-4">
                <h4 className="text-[#ffc107]">
                  Choose Your Attraction and Tickets
                </h4>
                <p className="mb-0">
                  Start by selecting the attraction you'd like to visit. Browse
                  through the available attractions and choose the one that
                  interests you. After selecting an attraction, pick the ticket
                  type that suits your needs, such as adult, child, or group
                  tickets. Each ticket type may offer different benefits or
                  prices, so choose accordingly.
                </p>
                <div className="setps-number">01.</div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
              <div className="steps-item p-4 mb-4">
                <h4> Fill in Your Details</h4>
                <p className="mb-0">
                  Once you've chosen your tickets, you'll be guided to a form
                  where you need to enter your personal details. This includes
                  your name, contact information, and any other required
                  details. Ensure that the information you provide is accurate,
                  as it will be used for ticket confirmation and communication.
                </p>
                <div className="setps-number">02.</div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
              <div className="steps-item p-4 mb-4">
                <h4>Get Instant Tickets</h4>
                <p className="mb-0">
                  After filling in your details, proceed to the payment section
                  to complete your booking. Once the payment is successful, your
                  tickets will be instantly generated and sent to your email.
                  You can either print your tickets or show the digital version
                  at the attraction entrance for seamless entry.
                </p>
                <div className="setps-number">03.</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* Car Steps End */}
    </Fragment>
  );
};

export default OurProcess;
