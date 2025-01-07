import React, { Fragment, useState, useEffect } from "react";
import {
  DateInput,
  TextInput,
  TextArea,
  CountButton,
  Sel,
} from "../../Components/FormComp";
import { instance } from "../../Components/Others/AxiosInstance";
import Swal from "sweetalert2";
const TourBookingForm = ({
  id,
  tourName,
  currRate,
  currentCurrency,
  price,
}) => {
  const [formData, setFormData] = useState({
    enqCusName: "",
    enqMobileNumber: "",
    enqEmail: "",
    enqMessage: "",
    noOfPax: 1,
    country: "",
    mobileCode: "+1", // Default country code
    travelDate: "",
    bookTotal: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = async (date) => {
    let formetDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    setFormData((prevData) => ({
      ...prevData,
      travelDate: formetDate,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.enqCusName) formErrors.enqCusName = "Name is required";
    if (!formData.enqEmail) formErrors.enqEmail = "Email is required";

    if (!formData.enqMobileNumber)
      formErrors.enqMobileNumber = "Mobile number is required";
    if (!formData.noOfPax || formData.noOfPax < 1)
      formErrors.noOfPax = "At least 1 adult required";
    if (!formData.travelDate) formErrors.travelDate = "Travel date is required";

    // Mobile number validation (for example, ensuring it's a valid 10-digit number)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.enqMobileNumber)) {
      formErrors.enqMobileNumber = "Invalid mobile number";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // True if no errors
  };

  useEffect(() => {
    const total = price ? price * formData.noOfPax : 0;
    setFormData((prevData) => ({ ...prevData, bookTotal: total }));
  }, [price, formData.noOfPax]);

  const makeEnquiry = async () => {
    if (!validateForm()) {
      return;
    }

    // const submitData = {
    //   enquiryId: "",
    //   tourPackageId: id,
    //   tourPackageName: tourName,
    //   enqCusName: formData.enqCusName,
    //   enqEmail: formData.enqEmail,
    //   enqMobileNumber: `${formData.mobileCode}${formData.enqMobileNumber}`, // Combine mobile code and number
    //   enqMessage: formData.enqMessage,
    //   enquiryDate: new Date(),
    //   enqFollowUpStatus: "",
    //   platformId: 2,
    // };

    const submitData = {
      ...formData,
      tourPackageId: id,
      tourPackageName: tourName,
      platformId: 2,
      enqFollowUpStatus: "",
      enquiryDate: new Date(),
    };
    console.log("form data", submitData);
    // Uncomment and handle the form submission
    try {
      const response = await instance.post("setenquiry", submitData);
      console.log(response.data);
      Swal.fire({
        title: "Success",
        text: "Thank you for your interest, Our executive will contact soon",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div>
        <div className="font-bold border-b-2 border-gray-200 mb-3">
          <h3 className="text-3xl text-capitalize ">
            Enquiry<span className="text-primary"> Here</span>
          </h3>
        </div>

        <div>
          <TextInput
            label="Full Name"
            placeholder="Name *"
            name="enqCusName"
            value={formData.enqCusName}
            onChange={handleChange}
          />
          {errors.enqCusName && (
            <p className="text-red-500">{errors.enqCusName}</p>
          )}
        </div>

        <div>
          <TextInput
            label="E-Mail"
            placeholder="Email *"
            name="enqEmail"
            value={formData.enqEmail}
            onChange={handleChange}
          />
          {errors.enqEmail && <p className="text-red-500">{errors.enqEmail}</p>}
        </div>

        <div className="flex">
          {/* <TextInput
            placeholder="Mobile Code *"
            name="mobileCode"
            value={formData.mobileCode}
            onChange={handleChange}
          /> */}
          <TextInput
            label="Contact Number"
            placeholder="Mobile Number *"
            name="enqMobileNumber"
            value={formData.enqMobileNumber}
            onChange={handleChange}
          />
        </div>
        {errors.enqMobileNumber && (
          <p className="text-red-500">{errors.enqMobileNumber}</p>
        )}

        <div>
          <DateInput
            label="Select Date"
            name="travelDate"
            minDate={new Date()}
            selectedDate={formData.travelDate}
            handleDateChange={handleDateChange}
          />
          {errors.travelDate && (
            <p className="text-red-500">{errors.travelDate}</p>
          )}
        </div>

        <div>
          <CountButton
            label="No Of Pax"
            name="noOfPax"
            value={formData.noOfPax}
            onChange={handleChange}
          />
          {errors.nofAdult && <p className="text-red-500">{errors.noOfPax}</p>}
        </div>

        <hr className="solid"></hr>

        <div>
          <TextArea
            placeholder="Details"
            name="enqMessage"
            value={formData.enqMessage}
            onChange={handleChange}
          />
        </div>

        <h3 className="text-xl md:text-3xl text-capitalize font-bold ">
          Total :
          <span className="text-primary">
            {" "}
            {currRate
              ? (Number(currRate) * Number(formData.bookTotal)).toFixed(2)
              : Number(formData.bookTotal).toFixed(2)}{" "}
            {currentCurrency?.currency}
          </span>
        </h3>

        <div className="flex justify-end mt-3">
          <button className="btn btn-primary rounded" onClick={makeEnquiry}>
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TourBookingForm;
