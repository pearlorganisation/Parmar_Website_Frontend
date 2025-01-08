import React, { Fragment } from "react";
import ToursCard from "../../Components/Home/ToursCard";

const ToursList = (props) => {
  const { tourList, introduction, currRate } = props;
  return (
    <Fragment>
      {/* Blog Start */}
      <div className="container-fluid blog py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Our<span className="text-primary"> Tour Packages </span>
            </h1>
            <p className="mb-0 ">{introduction}</p>
          </div>

          <div class="container-fluid categories pb-5">
            <div class="container pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {tourList &&
                  tourList.slice(0, 4).map((item, index) => (
                    <div className="mb-2" key={index}>
                      <ToursCard item={item} currRate={currRate} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}
    </Fragment>
  );
};

export default ToursList;
