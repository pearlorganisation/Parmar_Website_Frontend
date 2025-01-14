import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../Components/Common/Banner";
import { useDispatch, useSelector } from "react-redux";
import { fetchComboList } from "../../Components/Reducers/comboListSlice";
import CombopackCard from "./CombopackCard";
import { TextInput } from "../../Components/FormComp";
const CombopackList = () => {
  const dispatch = useDispatch();

  const currentCurrency = useSelector((state) => state.authData);
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));
  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );

  useEffect(() => {
    dispatch(
      fetchComboList({
        attractionId: 1,
        currencyCode: "AED",
        platformId: 1,
      })
    );
  }, [dispatch]);
  const comboList = useSelector((state) => state.comboList.data);
  const comboIsLoading = useSelector((state) => state.comboList.isLoading);
  const [filterComboList, setfilterComboList] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    applyFilter();
    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, [searchKey, comboList, currentCurrency.currency]);

  const applyFilter = () => {
    let updatedList = comboList;

    if (searchKey !== "") {
      updatedList = updatedList.filter((item) =>
        item.comboName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    setfilterComboList(updatedList);
  };

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );
  return (
    <Fragment>
      <Banner title="Combo List" />

      <div className="container-fluid team py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Combo<span className="text-primary">pack</span> Offers
            </h1>
            <p className="mb-0 text-sm md:text-lg font-serif text-justify md:text-center ">
              Unbeatable Combo Pack Offers – Double the Adventure, Double the
              Savings! Enjoy an extraordinary experience with our specially
              curated packages that bring you the best of both worlds at an
              incredible value. Don’t miss out on this opportunity to explore
              more and save more!
            </p>
          </div>

          <div class="container-fluid categories pb-5">
            <div class="container pb-5">
              <div>
                <TextInput
                  placeholder="Search combo pack here"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filterComboList &&
                  filterComboList.map((item, index) => (
                    <div className=" py-2" key={index}>
                      <CombopackCard
                        item={item}
                        currRate={currRate?.convertionRate}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CombopackList;
