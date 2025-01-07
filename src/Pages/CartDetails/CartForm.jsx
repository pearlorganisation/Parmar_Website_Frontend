import React, { Fragment, useState } from "react";
import { TextInput, RadioInput } from "../../Components/FormComp";
import { instance } from "../../Components/Others/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { secretKey } from "../../Components/Others/ApiUrls";
import { keydata } from "../../Components/Reducers/authSlice";
import { fetchCartDetails } from "../../Components/Reducers/cartDataSlice";
const CartForm = (props) => {
  //setNetworkPaymentsDetail

  const dispatch = useDispatch();
  const { cartlist } = props;
  const loginData = useSelector((state) => state.authData);
  const finalAmount = cartlist.reduce((sum, item) => sum + item.bookTotal, 0);
  const xmlRes = keydata();
  const hConfig = {
    headers: {
      "access-Key": xmlRes,
    },
  };

  console.log("loginData", loginData);
  const [formData, setFormData] = useState({
    gender: "Mr",
    fName: "",
    lName: "",
    eMail: "",
    contact: "",
  });
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const [formDataError, setformDataError] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const genterOption = [
    { name: "Mr", value: "Mr" },
    { name: "Miss", value: "Miss" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [selectedOption, setSelectedOption] = useState("1");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const formDataValidation = () => {
    const newErrors = {};

    if (!formData.fName) {
      newErrors.fName = "Required";
    }

    if (!formData.lName) {
      newErrors.lName = "Required";
    }

    if (!formData.eMail) {
      newErrors.eMail = "Required";
    }

    if (!formData.contact) {
      newErrors.contact = "Required";
    }

    setformDataError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  window.dataLayer = window.dataLayer || [];
  const postToApi = async () => {
    console.log(selectedOption);
    if (formDataValidation()) {
      setisLoading(true);
      const tempga4data = cartlist.map((item) => ({
        item_id: item.attractionId,
        item_name: item.attName,
        price: item.bookTotal,
        quantity: Number(item.nofAdult) + Number(item.nofChild),
        // att_id: item.attractionId,
        // att_name: item.attName,
        // ticket_type: item.tktName,
        // adult_count: Number(item.nofAdult),
        // child_count: Number(item.nofChild),
        // ticket_id: item.ticketTypeId,
        // total_price: item.bookTotal,
        // total_quantity: Number(item.nofAdult) + Number(item.nofChild),
      }));

      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
          event: "begin_checkout",
          ecommerce: {
            currency: "AED",
            value: finalAmount,

            items: tempga4data,
          },
        });
      } else {
        console.warn("dataLayer is not defined");
      }

      // Check if all attractionIds are 45 or not
      const isAllAttractionId45 = cartlist.every(
        (item) => item.attractionId === 45
      );
      const envId = isAllAttractionId45 ? 21457 : 54154;
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
        bookCustomerName: `${formData.gender + "." + formData.fName}`,

        customerLastName: formData.lName,
        bookCustomerEmail: formData.eMail,
        bookMobileNumber: formData.contact,
        bookTotal: finalAmount,
      };

      //54154 for production 21457 for test
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
        paymentRemarks: formData.fName,
        paymentAmount: finalAmount,
        secretKey: secretKey,
        tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
        temporaryBookingDto: tempBookObject,
        successUrl: `https://www.travelpack365.com/ticket-booking-status/`,
        failureUrl: `https://www.travelpack365.com/ticket-booking-status/`,

        // successUrl: `http://127.0.0.1:5173/ticket-booking-status/`,
        // failureUrl: `http://127.0.0.1:5173/ticket-booking-status/`,

        // successUrl: `http://127.0.0.1:5173/bookingstatus/`,
        // failureUrl: `http://127.0.0.1:5173/bookingstatus/`,
        // successUrl: `https://parmartours.com /payment-status/shduscuys`,
        // failureUrl: `https://parmartours.com /payment-status/shduscuys`,    setNetworkPaymentsDetail
      };

      //setBookingB2BTravelPack

      console.log(`${JSON.stringify(postObject, null, 2)}`);

      try {
        const response = await instance.post(
          "/setNetworkPaymentsDetailTvlPack",
          postObject
        );

        console.log(response.data);
        setisLoading(false);
        if (response.data.paymentUrl) {
          window.location.replace(response.data.paymentUrl);
        }
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    }
  };

  const deleteCartData = async () => {
    let delId = cartlist.map((item) => item.cartInfoId);

    const deleteData = {
      cartInfo: delId,
      secretKey: secretKey,
    };

    try {
      const res = await instance.post("deleteCartInfo", deleteData, hConfig);
      dispatch(
        fetchCartDetails({
          platformId: 2,
          userType: 3,
          b2cId: loginData?.data?.userId ? loginData?.data?.userId : 0,
          secretKey: secretKey,
          tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
        })
      );
      // console.log("Cart items deleted successfully", res.data);
    } catch (error) {
      // console.error("Error deleting cart items", error);
    }
  };
  const openPdfUrl = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  function download_file(fileURL, fileName) {
    // for non-IE
    // console.log("pdf url", fileURL);

    // console.log("pdf", fileName);
    if (!window.ActiveXObject) {
      var save = document.createElement("a");
      save.href = fileURL;
      save.target = "_blank";
      var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
      save.download = fileName || filename;
      if (
        navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
        navigator.userAgent.search("Chrome") < 0
      ) {
        document.location = save.href;
        // window event not working here
      } else {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }

    // for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, "_blank");
      _window.document.close();
      _window.document.execCommand("SaveAs", true, fileName || fileURL);
      _window.close();
    }

    // setTimeout(function () {
    //   navigate("/");
    // }, 5000);
  }

  return (
    <Fragment>
      <div className="border-[#01b8cc] border-1 rounded  mb-5">
        <div className="bg-gray-200 rounded-t-lg">
          <h3 className="text-3xl text-capitalize p-3">
            Lead Passenger<span className="text-primary"> Details</span>
          </h3>
        </div>
        <div className="p-3">
          <div className="md:flex md:flex-wrap gap-x-4">
            <div className="md:w-[calc(50%-8px)] w-full mb-4">
              <TextInput
                label="First Name"
                placeholder="First Name"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
              />
              {formDataError.fName && (
                <span className="text-red-500">{formDataError.fName}</span>
              )}
            </div>
            <div className="md:w-[calc(50%-8px)] w-full mb-4">
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
              />
              {formDataError.lName && (
                <span className="text-red-500">{formDataError.lName}</span>
              )}
            </div>
            <div className="md:w-[calc(50%-8px)] w-full mb-4">
              <TextInput
                label="E-mail"
                placeholder="E-mail"
                name="eMail"
                value={formData.eMail}
                onChange={handleChange}
              />
              {formDataError.eMail && (
                <span className="text-red-500">{formDataError.eMail}</span>
              )}
            </div>
            <div className="md:w-[calc(50%-8px)] w-full mb-4">
              <TextInput
                label="Contact Number"
                placeholder="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              {formDataError.contact && (
                <span className="text-red-500">{formDataError.contact}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-[#01b8cc] border-1 rounded p-3 space-y-5 mb-5">
        {loginData?.data?.userType === "b2b" && (
          <>
            <div
              className={`md:flex justify-between space-x-7  ${
                selectedOption === "1" && "bg-green-600 text-white rounded"
              }`}
            >
              <div>
                <RadioInput
                  label="Credit/Debit Card"
                  value="1"
                  name="paymentType"
                  onChange={handleRadioChange}
                  checked={selectedOption === "1"}
                />
              </div>
              <div>
                You will redirect to Networkpayment , Fill card details and make
                payment then you will get ticket in pdf format
              </div>
            </div>

            <div
              className={`md:flex justify-between space-x-12  ${
                selectedOption === "2" && "bg-green-600 text-white rounded"
              }`}
            >
              <div>
                <RadioInput
                  label="Agent Credit"
                  value="2"
                  name="paymentType"
                  onChange={handleRadioChange}
                  checked={selectedOption === "2"}
                />
              </div>
              <div>
                This only for registerd agents , if you want to become agent,
                contact our executive +971 529418587
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <button
            className="btn btn-primary rounded"
            disabled={isLoading}
            onClick={() => postToApi()}
          >
            <div className="flex items-center gap-2">
              <div>{selectedOption === "1" ? "Pay Now" : "Book Now"}</div>
              {isLoading && (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-[#ffc107]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CartForm;
