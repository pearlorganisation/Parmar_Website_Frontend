import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../Reducers/authSlice";
import { CiUser } from "react-icons/ci";
import { FaCartFlatbedSuitcase, FaLanguage } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { GrCurrency } from "react-icons/gr";
import CurrencyMenu from "./CurrencyMenu";
import LanguageMenu from "./LanguageMenu";
import { setCurrency } from "../Reducers/authSlice";
import whatsapp from "../../whatsapp.png";
import { fetchCartDetails } from "../Reducers/cartDataSlice";
import { secretKey } from "../Others/ApiUrls";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loginData = useSelector((state) => state.authData);
  const cartlist = useSelector((state) => state.cartData.data);
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const dispatch = useDispatch();
  console.log("loginData", loginData);

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
  const handleloginbtn = (id) => {
    if (id === "logout-user") {
      dispatch(logout());
      navigate("/");
    }
    if (id === "login-user") {
      navigate("/login-user");
    }
  };

  const handleCartNavigation = () => {
    if (cartlist.length > 0) {
      navigate("/cart-details");
    } else {
      window.alert("No Items In Cart");
    }
  };

  const currentCurrency = useSelector((state) => state.authData);
  const currencyContent = [
    {
      id: 1,
      name: "United Arab Emirates",
      currency: "AED",
      symbol: "د.إ",
      image: "united-arab-emirates.png",
    },
    {
      id: 2,
      name: "United States ",
      currency: "USD",
      symbol: "$",
      image: "united-states.png",
    },
    {
      id: 3,
      name: "India Rupee",
      currency: "INR",
      symbol: "₹",
      image: "india.png",
    },
    {
      id: 4,
      name: "United Kingdom",
      currency: "GBP",
      symbol: "£",
      image: "united-kingdom.png",
    },
    {
      id: 5,
      name: "Euro",
      currency: "EUR",
      symbol: "€",
      image: "european.png",
    },
  ];

  const changeCurrency = (currency) => {
    dispatch(setCurrency(currency));
  };

  const closeMobileMenu = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler && window.innerWidth < 992) {
      navbarToggler.click();
    }
  };

  return (
    <Fragment>
      {/* Topbar Start */}
      <div className="container-fluid topbar  d-none d-xl-block w-100 bg-[#00646f]">
        <div className="container">
          <div className="row gx-0 align-items-center" style={{ height: 45 }}>
            <div className="col-lg-6 text-center text-lg-start mb-lg-0">
              <div className="d-flex flex-wrap">
                <Link href="#" className="text-muted me-4">
                  <i className="fas fa-map-marker-alt text-primary me-2 text-white" />
                  Find A Location
                </Link>
                <Link href="tel:+91 7567992575" className="text-muted me-4">
                  <i className="fas fa-phone-alt text-primary me-2 text-white" />
                  +91 7567992575
                </Link>
                <Link
                  href="mailto:example@gmail.com"
                  className="text-muted me-0"
                >
                  <i className="fas fa-envelope text-primary me-2 text-white" />
                  info@travelpack365.com
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <div className="d-flex align-items-center justify-content-end">
                <div className="border border-white bg-white px-2 cursor-pointer">
                  <a href="https://b2b.travelpack365.com/" target="_blank">
                    B2B Agent Login
                  </a>
                </div>

                <div className="text-white px-5">
                  {loginData?.isLoggedIn === true && (
                    <div className="flex gap-3">
                      <div>Hello, {loginData?.data?.name}</div>
                      {loginData?.data?.userType === "b2b" && (
                        <div className="flex gap-3">
                          <div>Limit: {loginData?.data?.creditLimit}</div>
                          <div>Utilized: {loginData?.data?.creditUtilized}</div>
                          <div>Balance: {loginData?.data?.currentBalance}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar & Hero Start */}
      <div className="container-fluid nav-bar sticky-top px-0 px-lg-4 py-2 py-lg-0 z-[99]">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand p-0">
              <img src="/img/logo.png" alt="Logo" loading="lazy" />
            </Link>

            {/* Cart Icon - Mobile view */}
            <div className="mr-5 mt-[7px] block md:hidden">
              <div onClick={handleCartNavigation}>
                <div className="relative flex items-center cursor-pointer">
                  <FaCartFlatbedSuitcase color="#01b8cc" size={25} />
                  <span
                    className={`${
                      cartlist.length > 99 ? "w-7 h-7 " : "w-5 h-5"
                    } absolute flex items-center justify-center text-sm text-white bg-orange-600 rounded-full left-3 -top-3`}
                  >
                    {cartlist.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mr-5  block md:hidden">
              <div onClick={handleCartNavigation}>
                <div className="relative flex items-center cursor-pointer h-8 w-8">
                  <a
                    href="https://wa.me/+971529418587"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={whatsapp}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <FaBars />
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto py-0">
                <Link
                  to="/"
                  className={`nav-item nav-link ${
                    pathname === "/" && "active"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="about-us"
                  className={`nav-item nav-link ${
                    pathname === "/about-us" && "active"
                  }`}
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link
                  to="attraction-list"
                  className={`nav-item nav-link ${
                    pathname === "/attraction-list" && "active"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Attractions
                </Link>
                <Link
                  to="combopack-list"
                  className={`nav-item nav-link ${
                    pathname === "/combopack-list" && "active"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Combo Packs
                </Link>
                <Link
                  to="tourpackages-list"
                  className={`nav-item nav-link ${
                    pathname === "/tourpackages-list" && "active"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Holiday Pack
                </Link>
                <Link
                  to="contact-us"
                  className={`nav-item nav-link ${
                    pathname === "/contact-us" && "active"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </div>

              {/* Currency Menu - Mobile View */}
              <div className="nav-item nav-link md:hidden dropdown ">
                <a data-bs-toggle="dropdown" aria-expanded="false">
                  Currency
                </a>
                <div className="dropdown-menu m-0">
                  <div className="flex flex-wrap gap-3 p-2">
                    {currencyContent.map((item, index) => (
                      <div
                        className="hover:bg-[#ffc107] hover:text-white cursor-pointer p-1 rounded"
                        key={index}
                        onClick={() => {
                          changeCurrency(item.currency);
                          closeMobileMenu();
                        }}
                      >
                        {item.symbol} - {item.currency}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-2 text-black  md:hidden">
                <a href="https://b2b.travelpack365.com/" target="_blank">
                  B2B Agent Login
                </a>
              </div>

              {/* Login/Profile - Mobile View */}
              {loginData?.isLoggedIn === false ? (
                <button
                  onClick={() => {
                    handleloginbtn("login-user");
                    closeMobileMenu();
                  }}
                  className="btn btn-primary  md:hidden rounded-pill py-2 px-4"
                >
                  Login
                </button>
              ) : (
                <div className="nav-item  md:hidden dropdown">
                  <button
                    className="btn btn-primary rounded-full py-2 px-4 flex items-center gap-2 "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile <CiUser />
                  </button>
                  <div className="dropdown-menu m-0">
                    {/* <Link
                      to="/user-profile"
                      className="dropdown-item"
                      onClick={closeMobileMenu}
                    >
                      View Profile
                    </Link> */}
                    <Link
                      to="/user-booking-details"
                      className="dropdown-item"
                      onClick={closeMobileMenu}
                    >
                      View Profile
                    </Link>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        handleloginbtn("logout-user");
                        closeMobileMenu();
                      }}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}

              {/* Desktop View */}
              <div className="hidden md:flex justify-between items-center">
                <div className="mr-3">
                  <CurrencyMenu />
                </div>
                <div className="mr-2">
                  <LanguageMenu />
                </div>

                <button
                  onClick={handleCartNavigation}
                  className="text-dark relative mx-3"
                >
                  <FaCartFlatbedSuitcase color="#01b8cc" size={25} />
                  <span
                    className={`${
                      cartlist.length > 99 ? "w-7 h-7" : "w-5 h-5"
                    } absolute flex items-center justify-center text-sm text-white bg-orange-600 rounded-full left-3 -top-3`}
                  >
                    {cartlist.length}
                  </span>
                </button>

                {loginData?.isLoggedIn === false ? (
                  <button
                    onClick={() => handleloginbtn("login-user")}
                    className="btn btn-primary rounded-full py-2 px-4"
                  >
                    Login
                  </button>
                ) : (
                  <div className="nav-item dropdown">
                    <button
                      className="btn btn-primary rounded-full py-2 px-4 flex items-center gap-2 "
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile <CiUser />
                    </button>
                    <div className="dropdown-menu m-0">
                      {/* <Link to="/user-profile" className="dropdown-item">
                        View Profile
                      </Link> */}
                      <Link
                        to="/user-booking-details"
                        className="dropdown-item"
                      >
                        View Profile
                      </Link>
                      <a
                        className="dropdown-item"
                        onClick={() => handleloginbtn("logout-user")}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderComponent;
