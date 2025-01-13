import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../Components/Common/Banner";
import ListData from "./ListData";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityList } from "../../Components/Reducers/attListSlice";
import { instance } from "../../Components/Others/AxiosInstance";
import { TextInput, CheckboxInput } from "../../Components/FormComp";
import ListCardMobile from "./ListCardMobile";

const Attractions = () => {
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state) => state.authData);
  const currencyRate = JSON.parse(localStorage.getItem("currencytp"));
  const [currencyPair, setcurrencyPair] = useState(
    `AED${currentCurrency.currency}`
  );

  // Fetch data on component mount
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
    getAttractionCategory();

    setcurrencyPair(`AED${currentCurrency.currency}`);
  }, [dispatch, currentCurrency.currency, currentCurrency.language]);

  // Function to fetch attraction categories
  const getAttractionCategory = async () => {
    try {
      const response = await instance.post("getattractiongrouplist", {
        groupId: 1,
      });
      // const filterArr = response.data?.filter((item) => item.grpName) || [];
      // filterArr.unshift({ attractionGroupId: 0, grpName: "All Attractions" });

      const filterArr =
        response.data?.filter(
          (item) =>
            item.grpName &&
            item.grpName !== "LAGUNA WATERPARK" &&
            item.grpName !== "AIN DUBAI"
        ) || [];
      setAttractionGroup(filterArr);

      console.log("filterArr", filterArr);
    } catch (error) {
      console.log(error);
    }
  };

  const attList = useSelector((state) => state.attList.data);
  const attIsLoading = useSelector((state) => state.attList.isLoading);

  const [filterAttractions, setFilterAttractions] = useState([]);
  const [attractionGroup, setAttractionGroup] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [checkBoxItems, setCheckBoxItems] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (e, item) => {
    const checkboxId = item.attractionGroupId;
    const isChecked = e.target.checked;

    setCheckBoxItems((prevCheckboxes) => {
      if (isChecked) {
        return [...prevCheckboxes, checkboxId];
      } else {
        return prevCheckboxes.filter((id) => id !== checkboxId);
      }
    });
  };

  // Filter attractions based on search key and selected categories
  useEffect(() => {
    applyFilter();
  }, [searchKey, attList, checkBoxItems]);

  const applyFilter = () => {
    let updatedList = [...attList];

    if (searchKey !== "") {
      updatedList = updatedList.filter((item) =>
        item.attName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (checkBoxItems.length) {
      updatedList = updatedList.filter((item) =>
        checkBoxItems.includes(item.attGroup)
      );
    }

    console.log("updatedListupdatedListupdatedList", updatedList);

    updatedList = updatedList.sort(
      (a, b) => a.gwtAdultOfferPrice - b.gwtAdultOfferPrice
    );
    setFilterAttractions(updatedList);
  };

  const currRate = currencyRate?.find(
    (item) => item.currencyPair === currencyPair
  );

  return (
    <Fragment>
      <Banner title="Attractions" />
      <div className="container-fluid contact md:py-5">
        <div className="container py-5">
          <div className="md:flex justify-between gap-5  hidden">
            <div className="w-3/12">
              <div className="rounded border-2 p-1 border-[#1f2e4e]">
                {attractionGroup.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between border-b-2 border-[#1f2e4e] py-3 px-2">
                      <div>{item.grpName}</div>
                      <div>
                        <CheckboxInput
                          checked={checkBoxItems.includes(
                            item.attractionGroupId
                          )}
                          onChange={(e) => handleCheckboxChange(e, item)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-11/12 ">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Search your tour"
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="block w-full p-2 text-gray-900 border-2 border-[#01b8cc] rounded-xl focus:ring-[#01b8cc] focus:border-[#01b8cc] dark:bg-gray-700 dark:border-[#01b8cc] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#01b8cc] dark:focus:border-[#01b8cc] focus:outline-none focus:ring-2 active:ring-2 active:border-[#01b8cc]"
                />
              </div>

              {filterAttractions.length > 0 ? (
                filterAttractions.map((item, index) => (
                  <div key={index}>
                    <ListData item={item} currRate={currRate?.convertionRate} />
                  </div>
                ))
              ) : (
                <p>No attractions found.</p>
              )}
            </div>
          </div>

          <div class="container-fluid categories pb-5">
            <div class="container pb-5">
              <div className="md:flex flex-wrap justify-between">
                <div className="block md:hidden">
                  <div>
                    <TextInput
                      placeholder="Search attraction here"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>
                  {filterAttractions.length > 0 ? (
                    filterAttractions.map((item, index) => (
                      <div key={index}>
                        <ListCardMobile
                          item={item}
                          currRate={currRate?.convertionRate}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No attractions found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Attractions;
