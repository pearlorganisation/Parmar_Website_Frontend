import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { keydata } from "../../Components/Reducers/authSlice";
import {
  TextInput,
  SelectInput,
  DateInput,
  TimeSlotButton,
  CountButton,
} from "../../Components/FormComp";
import { useNavigate } from "react-router-dom";
import { instance, mofInstance } from "../../Components/Others/AxiosInstance";
import { secretKey, mofUrl } from "../../Components/Others/ApiUrls";
import { getFingerprint } from "../../Components/Others/getFingerprint";
import { fetchCartDetails } from "../../Components/Reducers/cartDataSlice";
import {
  fetchPrice,
  getburjkhalifaTimeSlot,
  getMofTimeslot,
} from "./useBookingApi";
import MofAddCartModel from "./MofAddCartModel";
import axios from "axios";
import Swal from "sweetalert2";
const AttractionBookingFormForb2cuser = (props) => {
  const {
    attractionTickets,
    attId,
    attractionName,
    currRate,
    currentCurrency,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.authData);
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const xmlRes = keydata();
  // const tempId = getFingerprint();
  const hConfig = {
    headers: {
      "access-Key": xmlRes,
    },
  };
  const [burjTicketTimeSlot, setburjTicketTimeSlot] = useState(null);
  const [burjTicketSelected, setburjTicketSelected] = useState(null);
  const [mofTicketTimeslot, setmofTicketTimeslot] = useState(null);
  const [mofTimeslotSelected, setmofTimeslotSelected] = useState(null);
  const [slotIsLoading, setslotIsLoading] = useState(false);
  const [ticketPrice, setticketPrice] = useState(null);
  const [mofError, setmofError] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectTimeSlotRes, setselectTimeSlotRes] = useState([]);
  const [mofResData, setmofResData] = useState(null);
  const [featureofmeasuemtimeslot, setfeatureofmeasuemtimeslot] = useState();
  const [showMofCartModel, setshowMofCartModel] = useState(false);

  const [formData, setFormData] = useState({
    bookingType: 1,
    firstName: "",
    lastName: "",
    platformId: 2,
    userType: 3,
    eventtypeId: "",
    resourceID: "",
    passengerName: "",
    emailId: "",
    contactNumber: "",
    ticketTypeId: "",
    nofAdult: 0,
    nofChild: 0,
    bookAdultPrice: ticketPrice?.adultPrice,
    bookChildPrice: ticketPrice?.childPrice,
    travelDate: "",
    bookPaymentMode: "1",
    bookTotal: 0,
    bookingAddon: "",
    errorMessage: "",
    nofPassanger: "",
    pickupLocation: "",
    childAvailCount: 0,
    adultAvailCount: 0,
    pickupTime: "",
    transferPrice: "",
    vehicleType: "",
    sharedOrPrivate: "",
    tktName: "",
    secretKey: secretKey,
    eventId: "",
    eventName: "",
    eventTypeId: "",
    resourceId: "",
    startDateTime: "",
    endDateTime: "",
    available: "",
    status: "",
    ticketInventoryType: "", // 1-open ticket, 2-burj khalifa , 3 - MOF
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const selectedBurjTimeSlot = async (timeslot) => {
    console.log(timeslot);
    setticketPrice(null);
    const postObject = {
      agencyId: 0,
      agencyUserId: 0,
      bookB2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
      available: timeslot.available,
      endDateTime: timeslot.endDateTime,
      eventId: timeslot.eventID,
      eventName: timeslot.eventName,
      eventTypeId: timeslot.eventTypeID,
      resourceId: timeslot.resourceID,
      startDateTime: timeslot.startDateTime,
      status: timeslot.status,
      secretKey: secretKey,
      platformId: 2,
    };
    console.log(JSON.stringify(postObject, null, 2));
    try {
      const res = await instance.post("getBurjTicketTypeWithRates", postObject);
      // setFormData((prevData) => ({
      //   ...prevData,

      //   nofAdult: Math.round(res.data.adultPrice) <= 0 ? 0 : formData.nofAdult,
      //   nofChild: Math.round(res.data.childPrice) <= 0 ? 0 : formData.nofChild,
      // }));

      console.log(JSON.stringify(res.data, null, 2));
      setticketPrice({
        adultPrice: Math.round(res.data.adultPrice),
        childPrice: Math.round(res.data.childPrice),
      });

      setFormData((prevData) => ({
        ...prevData,
        bookAdultPrice: Math.round(res.data.adultPrice),
        bookChildPrice: Math.round(res.data.childPrice),
      }));
      setselectTimeSlotRes(res.data);
      setburjTicketSelected(timeslot);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedMofTimeSlot = async (item) => {
    setmofTimeslotSelected(item);
    try {
      const timeSlot =
        item.dateTimeFrom.slice(11, -13) + "-" + item.dateTimeTo.slice(11, -13);

      const postObject = {
        tktid: formData?.ticketTypeId,
        accessAreaCode:
          formData?.ticketTypeId == 436 ? "MOTFLC" : "VISA Pioneer",
        performanceId: item.performanceId,
        // timeSlot:
        //   item.dateTimeFrom.slice(11, -13) + "-" + item.dateTimeTo.slice(11, -13),
      };

      const res = await mofInstance.post("getTicketPrice", postObject);

      console.log("Mof data res", res.data);

      // props.change("mofperformanceId", item.performanceId);
      // props.change("moftimeSlot", timeSlot);
      // props.change(
      //   "accessAreaCode",
      //   seletedTicketId == 436 ? "MOTFLC" : "VISA Pioneer"
      // );

      const adultPrice = res.data.adultPrice;
      const childPrice = res.data.childPrice;

      setticketPrice({
        adultPrice: adultPrice,
        childPrice: childPrice,
      });

      setFormData((prevData) => ({
        ...prevData,
        performanceId: item.performanceId,
        timeSlot: timeSlot,
        accessAreaCode: formData?.ticketTypeId,
        bookAdultPrice: adultPrice,
        bookChildPrice: childPrice,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = async (date) => {
    setburjTicketSelected(null);
    let formetDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    setFormData((prevData) => ({
      ...prevData,
      travelDate: formetDate,
    }));
    //
    if (formData.eventtypeId !== null && formData.eventtypeId !== "0") {
      setslotIsLoading(true);
      setticketPrice({
        adultPrice: "",
        childPrice: "",
      });

      setFormData((prevData) => ({
        ...prevData,
        bookAdultPrice: "",
        bookChildPrice: "",
      }));
      try {
        const timeslot = await getburjkhalifaTimeSlot({
          date: formetDate,
          eventtypeId: formData.eventtypeId,
          resourceID: formData.resourceID,
        });
        setslotIsLoading(false);
        setburjTicketTimeSlot(timeslot);
      } catch (error) {
        console.log(error);
        setslotIsLoading(false);
      }
      return;
    }

    if (attId == 147) {
      setslotIsLoading(true);
      console.log("sivcbsyuvcy8svcsyvc7swvcyvyws ");
      try {
        const resdata = await getMofTimeslot({
          formetDate: formetDate,
          seletedTicketId: formData.ticketTypeId,
        });
        setslotIsLoading(false);
        // if (resdata.data?.slotAvailability) {
        //   setmofTicketTimeslot(resdata.data?.slotAvailability);
        // }
        console.log("-------__>", resdata);

        setmofTicketTimeslot(resdata?.timeslot);

        // const { timeslot } = resdata;

        // console.log(timeslot);
        // setmofTicketTimeslot(timeslot);
      } catch (error) {
        setslotIsLoading(false);
        console.log(error);
      }
    }
  };

  const getTicketPrice = async (event) => {
    const { value, eventtypeId, resourceID } = event;
    setburjTicketSelected(null);
    setmofTimeslotSelected(null);
    setselectTimeSlotRes([]);
    setburjTicketTimeSlot(null);
    setticketPrice(null);
    setFormData((prevData) => ({
      ...prevData,
      tktName: "",
      bookAdultPrice: 0,
      bookChildPrice: 0,
      bookTotal: 0,
      ticketTypeId: value,
      nofAdult: 0,
      nofChild: 0,
      eventtypeId: eventtypeId,
      resourceID: resourceID,
      travelDate: "",
    }));

    try {
      const price = await fetchPrice({
        value: value,
        eventtypeId: eventtypeId,
        attId: attId,
        attractionTickets: attractionTickets,
      });

      if (price) {
        const { adultPrice, childPrice, tktName } = price;

        setticketPrice({
          adultPrice: adultPrice,
          childPrice: childPrice,
        });

        setFormData((prevData) => ({
          ...prevData,
          tktName: tktName,
          bookAdultPrice: adultPrice,
          bookChildPrice: childPrice,
        }));
      }
      return;
    } catch (error) {
      console.error("Error fetching prices:", error);
      return;
    }
  };

  useEffect(() => {
    const total = ticketPrice
      ? ticketPrice.adultPrice * formData.nofAdult +
        ticketPrice.childPrice * formData.nofChild
      : 0;
    setFormData((prevData) => ({ ...prevData, bookTotal: total }));
  }, [ticketPrice, formData.nofAdult, formData.nofChild]);

  const validateForm = () => {
    const newErrors = {};

    if (attId === 147) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
    }
    if (!formData.ticketTypeId)
      newErrors.ticketTypeId = "Please select a ticket type.";
    if (formData.nofAdult <= 0 && formData.nofChild <= 0)
      newErrors.noOfTickets =
        "Please select at least one adult or child ticket.";
    if (!formData.travelDate)
      newErrors.travelDate = "Please select a travel date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  window.dataLayer = window.dataLayer || [];

  const addToCart = async () => {
    if (validateForm()) {
      const findPrice = attractionTickets.find(
        (item) => item.value === formData?.ticketTypeId
      );
      const tktName = findPrice?.label;
      const submitData = {
        ...formData,
        tktName: tktName,

        eventId: selectTimeSlotRes?.eventId,
        eventName: selectTimeSlotRes?.eventName,
        eventTypeId: selectTimeSlotRes?.eventTypeId,
        resourceId: selectTimeSlotRes?.resourceId,
        startDateTime: selectTimeSlotRes?.startDateTime,
        endDateTime: selectTimeSlotRes?.endDateTime,
        available: selectTimeSlotRes?.available,
        status: selectTimeSlotRes?.status,
        adultPrice: selectTimeSlotRes?.adultPrice,
        childPrice: selectTimeSlotRes?.childPrice,
        agentServiceTicketTypes: JSON.stringify(
          selectTimeSlotRes?.agentServiceTicketTypes
        ),
        tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
        b2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
        bookB2bId:
          loginData?.data?.userType === "b2b" && loginData?.data?.userId
            ? loginData?.data?.userId
            : 0,
        attName: attractionName,
        attractionId: attId,
        ticketInventoryType: formData?.resourceID === null ? 1 : 2,
      };
      console.log(`${JSON.stringify(submitData, null, 2)}`);
      // Your booking logic here

      if (attId === 147) {
        const postObjectTemp = {
          // tktid: seletedTicketId,
          firstName: formData?.firstName,
          lastName: formData?.lastName,
          nofAdult: formData?.nofAdult,
          nofChild: formData?.nofChild,
          timeSlot: formData?.timeSlot,
          performanceId: formData?.performanceId,
          accessAreaCode:
            formData.ticketTypeId == 436 ? "MOTFLC" : "VISA Pioneer",
        };
        try {
          const res = await mofInstance.post("addToCart", postObjectTemp);

          console.log(`${JSON.stringify(res.data, null, 2)}`);
          if (res.data.errorCode == "200") {
            console.log(res.data);
            const postObject = {
              parkName: attractionName,
              customerName: "",
              eMail: "",
              contactNumber: "",
              agentId:
                loginData?.data?.userType === "b2b" ||
                loginData?.data?.userType === "b2bagent"
                  ? loginData?.data?.userId
                  : 0,
              agentUserId:
                loginData?.data?.userType === "b2b" ||
                loginData?.data?.userType === "b2bagent"
                  ? loginData?.data?.userId
                  : 0,
              nofAdult: formData?.nofAdult,
              nofChild: formData?.nofChild,
              startDate: formData?.travelDate,
              endDate: formData?.travelDate,
              timeSlot: res.data?.timeSlot,
              shopCartId: res.data.shopCartId,
              totalAmount: res.data.totalAmount,
              performanceId: res.data.performanceId,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              adultShopCartItemId: res.data.adultShopCartItemId,
              childShopCartItemId: res.data.childShopCartItemId,
              agentRefNumber: "",
              accessAreaCode:
                formData.ticketTypeId == 436 ? "MOTFLC" : "VISA Pioneer",
            };

            setmofResData(postObject);
            setshowMofCartModel(true);

            // encryptStorage.setItem("mofForBooking", postObject);

            // console.log(`${JSON.stringify(postObject, null, 2)}`);
            // history.push("/mof-ticket-confirmation");
          } else {
            Swal.fire({
              icon: "error",
              title: res.data.errorCode,
              text: res.data.errorMessage,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await instance.post("setCartInfo", submitData);
          if (window.dataLayer) {
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "add_to_cart",
              ecommerce: {
                currency: "AED",
                value: formData.bookTotal,
                items: [
                  {
                    item_id: attId,
                    item_name: attractionName,
                    item_brand: formData.tktName,
                    price: formData.bookTotal,
                    quantity:
                      Number(formData.nofAdult) + Number(formData.nofChild),
                    // att_id: attId,
                    // att_name: attractionName,
                    // ticket_type: formData.tktName,
                    // ticket_id: formData.ticketTypeId,
                    // total_price: formData.bookTotal,
                    // adult_count: Number(formData.nofAdult),
                    // child_count: Number(formData.nofChild),
                    // total_quantity:
                    //   Number(formData.nofAdult) + Number(formData.nofChild),
                  },
                ],
              },
            });
          } else {
            console.warn("dataLayer is not defined");
          }

          dispatch(
            fetchCartDetails({
              platformId: 2,
              userType: 3,
              b2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
              secretKey: secretKey,
              tempRef: loginData?.data?.userId
                ? loginData?.data?.userId
                : tempId,
            })
          );
          // navigate("/cart-details");

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Your Item Added To Cart",
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("Form has errors, do not proceed");
    }
  };

  const onCloseModel = () => {
    setshowMofCartModel(false);
  };

  async function postApi(leadPassenger, payload) {
    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "AED",
          value: payload?.price,

          items: [payload],
        },
      });
    } else {
      console.warn("dataLayer is not defined");
    }
    const envId = attId == 45 ? 21457 : 54154;
    const tempBookObject = {
      agencyId:
        loginData?.data?.userType === "b2b" && loginData?.data?.userId
          ? loginData?.data?.userId
          : "",
      bookB2bId:
        loginData?.data?.userType === "b2b" && loginData?.data?.userId
          ? loginData?.data?.userId
          : "",
      bookB2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
      platformId: 2,
      envId: envId,
      bookCustomerName: leadPassenger.firstname,
      customerLastName: leadPassenger.lastname,
      bookCustomerEmail: leadPassenger.email,
      bookMobileNumber: leadPassenger.contact,
      bookTotal:parseInt(payload.price),
    };
    const postObject = {
      agencyId:
        loginData?.data?.userType === "b2b" && loginData?.data?.userId
          ? loginData?.data?.userId
          : "",
      bookB2bId:
        loginData?.data?.userType === "b2b" && loginData?.data?.userId
          ? loginData?.data?.userId
          : "",
      paymentB2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
      platformId: 2,
      envId: envId,
      paymentRemarks: leadPassenger?.firstname || "First Name",
      paymentAmount: parseInt(payload?.price) || 0,
      secretKey: secretKey,
      tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
      temporaryBookingDto: tempBookObject,
      successUrl: `https://www.travelpack365.com/ticket-booking-status/`,
      failureUrl: `https://www.travelpack365.com/ticket-booking-status/`,
    };

    try {
      const response = await instance.post(
        "/setNetworkPaymentsDetailTvlPack",
        postObject
      );

      console.log(response.data);
      //  setisLoading(false);
      if (response.data.paymentUrl) {
        window.location.replace(response.data.paymentUrl);
      }
    } catch (error) {
      console.log(error);
      //  setisLoading(false);
    }
  }
  

  const openLeaderPassengerModal = () => {
    Swal.fire({
      title: 'Passenger Details',
      html: `
     <style>
  .modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    font-size: 16px; /* Base font size for desktop and tablet */
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px; /* Prevents zoom on mobile */
  }
  .submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }
  @media (max-width: 480px) {
    .modal-content {
      width: 95%;
      padding: 15px;
      font-size: 14px; /* Smaller font size for mobile */
    }
    .form-input {
      font-size: 14px; /* Smaller font size for mobile inputs */
    }
    .submit-btn {
      font-size: 14px; /* Smaller font size for mobile button */
    }
  }
  @media (min-width: 1024px) {
    .modal-content {
      font-size: 18px; /* Larger font size for desktop */
    }
    .form-input {
      font-size: 18px; /* Larger font size for desktop inputs */
    }
    .submit-btn {
      font-size: 18px; /* Larger font size for desktop button */
    }
  }
</style>
      <div class="modal-content">
        <form id="leaderPassengerForm">
          <div class="form-group">
            <label for="firstName" class="form-label">First Name:</label>
            <input type="text" id="firstName" name="firstName" required class="form-input">
          </div>
          <div class="form-group">
            <label for="lastName" class="form-label">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required class="form-input">
          </div>
          <div class="form-group">
            <label for="phoneNumber" class="form-label">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required class="form-input">
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" required class="form-input">
          </div>
        </form>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        // Retrieve the values from the input fields
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
    
        // Validation before closing the modal
        if (!firstName || !lastName || !email || !phoneNumber) {
          Swal.showValidationMessage("All fields are required!");
          return false; // Prevent modal from closing
        }
    
        return { firstName, lastName, email, phoneNumber }; // Pass data to `.then()` block
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Process the confirmed data
        const passengerDetails = result.value; // Data returned from preConfirm
        console.log("Passenger Details:", passengerDetails);
    
        const tempga4data = {
          item_id: attId,
          item_name: attractionName,
          price: currRate
            ? (Number(currRate) * Number(formData.bookTotal)).toFixed(2)
            : Number(formData.bookTotal).toFixed(2),
          quantity: Number(formData.nofAdult) + Number(formData.nofChild),
        };
    
        // alert(`Passenger Details: ${JSON.stringify(passengerDetails)}`);
        postApi(passengerDetails, tempga4data)
        // Swal.fire('Success!', 'Details saved successfully.', 'success');
      } else {
        console.log("Modal dismissed");
      }
    });
    
  };

  function handleCheckout() {
    if((Number(formData.nofAdult) +Number(formData.nofChild)) > 0 && (formData.travelDate != ""))
        openLeaderPassengerModal();
   
  }

  const isResourceOrAttIdMatched =
    (formData?.resourceID != null && formData?.resourceID != 0) || attId == 147;

  return (
    <Fragment>
      {showMofCartModel === true && (
        <MofAddCartModel mofData={mofResData} onCloseModel={onCloseModel} />
      )}
      <div className="p-3 ">
        <div className="font-bold border-b-2 border-gray-200 mb-3">
          <h3 className="text-xl md:text-3xl text-capitalize ">
            Book<span className="text-primary"> Here </span>
          </h3>
        </div>

        {attId === 147 && (
          <div className="flex gap-2 w-full">
            <div className="form-group">
              <TextInput
                name="firstName"
                label="First Name"
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <TextInput
                name="lastName"
                label="Last Name"
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName}</span>
              )}
            </div>
          </div>
        )}

        <div className="form-group">
          <SelectInput
            label="Select Ticket"
            options={attractionTickets}
            onChange={(e) => getTicketPrice(e)}
          />
          {errors.ticketTypeId && (
            <span className="text-red-500">{errors.ticketTypeId}</span>
          )}
        </div>

        <div className="mt-3 ">
          <CountButton
            label="Adult"
            name="nofAdult"
            value={formData.nofAdult}
            onChange={handleChange}
            disabled={
              formData?.resourceID === null &&
              attId !== 147 &&
              ticketPrice?.adultPrice === 0
            }
          />

          {isResourceOrAttIdMatched
            ? ticketPrice && (
                <div className="text-[#1f2e4e]">
                  {currRate
                    ? (
                        Number(currRate) * Number(ticketPrice.adultPrice)
                      ).toFixed(2)
                    : Number(ticketPrice.adultPrice).toFixed(2)}{" "}
                  {currentCurrency?.currency}
                </div>
              )
            : ticketPrice &&
              (ticketPrice.adultPrice == 0 ? (
                <span className="text-[10px] text-red-500">
                  Ticket Not Available
                </span>
              ) : (
                <div className="text-[#1f2e4e]">
                  {currRate
                    ? (
                        Number(currRate) * Number(ticketPrice.adultPrice)
                      ).toFixed(2)
                    : Number(ticketPrice.adultPrice).toFixed(2)}{" "}
                  {currentCurrency?.currency}
                </div>
              ))}
        </div>
        <hr className="solid"></hr>
        <div className="mt-3">
          <CountButton
            label="Child"
            name="nofChild"
            value={formData.nofChild}
            onChange={handleChange}
            disabled={
              formData?.resourceID === null &&
              attId !== 147 &&
              ticketPrice?.childPrice === 0
            }
          />
          {isResourceOrAttIdMatched
            ? ticketPrice && (
                <div className="text-[#1f2e4e]">
                  {currRate
                    ? (
                        Number(currRate) * Number(ticketPrice.childPrice)
                      ).toFixed(2)
                    : Number(ticketPrice.childPrice).toFixed(2)}{" "}
                  {currentCurrency?.currency}
                </div>
              )
            : ticketPrice &&
              (ticketPrice.childPrice == 0 ? (
                <span className="text-[10px] text-red-500">
                  Ticket Not Available
                </span>
              ) : (
                <div className="text-[#1f2e4e]">
                  {currRate
                    ? (
                        Number(currRate) * Number(ticketPrice.childPrice)
                      ).toFixed(2)
                    : Number(ticketPrice.childPrice).toFixed(2)}{" "}
                  {currentCurrency?.currency}
                </div>
              ))}
        </div>
        <hr className="solid"></hr>

        <div className="form-group w-full">
          <DateInput
            label="Select Date"
            minDate={new Date()}
            selectedDate={formData.travelDate}
            handleDateChange={handleDateChange}
          />
          {errors.travelDate && (
            <span className="text-red-500">{errors.travelDate}</span>
          )}
        </div>
        {slotIsLoading && <div>Loading Please Wait</div>}
        {mofError !== null && mofError}

        {burjTicketTimeSlot !== null && (
          <div className="flex flex-wrap justify-between">
            {burjTicketTimeSlot.map((item, index) => (
              <div key={index}>
                <TimeSlotButton
                  name={
                    item.startDateTime.slice(11, -3) +
                    "-" +
                    item.endDateTime.slice(11, -3) +
                    "(" +
                    item.available +
                    ")"
                  }
                  isSeleted={
                    item.eventID == burjTicketSelected?.eventID ? true : false
                  }
                  onClick={() => selectedBurjTimeSlot(item)} // Wrap in an arrow function
                />
              </div>
            ))}
          </div>
        )}

        {mofTicketTimeslot !== null && (
          <div className="flex flex-wrap justify-between">
            {mofTicketTimeslot.length > 0 ? (
              mofTicketTimeslot.map((item, index) => (
                <div key={index}>
                  <TimeSlotButton
                    name={
                      item.dateTimeFrom.slice(11, -13) +
                      "-" +
                      item.dateTimeTo.slice(11, -13)
                    }
                    isSeleted={
                      item.performanceId == mofTimeslotSelected?.performanceId
                        ? true
                        : false
                    }
                    onClick={() => selectedMofTimeSlot(item)}
                  />
                </div>
              ))
            ) : (
              <div>No Time Slot Available</div>
            )}
          </div>
        )}

        <h3 className="text-xl md:text-3xl text-capitalize font-bold ">
          Total :
          <span className="text-primary">
            {" "}
            {currRate
              ? (Number(currRate) * Number(formData.bookTotal)).toFixed(2)
              : Number(formData.bookTotal).toFixed(2)}{" "}
            {currentCurrency?.currency}{" "}
          </span>
        </h3>

        <div className="flex flex-row justify-between mt-5">
          <button
            className="btn btn-primary rounded "
            onClick={() => {
              handleCheckout();
            }}
            // disabled={Object.keys(errors).length > 0}
          >
            Checkout
          </button>

          <button
            className="btn btn-primary rounded "
            onClick={() => addToCart("cart")}
            // disabled={Object.keys(errors).length > 0}
          >
            Add to cart
          </button>
        </div>

        {/* <div className="flex justify-end mt-5">
          <div>
            <button
              className="btn btn-primary rounded "
              onClick={() => addToCart("cart")}
              // disabled={Object.keys(errors).length > 0}
            >
              Add to cart
            </button>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};

export default AttractionBookingFormForb2cuser;
