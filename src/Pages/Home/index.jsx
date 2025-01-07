import React, { Fragment, useEffect, useState } from "react";
import Herosection from "./Herosection";
import AttractionCard from "../../Components/Home/AttractionCard";
import ToursList from "./ToursList";
import AttractionList from "./AttractionList";
import { fetchActivityList } from "../../Components/Reducers/attListSlice";
import { fetchToursList } from "../../Components/Reducers/tourListSlice";
import { useDispatch, useSelector } from "react-redux";
import OurProcess from "./OurProcess";
import { fetchComboList } from "../../Components/Reducers/comboListSlice";
import ComboList from "./ComboList";
import ClientReview from "./ClientReview";
import FilterAttractions from "./FilterAttractions";
import HeroSection2 from "./HeroSection2";

const Home = () => {
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));

  const dispatch = useDispatch();
  const currentCurrency = useSelector((state) => state.authData);

  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );
  useEffect(() => {
    dispatch(
      fetchActivityList({
        attractionId: 1,
        agencyId: 0,
        agencyUserId: 0,
        currencyCode: currentCurrency.currency,
        platformId: 2,
        langCode: currentCurrency.language,
      })
    );

    dispatch(
      fetchToursList({
        platformId: 2,
        currencyCode: currentCurrency.currency,
        tourStatus: true,
        langCode: currentCurrency.language,
      })
    );

    dispatch(
      fetchComboList({
        attractionId: 1,
        currencyCode: currentCurrency.currency,
        platformId: 1,
        langCode: currentCurrency.language,
      })
    );

    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, [dispatch, currentCurrency.currency, currentCurrency.language]);

  const attList = useSelector((state) => state.attList.data);
  const attIsLoading = useSelector((state) => state.attList.isLoading);

  const tourList = useSelector((state) => state.tourList.data);
  const tourIsLoading = useSelector((state) => state.tourList.isLoading);

  const comboList = useSelector((state) => state.comboList.data);
  const comboIsLoading = useSelector((state) => state.comboList.isLoading);

  const constentValues = useSelector((state) => state.constandvalues.data);

  const getLabelData = (code) => {
    const labelValue = constentValues?.find((item) => item.textId == code);
    return labelValue?.langText;
  };

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );

  console.log("currRate", currRate);
  return (
    <Fragment>
      <div className="relative">
        {/* <Herosection /> */}
        <HeroSection2 />
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center w-full px-4">
          <div className="w-full md:px-44"></div>
        </div>
      </div>

      {!attIsLoading && (
        <AttractionList
          attList={attList}
          introduction={getLabelData(104)}
          currRate={currRate?.convertionRate}
        />
      )}
      {!tourIsLoading && (
        <ToursList
          tourList={tourList}
          introduction={getLabelData(106)}
          currRate={currRate?.convertionRate}
        />
      )}
      <OurProcess
        title1={getLabelData(233)}
        title2={getLabelData(234)}
        introduction={getLabelData(235)}
      />
      {!comboIsLoading && (
        <ComboList
          comboList={comboList}
          introduction={getLabelData(110)}
          currRate={currRate?.convertionRate}
        />
      )}

      <ClientReview
        title={getLabelData(233)}
        introduction={getLabelData(140)}
      />
    </Fragment>
  );
};

export default Home;
