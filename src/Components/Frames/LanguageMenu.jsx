import React, { Fragment, useEffect, useState } from "react";
import { FaCartFlatbedSuitcase, FaLanguage } from "react-icons/fa6";
import { instance } from "../Others/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../Reducers/authSlice";
const LanguageMenu = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.authData);
  const [languageList, setlanguageList] = useState([]);
  useEffect(() => {
    getLanguageList();
  }, []);

  const getLanguageList = async () => {
    try {
      const res = await instance.post("getLanguagesList", { languageId: 0 });
      const tempArr = [];

      tempArr.push(
        {
          errMessage: null,
          langCode: "en",
          langCountry: "United States",
          langName: "English",
          langNameInNaviteLang: "English",
          langStatus: true,
          languageId: 10000,
        },
        ...res.data
      );
      setlanguageList(tempArr);
    } catch (error) {
      console.log(error);
    }
  };

  const findLanguage = languageList?.find(
    (item) => item.langCode === currentLanguage?.language
  );
  const changeLanguage = (language) => {
    dispatch(setLanguage(language));
  };
  return (
    <Fragment>
      <div className="nav-item hidden  md:block dropdown  cursor-pointer">
        <div className="flex">
          <FaLanguage color="#01b8cc" size={25} />
          <div className="text-[13px]">
            {findLanguage?.langNameInNaviteLang}
          </div>
        </div>
        <div className="dropdown-menu m-0">
          <div className="flex flex-wrap gap-3 p-2 w-56">
            {languageList.map((item, index) => (
              <div
                className="hover:bg-[#ffc107] hover:text-white cursor-pointer p-1 rounded"
                key={index}
                onClick={() => changeLanguage(item.langCode)}
              >
                {item.langNameInNaviteLang}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LanguageMenu;
