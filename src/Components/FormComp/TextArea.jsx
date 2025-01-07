import React from "react";

const TextArea = ({ label, value, onChange, placeholder, name, disabled }) => (
  <div className="mb-2 w-full">
    <label
      htmlFor="text-area"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      {label}
    </label>
    <textarea
      name={name}
      disabled={disabled}
      id="text-area"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="4"
    />
  </div>
);

export default TextArea;
