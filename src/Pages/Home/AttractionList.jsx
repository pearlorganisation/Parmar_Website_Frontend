import React, { Fragment, useState, useEffect } from "react";

import AttractionCard from "../../Components/Home/AttractionCard";
const AttractionList = (props) => {
  const { attList, introduction, currencyRate, currRate } = props;

  const [filterAttractions, setFilterAttractions] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    applyFilter();
  }, [searchKey, attList]);

  const applyFilter = () => {
    // Make a copy of attList to avoid modifying the original array
    let updatedList = [...attList];

    // Filter by searchKey (attName)
    if (searchKey !== "") {
      updatedList = updatedList.filter((item) =>
        item.attName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    // Sort by gwtAdultOfferPrice (ascending order: min to max)
    updatedList = updatedList.sort(
      (a, b) => a.gwtAdultOfferPrice - b.gwtAdultOfferPrice
    );

    setFilterAttractions(updatedList);
  };

  return (
    <Fragment>
      {console.log("currencyRatecurrencyRate", currencyRate)}
      <div className="container-fluid categories pb-5">
        <div className="md:px-20 px-10 mb-5 mt-5">
          <input
            type="text"
            placeholder="Search your tour"
            onChange={(e) => setSearchKey(e.target.value)}
            className="block w-full p-2 text-gray-900 border-2 border-[#01b8cc] rounded-xl focus:ring-[#01b8cc] focus:border-[#01b8cc] dark:bg-gray-700 dark:border-[#01b8cc] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#01b8cc] dark:focus:border-[#01b8cc] focus:outline-none focus:ring-2 active:ring-2 active:border-[#01b8cc]"
          />
        </div>
        <div className="container pb-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Our <span className="text-primary">Attractions</span>
            </h1>
            <p className="mb-0">{introduction}</p>
          </div>
        </div>

        <div class="container-fluid categories pb-5">
          <div class="container pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filterAttractions &&
                filterAttractions.slice(0, 8).map((item, index) => (
                  <div className=" mb-2" key={index}>
                    <AttractionCard item={item} currRate={currRate} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AttractionList;
