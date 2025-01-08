import React, { Fragment } from "react";

const Banner = (props) => {
  const { title, backgroundImage } = props;

  return (
    <Fragment>
      <div
        className="container-fluid bg-breadcrumb"
        style={{
          backgroundImage: `linear-gradient(rgb(1 184 205), rgba(0, 12, 33, 0.8)), url(${backgroundImage})`,
        }}
      >
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow fadeInDown"
            data-wow-delay="0.1s"
          >
            {title}
          </h4>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
