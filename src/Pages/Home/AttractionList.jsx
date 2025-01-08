import React, { Fragment, useState, useEffect } from "react";

import AttractionCard from "../../Components/Home/AttractionCard";

const filtersForQuery = [
  {
    title: "Tickets",
    url:"/img/Two Tickets.svg"
  },
  {
    title: "Combos",
    url:"/img/Two Tickets.svg"
  },
  {
    title: "Theme Parks",
    url:"/img/Roller Coaster.svg"
  },
  {
    title: "Tours",
    url:"/img/Tour Guide.svg"
  },
  {
    title: "Zoos",
    url:"/img/Elephant.svg"
  },
  {
    title: "Water Parks",
    url:"/img/Outdoor Swimming Pool.svg"
  },
  {
    title: "Museum",
    url:"/img/Museum.svg"
  },
  {
    title: "Landmarks",
    url:"/img/Frame 603.svg"
  },



];

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
        <div className="md:px-20 px-10 mb-5 mt-5 relative">
          <input
            type="text"
            style={{
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
            placeholder=" Search Your Tour"
            onChange={(e) => setSearchKey(e.target.value)}
            className="block  w-full py-3 px-4 text-gray-900 border-2 placeholder:font-semibold placeholder:text-sm placeholder:text-slate-500  rounded-md focus:ring-[#01b8cc] focus:border-[#01b8cc] dark:bg-gray-700 dark:border-[#01b8cc] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#01b8cc] dark:focus:border-[#01b8cc] focus:outline-none focus:ring-2 active:ring-2 active:border-[#01b8cc]"
          />
          <div className="absolute top-5 flex justify-center px-1">
            <svg
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1795 14.9717L14.2726 12.0647M10.4968 13.6351C11.9147 13.6351 13.2745 13.0719 14.2771 12.0692C15.2797 11.0666 15.843 9.70682 15.843 8.28893C15.843 6.87103 15.2797 5.51121 14.2771 4.50861C13.2745 3.50601 11.9147 2.94275 10.4968 2.94275C9.07892 2.94275 7.7191 3.50601 6.71649 4.50861C5.71389 5.51121 5.15063 6.87103 5.15063 8.28893C5.15063 9.70682 5.71389 11.0666 6.71649 12.0692C7.7191 13.0719 9.07892 13.6351 10.4968 13.6351Z"
                stroke="black"
                stroke-width="0.761088"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

{/* static query filters  */}
<div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-0  justify-between  md:px-20 pb-16">
{
  filtersForQuery.map((el)=>{
    return <div className="border-1  flex py-2 px-3 md:px-3 sm:px-2 hover:scale-105 items-center  hover:border-[#C3F1F5] rounded-md justify-between " style={{boxShadow:"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}}>
        <div className="flex justify-center items-center">
          <img src={el.url} alt="" srcset="" />
        </div>
        <p className="font-sans text-black text-sm md:text-md ">
          {el.title}
        </p>
       </div>
  })
}
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
            <p className="mb-0 text-sm md:text-lg font-serif text-justify md:text-center">{introduction}</p>
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
