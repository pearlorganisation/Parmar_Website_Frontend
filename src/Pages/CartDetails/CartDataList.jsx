import React, { Fragment, useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { instance } from "../../Components/Others/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartDetails } from "../../Components/Reducers/cartDataSlice";
import { secretKey } from "../../Components/Others/ApiUrls";
import Swal from "sweetalert2";
const CartDataList = (props) => {
  const { cartlist } = props;
  const dispatch = useDispatch();
  const finalAmount = cartlist.reduce((sum, item) => sum + item.bookTotal, 0);
  const loginData = useSelector((state) => state.authData);
  let tempId = localStorage.getItem("tempIdtpb2cuniqueid");
  const [expandCartId, setexpandCartId] = useState([]);

  useEffect(() => {}, []);

  const expandCardItemInitial = () => {};
  const expandCardItem = (cartId) => {
    console.log("isbcxisbcbsibcisbicbs", cartId);
    const existingIndex = expandCartId.findIndex((id) => id === cartId);

    if (existingIndex !== -1) {
      const updatedIds = [...expandCartId];
      updatedIds.splice(existingIndex, 1);
      setexpandCartId(updatedIds);
    } else {
      setexpandCartId([...expandCartId, cartId]);
    }
  };

  window.dataLayer = window.dataLayer || [];

  const deleteRecord = async (cartInfoId) => {
    let delId = [];
    delId.push(cartInfoId);

    const deleteData = {
      cartInfo: delId,
      secretKey: secretKey,
    };
    console.log("cartInfoId", cartInfoId);
    const findDeleteItem = cartlist.find(
      (item) => item.cartInfoId === cartInfoId
    );

    console.log(
      "findDeleteItemfindDeleteItemfindDeleteItemfindDeleteItem",
      findDeleteItem
    );
    await Swal.fire({
      title: "Do you want to remove from your cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      // Make the callback function async
      if (result.isConfirmed) {
        try {
          const response = await instance.post("deleteCartInfo", deleteData); // Add await here

          if (window.dataLayer) {
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
              event: "remove_from_cart",
              ecommerce: {
                currency: "AED",
                value: findDeleteItem?.bookTotal,
                items: [
                  {
                    item_id: findDeleteItem?.ticketTypeId,
                    item_name: findDeleteItem?.tktName,
                    price: findDeleteItem?.bookTotal,
                    quantity:
                      Number(findDeleteItem?.nofAdult) +
                      Number(findDeleteItem?.nofChild),

                    // att_id: "1534",
                    // att_name: "Test Code",
                    // ticket_type: "Test For delete",
                    // adult_count: Number(findDeleteItem.nofAdult),
                    // child_count: Number(findDeleteItem?.nofChild),
                    // ticket_id: findDeleteItem?.ticketTypeId,
                    // total_price: findDeleteItem?.bookTotal,
                    // total_quantity:
                    //   Number(findDeleteItem?.nofAdult) +
                    //   Number(findDeleteItem?.nofChild),
                  },
                ],
              },
            });
          } else {
            console.warn("dataLayer is not defined");
          }

          console.log(response.data);
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
          Swal.fire("Removed!", "", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Fragment>
      {cartlist.map((item, index) => (
        <div className="border-[#01b8cc] border-1 rounded  mb-2 " key={index}>
          <div className="flex justify-between gap-2 bg-gray-200 rounded-t-lg p-2 relative">
            <div>{item.attName}</div>

            <div className="flex relative">
              {/* <div
                className="cursor-pointer"
                onClick={() => expandCardItem(item.cartInfoId)}
              >
                {expandCartId.includes(item.cartInfoId) ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div> */}
              <div
                className="relative -top-5 -right-5  "
                onClick={() => deleteRecord(item.cartInfoId)}
              >
                <IoIosCloseCircle size={25} color="red" />
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-between gap-2">
              <div>Tour Option</div>
              <div>{item.tktName}</div>
            </div>
            <div className="flex justify-between gap-2">
              <div>Travel date</div>
              <div>{new Date(item.travelDate).toLocaleDateString()}</div>
            </div>
            <div className="flex justify-between gap-2">
              <div>Pax</div>
              <div>
                {item.nofAdult} Adult, {item.nofChild} Child
              </div>
            </div>
            <div className="flex justify-between gap-2 ">
              <div>Totel</div>
              <div>{item.bookTotal}</div>
            </div>
          </div>
          {/* {expandCartId.includes(item.cartInfoId) && (
            <div className="p-2">
              <div className="flex justify-between gap-2">
                <div>Tour Option</div>
                <div>{item.tktName}</div>
              </div>
              <div className="flex justify-between gap-2">
                <div>Travel date</div>
                <div>{new Date(item.travelDate).toLocaleDateString()}</div>
              </div>
              <div className="flex justify-between gap-2">
                <div>Pax</div>
                <div>
                  {item.nofAdult} Adult, {item.nofChild} Child
                </div>
              </div>
              <div className="flex justify-between gap-2 ">
                <div>Totel</div>
                <div>{item.bookTotal}</div>
              </div>
            </div>
          )} */}
        </div>
      ))}

      <div className="border-[#01b8cc] border-1 rounded  mb-5">
        <div className="flex justify-between gap-2  bg-gray-200 rounded-t-lg p-2">
          <div>Final Amount</div>
        </div>

        <div className="flex justify-between p-2 font-bold text-2xl">
          <div>Final Amount</div>
          <div>{finalAmount}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartDataList;
