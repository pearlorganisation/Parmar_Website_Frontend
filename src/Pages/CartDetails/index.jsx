import React, { Fragment, useEffect } from "react";
import Banner from "../../Components/Common/Banner";
import CartForm from "./CartForm";
import CartDataList from "./CartDataList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const navigate = useNavigate();
  const cartlist = useSelector((state) => state.cartData.data);
  const finalAmount = cartlist.reduce((sum, item) => sum + item.bookTotal, 0);
  // window.dataLayer = window.dataLayer || [];
  useEffect(() => {
    // coretag3manager();
    if (cartlist.length > 0) {
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

      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "view_cart",
        ecommerce: {
          currency: "AED",
          value: finalAmount,

          items: tempga4data,
        },
      });
    } else {
      navigate("/");
    }

    // ga4purchase();
  }, [cartlist]);

  return (
    <Fragment>
      <Banner title="Pasenger Details" />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="flex justify-end mt-5 mb-5 ">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-[#01b8cc] text-white rounded-md"
            >
              {" "}
              Continue Shopping{" "}
            </button>
          </div>
          <div className="md:flex justify-between">
            <div className="md:w-8/12 w-full md:order-first ">
              <div className="md:px-5">
                <CartForm cartlist={cartlist} />
              </div>
            </div>
            <div className="md:w-4/12 w-full  ">
              <CartDataList cartlist={cartlist} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartDetails;
