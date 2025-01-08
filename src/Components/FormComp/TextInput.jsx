import React from "react";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  name,
  disabled,
}) => (
  <div className="mb-2 w-full">
    <label
      htmlFor="text-input"
      className="block mb-2 text-sm font-medium text-gray-900  dark:text-black"
    >
      {label}
    </label>
    <input
      name={name}
      type={type}
      disabled={disabled}
      id="text-input"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
