import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput } from "../../Components/FormComp";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessAlert } from "../../Components/Others/CustomeAlert";
import { instance } from "../../Components/Others/AxiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../../Components/Reducers/authSlice";
const OtpVerificationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {}, [id]);
  const dispatch = useDispatch();
  const tempObject = JSON.parse(id);

  console.log(tempObject);

  const [formData, setFormData] = useState({
    b2c: true,
    b2b: false,
    platformId: 2,
    b2bUser: false,
    userName: tempObject.userName,
    otp: "",
  });
  const [errors, setErrors] = useState({
    otp: "",
  });
  const [serverRes, setserverRes] = useState(false);
  const [resType, setresType] = useState("");
  const [serverMessage, setserverMessage] = useState("");

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
    const newErrors = { otp: "" };

    // Validate email

    if (!formData.otp) {
      newErrors.otp = "OTP is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    // console.log(`${JSON.stringify(formData, null, 2)}`);
    const postObject = {
      ...formData,
      platformId: 2,
    };

    console.log(postObject);
    if (validateForm()) {
      try {
        const res = await instance.post("verifyotpuser", postObject);

        console.log(res.data);
        if (res.data.errorCode === "100") {
          if (tempObject.type == "forgetpassword") {
            //resetpassword
            const tempObject = {
              userName: formData.userName,
            };

            navigate(`/resetpassword/${JSON.stringify(tempObject)}`);
          } else {
            //redirect to home

            const resData = res.data.customer;
            const userObject = {
              name: resData.customerName,
              email: resData.eMailId,
              mobileNumber: resData.mobileNumber,
              userId: resData.customerId,
              userType: "b2c",
              superAdmin: false,
            };

            dispatch(login(userObject));
            // navigate(`/`);
            window.location.replace("/");
          }
        } else if (res.data.errorCode === "102") {
          setAlertMessage("Invalid OTP");
          setalertType("error");
          setAlertVisible(true);
          setTimeout(() => {
            setAlertMessage("");
            setalertType("");
            setAlertVisible(false);
          }, 5000);
        }
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
        <div className="relative w-full p-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/3 ">
          <div className="absolute flex justify-center w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-[#01b8cc] border-8 border-gray-400 rounded-full -top-1 left-1/2">
            {/* Content inside the centered circle */}
          </div>
          <div className="w-full p-1 text-xl text-center md:text-3xl font-Kanit800 text-primaryColor">
            <div>OTP Verification</div>

            <span className="text-sm">Check Your Email </span>
          </div>
          <div>
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
          </div>
          <form>
            <div className="mt-2">
              <TextInput
                placeholder="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
              />
              <span className="text-red-600 text-msm">{errors.otp}</span>
            </div>

            <div className="flex justify-end mt-2">
              <button
                className="btn btn-primary rounded "
                onClick={(event) => submitForm(event)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
