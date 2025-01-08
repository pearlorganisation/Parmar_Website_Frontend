import React, { Fragment } from "react";
import { GrCurrency } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../Reducers/authSlice";
const CurrencyMenu = () => {
  const dispatch = useDispatch();
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
  return (
    <Fragment>
      {console.log("currentCurrency", currentCurrency)}
      <div className="nav-item hidden  md:block dropdown cursor-pointer">
        <div className="flex">
          <GrCurrency color="#01b8cc" size={25} />
          <div className="text-[13px]">{currentCurrency.currency}</div>
        </div>
        <div className="dropdown-menu m-0">
          <div className="flex flex-wrap gap-3 p-2 ">
            {currencyContent.map((item, index) => (
              <div
                className="hover:bg-[#ffc107] hover:text-white cursor-pointer p-1 rounded"
                key={index}
                onClick={() => changeCurrency(item.currency)}
              >
                {item.symbol} - {item.currency}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CurrencyMenu;
