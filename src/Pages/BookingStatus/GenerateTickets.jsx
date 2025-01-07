import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../Components/Others/AxiosInstance";
import { secretKey } from "../../Components/Others/ApiUrls";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartDetails } from "../../Components/Reducers/cartDataSlice";
const GenerateTickets = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { cartlist, loginData } = props;
  const searchParams = new URLSearchParams(location.search);
  const ref = searchParams.get("ref");
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const [ticketPath, setticketPath] = useState("");
  const [cardHeader, setcardHeader] = useState("Don't Refresh");
  const [cardBody, setcardBody] = useState("Your Payment is processing");
  const [headerColor, setheaderColor] = useState("bg-blue-500");
  const [responceObject, setresponceObject] = useState();
  const hConfig = {
    headers: {
      "access-Key": "osjbxisbcxsbc",
    },
  };
  window.dataLayer = window.dataLayer || [];

  useEffect(() => {
    if (ref) {
      getGenerateTickets();
    }
  }, [ref]);

  console.log("cartlistcartlistcartlist", cartlist);
  //54154 for production 21457 for test
  const getGenerateTickets = async () => {
    // deleteCartData();

    const isAllAttractionId45 = cartlist.every(
      (item) => item.attractionId === 45
    );
    const envId = isAllAttractionId45 ? 21457 : 54154;
    const postObject = {
      paymentKey: ref,
      secretKey: secretKey,
      envId: envId,
      tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
      // attractionsId: 45,
    };

    // let delId = cartlist.map((item) => item.cartInfoId);

    // const deleteData = {
    //   cartInfo: delId,
    //   secretKey: secretKey,
    // };

    // console.log(`${JSON.stringify(deleteData, null, 2)}`);

    console.log(`${JSON.stringify(postObject, null, 2)}`);

    try {
      const res = await instance.post("setB2cBooking", postObject, hConfig);
      setresponceObject(res.data);
      console.log(res.data);

      if (res.data.errorCode === 291) {
        // ga4refunt();
        setheaderColor("bg-red-500");
        setcardHeader("Sorry");
        setcardBody("We did't recive any payment");
      } else if (res.data.errorCode === 567) {
        // ga4refunt();
        setheaderColor("bg-red-500");
        setcardHeader("Sorry");
        setcardBody("We did't recive any payment");
      } else if (res.data.errorCode === 0) {
        ga4purchase(res.data);
        setheaderColor("bg-green-500");
        setcardHeader("Don't Refresh");
        setcardBody(
          "Your Booking Has Been Confirmed Your Ticket Has Been Download Automatically"
        );
        // openPdfUrl()

        const fileURL =
          // "http://66.29.149.191:8080/filestorage/parmartour/images/" + http://parmartours.com /
          "https://generate-ticket.travelpack365.com/" +
          res.data.bookingTickPdfPath;
        const filename = "e-Ticket.pdf";
        setticketPath(fileURL);
        download_file(fileURL, filename);
        openPdfUrl(fileURL);

        // deleteCartItem();
      }
    } catch (error) {
      console.log(error);
      setheaderColor("bg-red-500");
      setcardHeader("Sorry");
      setcardBody("500 - something went wrong");
    }
  };

  const deleteCartData = async () => {
    let delId = cartlist.map((item) => item.cartInfoId);

    const deleteData = {
      cartInfo: delId,
      secretKey: secretKey,
    };

    console.log(`${JSON.stringify("Cart Delete object", deleteData, null, 2)}`);

    try {
      const res = await instance.post("deleteCartInfo", deleteData, hConfig);

      console.log(res.data);
      // dispatch(
      //   fetchCartDetails({
      //     platformId: 2,
      //     userType: 3,
      //     b2cId: loginData?.data?.userId ? loginData?.data?.userId : tempId,
      //     secretKey: secretKey,
      //     tempRef: loginData?.data?.userId ? loginData?.data?.userId : tempId,
      //   })
      // );
      console.log("Cart items deleted successfully", res.data);
    } catch (error) {
      console.error("Error deleting cart items", error);
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

  const finalAmount = cartlist.reduce((sum, item) => sum + item.bookTotal, 0);

  const ga4purchase = async (resData) => {
    console.log(`${JSON.stringify(cartlist, null, 2)}`);
    console.log("test");
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
        event: "purchase",
        ecommerce: {
          transaction_id: ref,
          value: finalAmount,
          currency: "AED",
          tax: 0.5,
          coupon: "Travel Pack",
          user_data: {
            billing_first_name: resData.bookCustomerName,
            billing_last_name: resData.customerLastName,
            billing_email: resData.bookCustomerEmail,
            billing_phone: resData.bookMobileNumber,
            new_customer: loginData?.data?.userId ? false : true,
          },
          items: tempga4data,
        },
      });
    }

    console.log(`${JSON.stringify(tempga4data, null, 2)}`);
    deleteCartData();
  };

  return (
    <Fragment>
      <div>
        <div className="flex items-center justify-center flex-1">
          <div className="md:px-20 lg:px-20">
            <div className="items-center justify-center">
              <div className={`md:w-[500px] p-2 ${headerColor}`}>
                <div className="flex items-center justify-center text-white">
                  <p>Your Payment Status</p>
                </div>
              </div>
              <div className="md:w-[500px] p-2 bg-white">
                <div className="flex-col items-center justify-center py-10">
                  <p className="text-2xl text-center font-Roboto500">
                    {" "}
                    {cardHeader}
                  </p>
                  <p className="text-center"> {cardBody}</p>

                  {/* {responceObject && (
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>{responceObject.bookCustomerName}</th>
                      </tr>
                      <tr>
                        <th>Ref Number</th>
                        <th>{responceObject.bookNumber}</th>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <th>{responceObject.bookTotal}</th>
                      </tr>
                      <tr>
                        <th>Currency</th>
                        <th>AED</th>
                      </tr>
                    </table>
                  )} */}

                  <div className="flex items-center justify-center">
                    {ticketPath && (
                      <button
                        className="btn btn-primary rounded"
                        onClick={() => openPdfUrl(ticketPath)}
                      >
                        Download Ticket
                      </button>
                    )}
                  </div>

                  {/* <div>
                    <button
                      className="btn btn-primary rounded"
                      onClick={() => ga4purchase()}
                    >
                      Purchase Success Test
                    </button>
                  </div> */}

                  {/* <div>
                    <button
                      className="btn btn-primary rounded"
                      onClick={() => ga4purchase(ticketPath)}
                    >
                      Purchase failure Test
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GenerateTickets;
