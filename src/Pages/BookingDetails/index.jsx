import React, { Fragment } from "react";
import Banner from "../../Components/Common/Banner";
import BookingTable from "./BookingTable";
import { useSelector } from "react-redux";
const BookingDetails = () => {
  const loginData = useSelector((state) => state.authData);
  return (
    <Fragment>
      {/* <Banner title="Booking Details" /> */}
      <div className="container-fluid team py-5">
        <div className="container">
          <div>
            {/* profile details */}

            <div>Hello, {loginData?.data?.name}</div>
          </div>
        </div>

        <div className="container py-5">
          <BookingTable />
        </div>
      </div>
    </Fragment>
  );
};

export default BookingDetails;
