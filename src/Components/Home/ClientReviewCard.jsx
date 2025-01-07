import React, { Fragment } from "react";

const ClientReviewCard = (props) => {
  const { item } = props;
  return (
    <Fragment>
      <div className="testimonial-item">
        <div className="testimonial-quote">
          <i className="fa fa-quote-right fa-2x" />
        </div>
        <div className="testimonial-inner p-4">
          <img
            src="img/dummyimage.png"
            className="img-fluid"
            alt="travelpact365"
            loading="lazy"
          />
          <div className="ms-4">
            <h4>{item.name}</h4>
            <p>{item.address}</p>
            <div className="d-flex text-primary">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star text-body" />
            </div>
          </div>
        </div>
        <div className="border-top rounded-bottom p-4">
          <p className="mb-0">{item.review}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ClientReviewCard;
