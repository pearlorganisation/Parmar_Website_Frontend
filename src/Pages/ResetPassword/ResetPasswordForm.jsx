import React, { useState } from "react";
import { instance } from "../../Components/Others/AxiosInstance";
import { TextInput } from "../../Components/FormComp";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessAlert } from "../../Components/Others/CustomeAlert";
import { motion, AnimatePresence } from "framer-motion";
const ResetPasswordForm = () => {
  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const tempObject = JSON.parse(id);

  const [formData, setFormData] = useState({
    userName: tempObject.userName,
    b2c: true,
    b2b: false,
    b2bUser: false,
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
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
    const newErrors = { password: "", confirmpassword: "" };

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;

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

    const postObject = {
      ...formData,
      platformId: 2,
    };
    if (validateForm()) {
      try {
        const res = await instance.post("updatePasswordForUser", postObject);
        if (res.data.errorCode === "0") {
          setalertMessage(
            "Your Password was updated, please login with your new Credentials"
          );
          setalertType("sucess");
          setAlertVisible(true);
          setTimeout(() => {
            setalertMessage("");
            setalertType("");
            setAlertVisible(false);
            navigate(`/`);
          }, 5000);
        }
      } catch (error) {
        setalertMessage(error.message);
        setalertType("error");
        setAlertVisible(true);
        setTimeout(() => {
          setalertMessage("");
          setalertType("");
          setAlertVisible(false);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center py-20">
        <div className="relative w-full p-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/3 ">
          <div className="absolute flex justify-center w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-[#01b8cc] border-8 border-gray-400 rounded-full -top-1 left-1/2">
            {/* Content inside the centered circle */}
          </div>
          <div className="w-full p-5 text-xl text-center md:text-3xl font-Kanit800 text-primaryColor">
            New Password
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
                placeholder="confirm password"
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
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
