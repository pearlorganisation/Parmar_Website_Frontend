import React, { useState } from "react";
import Select from "react-select";
const SelectInput = ({ label, options, onChange, selectedOption }) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f9fafb",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#01b8cc" : "#01b8cc",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#01b8cc" : "#01b8cc",
      },
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "28px",
      padding: "0 6px",
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  return (
    <div>
      <label
        htmlFor="text-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {label}
      </label>
      <Select
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={onChange}
        options={options}
        className="bg-gray-50   text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
    </div>
  );
};

export default SelectInput;
