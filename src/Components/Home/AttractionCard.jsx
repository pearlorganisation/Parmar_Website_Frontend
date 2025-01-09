// import React, { Fragment } from "react";
// import { imageurl } from "../Others/ApiUrls";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AttractionCard = (props) => {
//   const navigate = useNavigate();
//   const { item, currRate } = props;
//   const currentCurrency = useSelector((state) => state.authData);
//   const loginData = useSelector((state) => state.authData);

//   return (
//     <Fragment>
//       <div
//         style={{
//           boxShadow:
//             " rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
//         }}
//         className="cursor-pointer hover:scale-105 h-80 w-60 rounded-t-md overflow-hidden rounded-b-2xl   flex items-center gap-4 flex-col"
//         onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
//       >
//         <img
//           src={imageurl + item?.attGwtThumbnailImage}
//           className="img-fluid w-100 rounded-top min-h-56"
//           alt={item?.attName}
//           loading="lazy"
//         />

//         <div className="px-1  bg-white h-full  flex flex-col justify-start  items-start ">
//           <div className=" ">
//             {" "}
//             <h4 className="font-bold">{item?.attName}</h4>
//           </div>
//           <div className="flex justify-between   ">
//             <div className="text-black  font-black line-through">
//               {currRate
//                 ? (Number(currRate) * Number(item.gwtAdultPrice)).toFixed(2)
//                 : Number(item.gwtAdultPrice).toFixed(2)}

//               {currentCurrency.currency}
//             </div>
//             <div className="text-[#ffc107] font-black">
//               {currRate
//                 ? (
//                     Number(currRate) *
//                     Number(
//                       loginData?.data?.userType === "b2b"
//                         ? item.gwtAdultOfferPrice
//                         : item.gwtB2cAdultPrice
//                     )
//                   ).toFixed(2)
//                 : Number(
//                     loginData?.data?.userType === "b2b"
//                       ? item.gwtAdultOfferPrice
//                       : item.gwtB2cAdultPrice
//                   ).toFixed(2)}

//               <span className="text-base"> {currentCurrency.currency}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default AttractionCard;

import React from "react";
import { imageurl } from "../Others/ApiUrls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AttractionCard = ({ item, currRate }) => {
  const navigate = useNavigate();
  const { data: loginData, currency } = useSelector((state) => state.authData);

  // Calculate prices
  const isB2BUser = loginData?.userType === "b2b";
  const basePrice = Number(item.gwtAdultPrice);
  const offerPrice = Number(
    isB2BUser ? item.gwtAdultOfferPrice : item.gwtB2cAdultPrice
  );
  const conversionRate = currRate || 1;
  const originalPrice = (conversionRate * basePrice).toFixed(2);
  const finalPrice = (conversionRate * offerPrice).toFixed(2);

  return (
    // <div
    //   className="cursor-pointer hover:scale-105 min-h-max w-full rounded-t-md overflow-hidden rounded-b-2xl flex flex-col items-center gap-4"
    //   style={{
    //     boxShadow:
    //       "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
    //   }}
    //   onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
    // >
    //   <img
    //     src={`${imageurl}${item?.attGwtThumbnailImage}`}
    //     className="img-fluid w-100 rounded-top min-h-56 h-56 px-3 py-2"
    //     alt={item?.attName || "Attraction"}
    //     loading="lazy"
    //   />
    //   <div className=" bg-white h-full w-full flex flex-col justify-start items-start">
    //     <h4 className="font-bold px-4 py-1">{item?.attName}</h4>
    //     <div className="flex justify-between w-full px-4 py-2">
    //       <div className="text-black font-black line-through">{`${originalPrice} ${currency}`}</div>
    //       <div className="text-[#ffc107] font-black">
    //         {`${finalPrice} `}
    //         <span className="text-base">{currency}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div
      className="cursor-pointer relative hover:scale-105 w-full min-h-max h-24  rounded-t-md overflow-hidden rounded-b-2xl flex flex-col items-center gap-4"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      }}
      onClick={() => navigate(`/attraction-details/${item?.attUniqueId}`)}
    >
      <img
        src={`${imageurl}${item?.attGwtThumbnailImage}`}
        className="img-fluid w-full rounded-top min-h-56 h-56 px-3 py-2"
        alt={item?.attName || "Attraction"}
        loading="lazy"
      />
      <div className="absolute top-[55%] left-[12%] rounded-full shadow-lg bg-white px-4 py-2">
        <div className="flex flex-row gap-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49398 0.883129C7.62885 0.468027 8.21611 0.468028 8.35098 0.883129L9.84444 5.47952C9.90476 5.66516 10.0778 5.79085 10.2729 5.79085H15.1059C15.5423 5.79085 15.7238 6.34936 15.3707 6.60591L11.4608 9.44664C11.3029 9.56137 11.2368 9.76474 11.2971 9.95038L12.7906 14.5468C12.9254 14.9619 12.4503 15.3071 12.0972 15.0505L8.18731 12.2098C8.02939 12.095 7.81556 12.095 7.65765 12.2098L3.74772 15.0505C3.39462 15.3071 2.91951 14.9619 3.05439 14.5468L4.54785 9.95037C4.60817 9.76474 4.54209 9.56137 4.38417 9.44664L0.474247 6.60591C0.121141 6.34936 0.302614 5.79085 0.739077 5.79085H5.57201C5.76721 5.79085 5.9402 5.66516 6.00052 5.47952L7.49398 0.883129Z"
              fill="#FFB649"
            />
          </svg>

          <h1> 4.5 (37) </h1>
        </div>
      </div>
      <div className="bg-white flex flex-col justify-between h-full w-full px-4 mt-4">
        <h4 className="font-bold">{item?.attName}</h4>

        <h1>
          {" "}
          <span className="text-yellow-700">Rs.19000/-</span> per person
        </h1>

        <div className="flex flex-row gap-2"></div>

        <div className="flex justify-end">
          <div className="flex justify-between w-full py-2">
            <div className="text-black font-black line-through">{`${originalPrice} ${currency}`}</div>
            <div className="text-[#ffc107] font-black">
              {`${finalPrice} `}
              <span className="text-base">{currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
