import React, { Fragment } from "react";
import Banner from "../../Components/Common/Banner";
import AboutIntro from "./AboutIntro";
import OurExperience from "./OurExperience";

const Aboutus = () => {
  return (
    <Fragment>
      <Banner title="About Us" />

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <AboutIntro />
        </div>
      </div>
      <OurExperience />
    </Fragment>
  );
};

export default Aboutus;
