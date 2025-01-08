import axios from "axios";
import React, { Fragment, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { mofInstance } from "../../Components/Others/AxiosInstance";
import Swal from "sweetalert2";
const MofAddCartModel = ({ mofData, onCloseModel }) => {
  const [updatedData, setupdatedData] = useState(mofData);
  const handleClose = () => {
    // You can pass a value or any data you want to the onClose function.

    onCloseModel();
  };
  const addorRemoveItem = async (
    shopCartId,
    editShopCartItemId,
    editQuantity,
    adultOrChild
  ) => {
    const postObject = {
      shopCartId: shopCartId,
      editShopCartItemId: editShopCartItemId,
      editQuantity: editQuantity,
    };
    try {
      const res = await mofInstance.post("editShopCart", postObject);
      if (res.data.errorCode === 200) {
        setupdatedData((prevData) => {
          return {
            ...prevData,
            nofAdult:
              adultOrChild === "adult"
                ? Number(prevData.nofAdult) + Number(res.data.editQuantity)
                : prevData.nofAdult,
            nofChild:
              adultOrChild === "child"
                ? Number(prevData.nofChild) + Number(res.data.editQuantity)
                : prevData.nofChild,
            totalAmount: res.data.totalAmount,
          };
        });
      } else {
        Swal.fire("Error", res.data.errorMessage, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeShopCartData = async (
    shopCartId,
    removeShopCartItemId,
    adultOrChild
  ) => {
    const postObject = {
      shopCartId: shopCartId,
      removeShopCartItemId: removeShopCartItemId,
    };
    try {
      const res = await mofInstance.post("removeShopCart", postObject);

      console.log(res.data);
      if (res.data.errorCode === 200) {
        setupdatedData((prevData) => {
          return {
            ...prevData,
            nofAdult:
              adultOrChild === "adult"
                ? res.data.editQuantity
                : updatedData.nofAdult,
            nofChild:
              adultOrChild === "child"
                ? res.data.editQuantity
                : updatedData.nofChild,
            totalAmount: res.data.totalAmount,
          };
        });
      } else {
        Swal.fire("Error", res.data.errorMessage, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {console.log(`${JSON.stringify(mofData, null, 2)}`)}
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-7/12 mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-2 bg-gray-200 border-b border-solid rounded-t border-slate-200">
                <h3 className="">Booking Details</h3>
                <h3 className="cursor-pointer" onClick={() => handleClose()}>
                  X
                </h3>
              </div>
              {/*body*/}

              <div className="p-2">
                <div className="flex justify-between">
                  <div className="font-bold text-black">Park Name</div>
                  <div>{updatedData?.parkName}</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-bold text-black">
                    Booking Customer Name
                  </div>
                  <div>
                    {updatedData?.firstName} {updatedData?.lastName}
                  </div>
                </div>
                {updatedData?.nofAdult != 0 && (
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-black">Number Of Adult</div>
                    <div className="flex gap-5 items-center">
                      <div>{updatedData?.nofAdult}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          addorRemoveItem(
                            updatedData?.shopCartId,
                            updatedData?.adultShopCartItemId,
                            1,
                            "adult"
                          )
                        }
                      >
                        <FaPlus />
                      </div>
                      <div
                        className="cursor-pointer text-red-500"
                        onClick={() =>
                          removeShopCartData(
                            updatedData?.shopCartId,
                            updatedData?.adultShopCartItemId,
                            "adult"
                          )
                        }
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                )}

                {updatedData?.nofChild != 0 && (
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-black">Number Of Child</div>
                    <div className="flex gap-5 items-center">
                      <div>{updatedData?.nofChild}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          addorRemoveItem(
                            updatedData?.shopCartId,
                            updatedData?.adultShopCartItemId,
                            1,
                            "child"
                          )
                        }
                      >
                        <FaPlus />
                      </div>
                      <div
                        className="cursor-pointer text-red-500"
                        onClick={() =>
                          removeShopCartData(
                            updatedData?.shopCartId,
                            updatedData?.adultShopCartItemId,
                            "child"
                          )
                        }
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/*footer*/}
              <div className="flex gap-2 items-center justify-end p-2 border-t border-solid rounded-b border-slate-200">
                <button
                  className="btn btn-primary rounded "

                  // disabled={Object.keys(errors).length > 0}
                >
                  Proceed
                </button>

                {/* <button
                  className="btn btn-primary rounded "

                  // disabled={Object.keys(errors).length > 0}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </div>
    </Fragment>
  );
};

export default MofAddCartModel;
