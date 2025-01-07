import React, { Fragment } from "react";
import ComboCard from "../../Components/Home/ComboCard";

const ComboList = (props) => {
  const { comboList, introduction, currRate } = props;

  return (
    <Fragment>
      <div className="container-fluid team py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Combo<span className="text-primary">pack</span> Offers
            </h1>
            <p className="mb-0">{introduction}</p>
          </div>

          <div class="container-fluid categories pb-5">
            <div class="container pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {comboList &&
                  comboList.slice(0, 8).map((item, index) => (
                    <div className="mb-2" key={index}>
                      <ComboCard item={item} currRate={currRate} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </Fragment>
  );
};

export default ComboList;
