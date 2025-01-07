import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick, label }, ref) => (
  <div className="mb-2 mt-2 w-full">
    <label
      htmlFor="default-input"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      {label}
    </label>
    <input
      type="text"
      id="default-input"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
      onClick={onClick}
      value={value}
      readOnly
      ref={ref}
    />
  </div>
));

const DateInput = ({ selectedDate, handleDateChange, label, minDate }) => {
  return (
    <div className="w-full">
      <DatePicker
        minDate={minDate}
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<CustomInput label={label} />}
      />
    </div>
  );
};

export default DateInput;
