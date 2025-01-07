import React, { Fragment } from "react";
import Banner from "../../Components/Common/Banner";
import ContactElements from "./ContactElements";
import LocationMap from "./LocationMap";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <Fragment>
      <Banner title="Contact us" />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <ContactElements />

          <div className="py-5">
            <ContactForm />
          </div>
          <div className="py-5">
            <LocationMap />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
