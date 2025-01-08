import React, { useEffect, useState } from "react";
import { TextInput } from "../../Components/FormComp";

import { useNavigate } from "react-router-dom";
import { instance } from "../../Components/Others/AxiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessAlert } from "../../Components/Others/CustomeAlert";
const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    platformId: 2,
  });
  const [errors, setErrors] = useState({
    userName: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setalertType] = useState("info");
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { userName: "" };

    // Validate email

    if (!formData.userName || !formData.userName.trim()) {
      newErrors.userName = "Email is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const postObject = {
      ...formData,
      platformId: 2,
    };

    if (validateForm()) {
      const res = await instance.post("setotpforexistinguser", postObject);

      if (res.data.errorCode == "0") {
        const tempObject = {
          ...formData,
          type: "forgetpassword",
        };

        const tempObj = JSON.stringify(tempObject);

        navigate(`/otpverification/${tempObj}`);
      } else if (!res.data) {
        setAlertMessage("Email Not Present");
        setalertType("error");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertMessage("");
          setalertType("");
          setAlertVisible(false);
        }, 5000);
      }
      try {
      } catch (error) {
        setAlertMessage(error.message);
        setalertType("error");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertMessage("");
          setalertType("");
          setAlertVisible(false);
        }, 5000);
      }
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center py-20">
        <div className="relative w-full p-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/3 md:mt-10 lg:mt-10">
          <div className="absolute flex justify-center w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-green-300 border-8 border-gray-400 rounded-full -top-1 left-1/2">
            {/* Content inside the centered circle */}
          </div>
          <div className="w-full p-5 text-xl text-center md:text-3xl font-Kanit800 text-primaryColor">
            Recover Password
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
            <div className="mt-5">
              <TextInput
                placeholder="E-mail"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">{errors.userName}</span>
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

export default ForgetPasswordForm;
