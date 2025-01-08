import React, { useState } from "react";

import { instance } from "../../Components/Others/AxiosInstance";
import { TextInput } from "../../Components/FormComp";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessAlert } from "../../Components/Others/CustomeAlert";
import { motion, AnimatePresence } from "framer-motion";
const SignUpForm = () => {
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    eMailId: "",
    mobileNumber: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    eMailId: "",
    mobileNumber: "",
    password: "",
    confirmpassword: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setalertMessage] = useState();
  const [alertType, setalertType] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      userName: "",
      eMailId: "",
      mobileNumber: "",
      password: "",
      confirmpassword: "",
    };

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;

    if (!formData.userName || !formData.userName.trim()) {
      newErrors.userName = "Name is required";
      isValid = false;
    }
    if (!formData.eMailId || !formData.eMailId.trim()) {
      newErrors.eMailId = "Email is required";
      isValid = false;
    }
    if (!formData.mobileNumber || !formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
      isValid = false;
    }

    if (!formData.password || !formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one uppercase letter, and at least one special character";
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmpassword || !formData.confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmpassword.trim() !== formData.password.trim()) {
      newErrors.confirmpassword = "Password mismatch";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const userDataObj = {
  //   userName: userData.userName,
  //   b2c: true,
  //   b2b: false,
  //   b2bUser: false,
  //   password: formData.conpassword,
  // };

  const submitForm = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const userData = {
        userName: formData.eMailId,
        b2c: true,
        b2b: false,
        b2bUser: false,
        platformId: 2,
        customer: {
          customerName: formData.userName,
          mobileNumber: formData.mobileNumber,
          eMailId: formData.eMailId,
          password: formData.password,
          platformId: 2,
        },
      };

      try {
        const res = await instance.post("setloginuserdetails", userData);

        console.log(res.data);
        if (res.data.errorCode == "208") {
          setalertMessage(res.data.errorMessage);
          setalertType("error");
          setAlertVisible(true);
          setTimeout(() => {
            setalertMessage("");
            setalertType("");
            setAlertVisible(false);
          }, 5000);
        } else if (res.data.errorCode == "101" || res.data.errorCode == "0") {
          const tempObject = {
            userName: userData.userName,
            type: "newuser",
          };

          const tempObj = JSON.stringify(tempObject);

          navigate(`/otpverification/${tempObj}`);
        }
      } catch (error) {}
    }

    // console.log("aibdiusbdiwbdxi", userData);
  };
  return (
    <div>
      <div className="flex items-center justify-center py-20">
        <div className="relative w-full p-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/3 md:mt-10 lg:mt-10">
          <div className="absolute flex justify-center w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-[#01b8cc] border-8 border-gray-400 rounded-full -top-1 left-1/2">
            {/* Content inside the centered circle */}
          </div>
          <div className="w-full p-2 text-xl text-center md:text-3xl font-Kanit800 text-primaryColor">
            Register Here
          </div>
          {alertVisible && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <SuccessAlert message={alertMessage} type={alertType} />
              </motion.div>
            </AnimatePresence>
          )}
          <form>
            <div className="mt-2">
              <TextInput
                placeholder="Name"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">{errors.userName}</span>
            </div>
            <div className="mt-2">
              <TextInput
                placeholder="E-mail"
                name="eMailId"
                value={formData.eMailId}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">{errors.eMailId}</span>
            </div>
            <div className="mt-2">
              <TextInput
                placeholder="Mobile"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">
                {errors.mobileNumber}
              </span>
            </div>
            <div className="mt-2">
              <TextInput
                placeholder="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">{errors.password}</span>
            </div>
            <div className="mt-2">
              <TextInput
                placeholder="Confirm Password"
                name="confirmpassword"
                type="password"
                value={formData.confirmpassword}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">
                {errors.confirmpassword}
              </span>
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="btn btn-primary rounded "
                onClick={(event) => submitForm(event)}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
