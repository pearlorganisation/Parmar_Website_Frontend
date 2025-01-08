import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../Components/Common/Banner";
import { useDispatch, useSelector } from "react-redux";
import { fetchToursList } from "../../Components/Reducers/tourListSlice";
import ToursListCard from "./ToursListCard";
import ToursCardMobile from "./ToursCardMobile";
const ToursList = () => {
  const dispatch = useDispatch();

  const currentCurrency = useSelector((state) => state.authData);
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));
  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );

  useEffect(() => {
    dispatch(
      fetchToursList({
        platformId: 2,
        currencyCode: currentCurrency.currency,
        tourStatus: true,
      })
    );

    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, []);

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );
  const tourList = useSelector((state) => state.tourList.data);
  const tourIsLoading = useSelector((state) => state.tourList.isLoading);
  return (
    <Fragment>
      <Banner title="Tour Packages List" />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="md:hidden">
            {!tourIsLoading &&
              tourList.map((item, index) => (
                <div key={index} className="mb-3">
                  <ToursCardMobile
                    item={item}
                    index={index}
                    currRate={currRate?.convertionRate}
                    currentCurrency={currentCurrency}
                  />
                </div>
              ))}
          </div>
          <div className="hidden md:block">
            {!tourIsLoading &&
              tourList.map((item, index) => (
                <div key={index} className="mb-3">
                  <ToursListCard
                    item={item}
                    index={index}
                    currRate={currRate?.convertionRate}
                    currentCurrency={currentCurrency}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ToursList;
