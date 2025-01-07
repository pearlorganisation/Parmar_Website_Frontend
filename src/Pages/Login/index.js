import React, { Fragment, useState, useEffect } from "react";
import Banner from "../../Components/Common/Banner";
import { TextInput } from "../../Components/FormComp";
import { useDispatch } from "react-redux";
import { instance } from "../../Components/Others/AxiosInstance";
import { login } from "../../Components/Reducers/authSlice";
import { SuccessAlert } from "../../Components/Others/CustomeAlert";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { secretKey } from "../../Components/Others/ApiUrls";
import Swal from "sweetalert2";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    platformId: 2,
  });
  const [agentData, setagentData] = useState();

  useEffect(() => {}, [agentData]);
  const hConfig = {
    headers: {
      "access-Key": "sibcisbucs",
    },
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setalertType] = useState("info");

  const [showAgreement, setshowAgreement] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postToApi = async () => {
    console.log(formData);
    try {
      const res = await instance.post("getloginuserdetails", formData);
      console.log(res.data);

      let userTempdata = res.data;

      if (res.data.errorCode == 101) {
        try {
          const res = await instance.post("setotpforexistinguser", {
            userName: formData.userName,
            platformId: 2,
          });

          console.log(res.data);

          Swal.fire({
            title:
              "Your OTP Verification is Pending , Please Enter Your Otp that you have recived register email",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Verify",
            showLoaderOnConfirm: true,
            preConfirm: async (otp) => {
              console.log(otp);
              try {
                const res = await instance.post("verifyotpuser", {
                  b2c: true,
                  b2b: false,
                  platformId: 2,
                  b2bUser: false,
                  otp: otp,
                  userName: formData.userName,
                });

                if (res.data.errorCode === "100") {
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
                  setAlertMessage("Login successful!");
                  setalertType("sucess");
                  setAlertVisible(true);
                  setTimeout(() => {
                    setAlertVisible(false);
                  }, 3000);
                }
                console.log(res.data);
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {});
        } catch (error) {}

        // const tempObj = JSON.stringify(tempObject);
      } else if (res.data.errorCode == 0) {
        setAlertMessage("Login successful!");
        setalertType("sucess");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);

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
        setAlertMessage("Login successful!");
        setalertType("sucess");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);

        // navigate("/");

        window.location.replace("/");
      } else if (res.data.errorCode == 301) {
        // const resData = res.data.agency;
        // const userObject = {
        //   name: resData.agencyName,
        //   email: resData.agencyEmail,
        //   mobileNumber: resData.agencyPhoneNumber,
        //   userId: resData.agencyId,
        //   superAdmin: resData.superAdmin,
        //   userType: "b2b",
        //   errorMessage: resData.agencyPassword,
        //   randomKey: resData.randomKey,
        //   creditLimit: resData.creditLimit,
        //   creditUtilized: resData.creditUtilized,
        //   currentBalance: resData.currentBalance,
        //   tvlPackAgreementAccepted: resData.tvlPackAgreementAccepted,
        // };
        // setagentData(userObject);
        // dispatch(login(userObject));
        // setAlertMessage("Login successful!");
        // setalertType("sucess");
        // setAlertVisible(true);
        // setTimeout(() => {
        //   setAlertVisible(false);
        // }, 3000);
        // window.location.replace("/");
        // console.log("userObjectuserObject", userObject);
        // navigate("/");
        // Handle other error codes

        Swal.fire({
          title: "Info",
          text: "Your are a B2B user please login our B2B website",
          icon: "info",
        });
      } else if (res.data.errorCode == 302) {
        setAlertMessage("Login successful!");
        setalertType("sucess");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        // window.location.replace("/");
        // Handle other error codes
      } else if (res.data.errorCode == 420) {
        setAlertMessage("Login Failed! Invalid Credentials");
        setalertType("error");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        // Handle invalid credentials
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong",
        icon: "error",
      });
    }
  };

  const confirmAccept = async (agentData) => {
    try {
      const postObject = {
        agencyId: agentData?.userId,
        tvlPackAgreementAccepted: true,
        secretKey: secretKey,
      };

      console.log(postObject);
      const res = await instance.post("updateAcceptAgreement", postObject);
      console.log("res", res);

      if (res.data.errorCode === 200) {
        dispatch(login(agentData));
        setAlertMessage("Login successful!");
        setalertType("sucess");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        window.location.replace("/");
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Banner title="Login" />

      <div className="flex items-center justify-center mb-5">
        <div className="relative w-full p-2 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/3 mt-5">
          <div className="absolute flex justify-center w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-[#01b8cc] border-8 border-gray-400 rounded-full -top-1 left-1/2">
            {/* Content inside the centered circle */}
          </div>
          <div className="w-full mt-5 text-xl text-center md:text-3xl font-Kanit800 text-primaryColor">
            Login Now
          </div>

          <div className="container-fluid contact py-1">
            <div className="container py-1">
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
              <div className="flex flex-col gap-4">
                <TextInput
                  placeholder="Name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <TextInput
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  className="btn btn-primary rounded "
                  onClick={postToApi}
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2 space-x-5 text-primaryColor">
            <div className="cursor-pointer">
              <Link to="/register-user">Don't have an account?</Link>{" "}
            </div>
            <div className="cursor-pointer">
              <Link to="/forgetpassword"> Forget password?</Link>
            </div>
          </div>
        </div>
      </div>
      {showAgreement === true && (
        <div>
          <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-9/12 mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-1 px-5 bg-gray-200 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">Agent Agreement </h3>
                  <h3
                    className="text-3xl font-semibold cursor-pointer"
                    onClick={() => setshowAgreement(false)}
                  >
                    X
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6 max-h-[70vh] overflow-y-auto">
                  <div className="font-bold text-black divide-y">
                    TCS Declaration
                  </div>
                  <div>
                    I/We{" "}
                    <span className="text-black font-bold">
                      Golden Wings Tours & Travels{" "}
                    </span>{" "}
                    hereby declare that in respect to bookings made for our
                    customers, we would comply with various
                    regulations/guidelines issued under FEMA, Income tax Act,
                    GST Act etc. We also agree and undertake to collect, and
                    maintain the required records/documents/declarations from
                    end customers as well as submit the other supporting
                    information/details/documents to Travel Designer India
                    Private limited including its associate herein referred as
                    "Company".
                  </div>
                  <div className="text-black font-bold">
                    I/We Golden Wings Tours & Travels also hereby declare that;
                    ■
                  </div>
                  <ul>
                    <li>
                      PAN Number(s) entered while booking are accurate and
                      valid. ■
                    </li>
                    <li>
                      Passenger(s) whose PAN details is mentioned while booking
                      has confirmed us that his LRS limit would be utilised for
                      the travel of other passengers.
                    </li>
                    <li>
                      ■ Amount paid by traveller for travel outside of India is
                      in within the annual limits under LRS for resident
                      individuals. ■
                    </li>
                    <li>
                      Appropriate undertaking has been obtained from the
                      traveller by us regarding the quantum of LRS limit
                      utilised during the financial year.
                    </li>
                    <li>
                      ■ We have booked only 1 product out of hotels, sightseeing
                      and transfer for same passenger from Rezlive and we hereby
                      confirm that there are no other products booked for the
                      same passenger.
                    </li>
                    <li>
                      We would comply with the provisions of the section
                      206C(1G) of the Act to:
                    </li>
                    <li>1. Collect applicable TCS from our customers</li>
                    <li>
                      2. Pay the collected TCS to the tax authorities within
                      prescribed timelines
                    </li>
                    <li>3. Report the collected TCS in the TCS return</li>
                    <li>4. Furnish TCS certificates to traveller</li>
                    <li>
                      ■ We undertake full ownership and responsibility to comply
                      on this declaration and furnish relevant supporting as and
                      when required
                    </li>
                    <li>
                      We understand the content of this digital declaration and
                      agree to be legally bound by it.
                    </li>
                  </ul>
                  ■ We confirm that Company is not required to collect any
                  further TCS for the remittance made by them. We hereby
                  indemnify and undertake to keep the Company indemnified at all
                  times to the extent of any claims but not limited to any tax,
                  interest, penalty and other levies that are brought against
                  Company which may arise out of or in connection with any
                  incorrect information furnished by us in this current
                  declaration in relation to transactions (including past
                  transactions) undertaken by us with the company. The
                  obligation to indemnify Company shall survive indefinitely.
                  {/* <div>
                    <div>Digitally signed and accepted</div>
                    <div> Agency Name: Golden Wings Tours & Travels </div>
                    <div>Agent Code: CA122646</div>
                  </div> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end py-2 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-5 p-1 mr-1 text-sm font-bold text-green-600 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => confirmAccept(agentData)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-5 p-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setshowAgreement(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
