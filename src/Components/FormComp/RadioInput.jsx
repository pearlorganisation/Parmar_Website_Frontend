import React from "react";

const RadioInput = ({ label, value, onChange, name, disabled, checked }) => (
  <div className="mb-2 w-full flex items-center">
    <input
      name={name}
      type="radio"
      disabled={disabled}
      id={`${name}-${value}`} // Unique id based on name and value
      className="text-primary-500 focus:ring-primary-500 h-4 w-4 border-gray-300 dark:text-white"
      value={value}
      onChange={onChange}
      checked={!!checked} // Ensure checked is a boolean
    />
    <label
      htmlFor={`${name}-${value}`}
      className="ml-2 text-sm font-medium text-gray-900"
    >
      {label}
    </label>
  </div>
);

export default RadioInput;
