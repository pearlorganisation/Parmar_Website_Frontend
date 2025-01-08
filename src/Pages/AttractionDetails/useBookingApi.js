import { useState } from "react";
import { instance, mofInstance } from "../../Components/Others/AxiosInstance";
import { secretKey } from "../../Components/Others/ApiUrls";
const fetchPrice = async ({ value, eventtypeId, attId, attractionTickets }) => {
  console.log("value", value, "eventtypeId", eventtypeId);
  console.log("attId", attId, "attractionTickets", attractionTickets);

  console.log("abxiabxyiybaixvbaiuxab");

  // Exit early if attId is 147
  if (attId === 147) {
    console.log("attId is 147, exiting function");
    return;
  }

  // Exit early if eventtypeId is not null or "0"
  if (eventtypeId !== null && eventtypeId !== "0") {
    console.log("eventtypeId is not null or 0, exiting function");
    return;
  }

  // Find the ticket price for the given value
  const findPrice = attractionTickets.find((item) => item.value === value);
  const tktName = findPrice?.label;
  console.log(findPrice);
  // Set prices based on availability
  const adultPrice = findPrice?.adultAvailCount > 0 ? findPrice?.adultPrice : 0;
  const childPrice = findPrice?.childAvailCount > 0 ? findPrice?.childPrice : 0;

  // Return an object with the prices
  const price = {
    adultPrice,
    childPrice,
    tktName,
  };

  return price;
};

const getburjkhalifaTimeSlot = async ({ date, eventtypeId, resourceID }) => {
  try {
    const res = await instance.post("getBurjTimeSlotWithRates", {
      bookingDate: date,
      eventTypeId: eventtypeId,
      resourceId: resourceID,
      secretKey: secretKey,
    });

    const timeslots = res.data.agentServiceEventsPrice;
    return timeslots;
  } catch (error) {
    return null;
  }
};

const getMofTimeslot = async ({ formetDate, seletedTicketId }) => {
  try {
    const postObject = {
      startDate: formetDate,
      endDate: formetDate,
      accessAreaCode: seletedTicketId == 436 ? "MOTFLC" : "VISA Pioneer",
    };
    const res = await mofInstance.post("getAvailability", postObject);
    console.log(
      "seletedTicketIdseletedTicketIdseletedTicketIdseletedTicketId",
      seletedTicketId
    );
    console.log(res.data);
    if (res.data.errorCode == "200") {
      if (res.data.slotAvailability !== null) {
        //slotAvailability
        if (seletedTicketId == 480) {
          // getmofSelected(res.data.slotAvailability[0]);

          const timeslot = res.data.slotAvailability[0];
          const resdata = {
            timeslot,
          };

          return resdata;
        } else {
          const timeslot = res.data.slotAvailability;
          const resdata = {
            timeslot,
          };
          return resdata;
        }
      }
      return null;
    }
  } catch (error) {
    return null;
  }
};

const fetchPriceforAgents = async ({
  value,
  eventtypeId,
  attId,
  attractionTickets,
  loginData,
}) => {
  console.log("value", value, "eventtypeId", eventtypeId);
  console.log("attId", attId, "attractionTickets", attractionTickets);

  // let adultPrice = 0,
  //   childPrice = 0;
  // Exit early if attId is 147
  if (attId === 147) {
    console.log("attId is 147, exiting function");
    return;
  }

  // Exit early if eventtypeId is not null or "0"
  if (eventtypeId !== null && eventtypeId !== "0") {
    console.log("eventtypeId is not null or 0, exiting function");
    return;
  }

  // Find the ticket price for the given value
  // if (eventtypeId === null || eventtypeId == "0") {
  //   const postObject = {
  //     ticketTypeId: value,
  //     agencyId:
  //       loginData?.data?.userType === "b2b" ? loginData?.data?.userId : 0,
  //     agencyUserId:
  //       loginData?.data?.userType === "b2bagent" ? loginData?.data?.userId : 0,
  //     attractionsId: attId,
  //   };
  //   console.log(JSON.stringify(postObject, null, 2));
  //   await instance
  //     .post("getAttractionTicketTypePrice", postObject)
  //     .then((res) => {
  //       //b2cAdultPrice
  //       console.log("ishvusvcusuvcbs", res.data);

  //       adultPrice =
  //         res.data.errorCode === 505
  //           ? 0
  //           : loginData?.data?.userType === "b2b" ||
  //             loginData?.data?.userType === "b2bagent"
  //           ? res.data.b2bAdultDisPrice == 0
  //             ? res.data.b2bAdultPrice
  //             : res.data.b2bAdultDisPrice
  //           : res.data.b2cAdultPrice;
  //       childPrice =
  //         res.data.errorCode === 504
  //           ? 0
  //           : loginData?.data?.userType === "b2b" ||
  //             loginData?.data?.userType === "b2bagent"
  //           ? res.data.b2bChildDisPrice == 0
  //             ? res.data.b2bChildPrice
  //             : res.data.b2bChildDisPrice
  //           : res.data.b2cChildPrice;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const findPrice = attractionTickets.find((item) => item.value === value);
  const tktName = findPrice?.label;

  const adultPrice = findPrice?.adultAvailCount > 0 ? findPrice?.adultPrice : 0;
  const childPrice = findPrice?.childAvailCount > 0 ? findPrice?.childPrice : 0;

  console.log("findPricefindPrice", findPrice);
  // Return an object with the prices
  const price = {
    adultPrice,
    childPrice,
    tktName,
  };

  return price;
};

export {
  fetchPrice,
  getburjkhalifaTimeSlot,
  getMofTimeslot,
  fetchPriceforAgents,
};
