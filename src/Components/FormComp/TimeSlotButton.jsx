import React, { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
const TimeSlotButton = ({ onClick, btnColor, name, isSeleted }) => {
  return (
    <Fragment>
      <button
        className={`px-4 py-2 mt-2 ransition-all duration-500 ease-in-out ${
          isSeleted === true
            ? "bg-green-400"
            : btnColor === "green"
            ? "bg-green-400 hover:bg-green-600"
            : "bg-[#1f2e4e] hover:bg-[#ea001e]"
        } bg-secondary-400 hover:bg-secondary-600 text-white`}
        onClick={onClick}
      >
        <div className="flex items-center gap-1 text-[12px]">
          {name}
          {isSeleted === true && <FaCheckCircle />}
        </div>
      </button>
    </Fragment>
  );
};

export default TimeSlotButton;
