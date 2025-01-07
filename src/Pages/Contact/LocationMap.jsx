import React, { Fragment } from "react";

const LocationMap = () => {
  return (
    <Fragment>
      <div class="col-12">
        <div class="rounded">
          <iframe
            class="rounded w-100"
            style={{ height: "400px" }}
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d54064.971147155054!2d55.23978206606559!3d25.22532299162411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sapi%20tower%20meeza%20bazar%20bur%20dubai%20dubai%20uae!5e1!3m2!1sen!2sin!4v1728296266562!5m2!1sen!2sin"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

export default LocationMap;

{
  /* <iframe
  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d54064.971147155054!2d55.23978206606559!3d25.22532299162411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sapi%20tower%20meeza%20bazar%20bur%20dubai%20dubai%20uae!5e1!3m2!1sen!2sin!4v1728296266562!5m2!1sen!2sin"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>; */
}
