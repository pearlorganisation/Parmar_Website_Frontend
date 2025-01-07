import React from "react";

const CheckboxInput = ({ label, checked, onChange, name, disabled }) => (
  <div className="mb-2 w-full flex items-center">
    <input
      name={name}
      type="checkbox"
      disabled={disabled}
      id="checkbox-input"
      className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      checked={checked}
      onChange={onChange}
    />
    <label
      htmlFor="checkbox-input"
      className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
  </div>
);

export default CheckboxInput;
