import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import ContainerComponent from "./Components/Frames/ContainerComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartDetails } from "./Components/Reducers/cartDataSlice";
import { fetchContantLabels } from "./Components/Reducers/allConstantValues";
import { secretKey } from "./Components/Others/ApiUrls";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import whatesappimage from "./whatsapp.png";
import axios from "axios";
import {
  Attractions,
  Contact,
  Home,
  AttractionDetails,
  Aboutus,
  CombopackList,
  ToursList,
  TourDetails,
  Login,
  ComboDetails,
  BookingDetails,
  CartDetails,
  BookingStatus,
  Register,
  OtpVerification,
  ForgetPassword,
  ResetPassword,
  Privacy,
  TermsAndConditions,
  UserBookingDetails,
  UserProfile,
} from "./Pages";
import { instance } from "./Components/Others/AxiosInstance";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
function App() {
  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const browserIdWithSuffix = `${result.visitorId}-tpackb2c`; // Append travelpackb2b
      // Unique browser ID with suffix

      console.log("Fetched new Browser ID:", browserIdWithSuffix);
      localStorage.setItem("tempIdtpb2cuniqueid", browserIdWithSuffix);

      dispatch(
        fetchCartDetails({
          platformId: 2,
          userType: 3,
          b2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
          secretKey: secretKey,
          tempRef: loginData?.data?.userId
            ? loginData?.data?.userId
            : browserIdWithSuffix,
        })
      );
    };

    getFingerprint();
  }, []);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const loginData = useSelector((state) => state.authData);

  useEffect(() => {
    getTempId();

    getConversionRate();
  }, []);

  const getConversionRate = async () => {
    try {
      const res = await instance.post("getConversionRate", {
        currencyCode: "AED",
      });

      localStorage.setItem("currencytp", JSON.stringify(res.data));
      console.log("isacbsuibcuscbsbcibsiucs============>", res.data);
    } catch (error) {
      console.log(error);

      console.log("isacbsuibcuscbsbcibsiucs============>", error);
    }
  };

  useEffect(() => {
    //  langCode: selectedLang,

    dispatch(
      fetchContantLabels({
        langCode: loginData.language,
      })
    );
  }, [loginData.language]);

  const getTempId = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");

      console.log(response.data.ip);
      const parts = response.data.ip.split(".");
      const lastTwoPartsString = parts.slice(-3).join("");
      console.log(lastTwoPartsString);

      localStorage.setItem("tempIdtpb2cuniqueid", lastTwoPartsString);
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for handling at a higher level
    }
  };

  const PublicRoute = ({ component: Component, ...rest }) => {
    const authToken = loginData?.isLoggedIn;
    if (authToken) {
      return <Navigate to="/" />;
    }
    return <Component {...rest} />;
  };
  const CheckLogin = ({ component: Component, ...rest }) => {
    const authToken = loginData?.isLoggedIn;
    if (!authToken) {
      return <Navigate to="/" />;
    }
    return <Component {...rest} />;
  };

  const test = "production";
  if (test === "production") {
    console.error = () => {};
    console.log = () => {};
    console.warn = () => {};
    console.debug = () => {};
  }
  return (
    <Fragment>
      <div className="hidden md:block">
        <a
          href="https://wa.me/+971529418587"
          style={{
            alignItems: "center",
            bottom: "70px",
            color: "rgb(255, 255, 255)",
            display: "flex",
            right: "20px",
            position: "fixed",
            borderRadius: "50px",
            padding: "10px 20px",
            textDecoration: "none",
            zIndex: "10",
            transition:
              "transform 0.3s ease 0s, -webkit-transform 0.3s ease 0s",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style={{
              height: "50px", // Set a specific height for better sizing
              width: "auto", // Maintain aspect ratio
              maxWidth: "100%", // Ensure responsiveness
            }}
            src={whatesappimage}
            alt="WhatsApp icon"
            className="whatsapp-icon"
            loading="lazy"
          />
        </a>
      </div>
      <Routes>
        <Route path="/" element={<ContainerComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/attraction-list" element={<Attractions />} />
          <Route
            path="/attraction-details/:id"
            element={<AttractionDetails />}
          />
          <Route path="/combopack-list" element={<CombopackList />} />
          <Route path="/combopack-details/:id" element={<ComboDetails />} />
          <Route path="/tourpackages-list" element={<ToursList />} />
          <Route path="/tourpackages-details/:id" element={<TourDetails />} />
          <Route path="/cart-details" element={<CartDetails />} />
          <Route path="/ticket-booking-status" element={<BookingStatus />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/register-user" element={<Register />} />
          <Route path="/otpverification/:id" element={<OtpVerification />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/our-privacy" element={<Privacy />} />
          <Route
            path="/our-termsandconditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/login-user"
            element={<PublicRoute component={Login} />}
          />
          <Route
            path="/user-booking-details"
            element={<CheckLogin component={BookingDetails} />}
          />
        </Route>
      </Routes>
    </Fragment>
  );
}

//203.161.38.98
export default App;
