import React, { Fragment, useEffect } from "react";
import Banner from "../../Components/Common/Banner";
import GenerateTickets from "./GenerateTickets";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartDetails } from "../../Components/Reducers/cartDataSlice";
import { secretKey } from "../../Components/Others/ApiUrls";
const BookingStatus = () => {
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const cartlist = useSelector((state) => state.cartData.data);
  const loginData = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCartDetails({
        platformId: 2,
        userType: 3,
        b2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
        secretKey: secretKey,
        tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
      })
    );
  }, []);

  return (
    <Fragment>
      <Banner title="Booking Status" />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          {cartlist?.length > 0 && (
            <GenerateTickets cartlist={cartlist} loginData={loginData} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BookingStatus;
