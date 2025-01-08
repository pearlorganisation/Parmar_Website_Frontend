import React, { Fragment, useState, useEffect } from "react";
import { DateInput, TextInput, CountButton } from "../../Components/FormComp";
import { useSelector, useDispatch } from "react-redux";
import { secretKey } from "../../Components/Others/ApiUrls";
import { instance } from "../../Components/Others/AxiosInstance";
import { keydata } from "../../Components/Reducers/authSlice";
import { fetchCartDetails } from "../../Components/Reducers/cartDataSlice";
import Swal from "sweetalert2";
const ComboBookingForm = ({
  attName,
  comboOfferId,
  adultPrice,
  childPrice,
  currRate,
  currentCurrency,
}) => {
  const loginData = useSelector((state) => state.authData);
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const dispatch = useDispatch();
  const xmlRes = keydata();
  const hConfig = {
    headers: {
      "access-Key": xmlRes,
    },
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userType: 3,
    platformId: 2,
    attName: attName,
    tktName: attName,
    bookingType: 2,
    comboOfferId: comboOfferId,
    superAdminId: 0,
    bookCustomerName: "",
    bookMobileNumber: "",
    bookCustomerEmail: "",
    bookPaymentMode: 1,
    bookTravellDate: "",
    bookTotal: "",
    bookAdultPrice: adultPrice,
    bookChildprice: childPrice,
    bookNofAdult: 0,
    bookNofChild: 0,
    b2cId: loginData?.data?.userId,
    apiTicket: "false",
    bookedByBackOffice: "false",
    secretKey: secretKey,
    errorMessage: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    console.log("ivuyvuyvuvuv", date);
    let formetDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    console.log("kbibjbjb", formetDate);

    setFormData((prevData) => ({
      ...prevData,
      bookTravellDate: formetDate,
    }));
  };
  useEffect(() => {
    const calculateTotal = () => {
      const total =
        formData.bookAdultPrice * formData.bookNofAdult +
        formData.bookChildprice * formData.bookNofChild;

      setFormData((prevData) => ({
        ...prevData,
        bookTotal: total,
      }));
    };
    calculateTotal();
  }, [adultPrice, childPrice, formData.bookNofAdult, formData.bookNofChild]);

  const validateForm = () => {
    const newErrors = {};

    if (formData.bookNofAdult <= 0 && formData.bookNofChild <= 0)
      newErrors.bookNofAdult =
        "Please select at least one adult or child ticket.";
    if (!formData.bookTravellDate)
      newErrors.bookTravellDate = "Please select a travel date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const postToApi = async () => {
    console.log("formDataformData", formData);

    console.log("hConfig", hConfig);

    const postObject = {
      ...formData,
      nofAdult: formData.bookNofAdult,
      nofChild: formData.bookNofChild,
      travelDate: formData.bookTravellDate,
    };
    if (validateForm()) {
      try {
        const response = await instance.post(
          "setCartInfo",
          postObject,
          hConfig
        );

        dispatch(
          fetchCartDetails({
            platformId: 2,
            userType: 3,
            b2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
            secretKey: secretKey,
            tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
          })
        );

        Swal.fire({
          icon: "sucess",
          title: "Sucess",
          text: "Your Item Added To Cart",
        });

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      // if (loginData.isLoggedIn === true) {
      //   if (loginData?.data?.userType === "b2c") {
      //     Swal.fire("Error", "Now Only Available For Agent Booking", "error");
      //   } else {
      //     try {
      //       const response = await instance.post(
      //         "setComboBooking",
      //         formData,
      //         hConfig
      //       );
      //       console.log(response);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // } else {
      //   Swal.fire("Error", "Please Login Before Booking", "error");
      // }
    }
  };
  return (
    <Fragment>
      <div>
        <div className="">
          <div className="font-bold border-b-2 border-gray-200 mb-3">
            <h3 className="text-3xl text-capitalize ">
              Book<span className="text-primary"> Here</span>
            </h3>
          </div>
          <div>
            <div>
              <TextInput
                label="Passenger Name"
                placeholder="Name *"
                name="bookCustomerName"
                value={formData.bookCustomerName}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                label="Email"
                placeholder="Email *"
                name="bookCustomerEmail"
                value={formData.bookCustomerEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                label="Contact Number"
                placeholder="Contact *"
                name="bookMobileNumber"
                value={formData.bookMobileNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mt-3 ">
              <CountButton
                label="Adult"
                name="bookNofAdult"
                value={formData.bookNofAdult}
                onChange={handleChange}
                // disabled={ticketPrice?.adultPrice === 0}
              />
              <div className="text-[#1f2e4e] font-extrabold">
                {currRate
                  ? (Number(currRate) * Number(adultPrice)).toFixed(2)
                  : Number(adultPrice).toFixed(2)}

                <span className="text-gray-600 font-normal text-[13px]">
                  {" "}
                  {currentCurrency?.currency}
                </span>
              </div>
            </div>
            <hr className="solid"></hr>
            <div className="mt-3">
              <CountButton
                label="Child"
                name="bookNofChild"
                value={formData.bookNofChild}
                onChange={handleChange}
              />
              <div className="text-[#1f2e4e] font-extrabold">
                {currRate
                  ? (Number(currRate) * Number(childPrice)).toFixed(2)
                  : Number(childPrice).toFixed(2)}

                <span className="text-gray-600 font-normal text-[13px]">
                  {" "}
                  {currentCurrency?.currency}
                </span>
              </div>
            </div>

            {errors.bookNofAdult && (
              <span className="text-red-500">{errors.bookNofAdult}</span>
            )}
            <hr className="solid"></hr>

            <div>
              <DateInput
                label="Select Date"
                minDate={new Date()}
                selectedDate={formData.bookTravellDate}
                handleDateChange={handleDateChange}
              />
              {errors.bookTravellDate && (
                <span className="text-red-500">{errors.bookTravellDate}</span>
              )}
            </div>

            <h3 className="text-xl md:text-3xl text-capitalize font-bold ">
              Total :
              <span className="text-primary">
                {" "}
                {currRate
                  ? (Number(currRate) * Number(formData.bookTotal)).toFixed(2)
                  : Number(formData.bookTotal).toFixed(2)}
                <span className="text-[10px]">
                  {" "}
                  {currentCurrency?.currency}{" "}
                </span>
              </span>
            </h3>
            <div>
              <div className="flex justify-end mt-3">
                <button
                  className="btn btn-primary rounded "
                  onClick={() => postToApi()}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ComboBookingForm;
