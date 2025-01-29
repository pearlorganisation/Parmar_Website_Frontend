import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const CountButton = ({ label, value, onChange, name, disabled }) => {
  const handleIncrement = () => {
    onChange({ target: { name, value: value + 1 } });
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange({ target: { name, value: value - 1 } });
    }
  };

  return (
    <div className="flex justify-between items-center">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          className="bg-gray-200 p-1 rounded disabled:opacity-50"
          disabled={disabled}
        >
          <FaMinus />
        </button>
        <input
          type="text"
          name={name}
          value={value}
          readOnly
          className="w-12  text-center border border-gray-300 rounded"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="bg-gray-200 p-1 rounded disabled:opacity-50"
          disabled={disabled}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CountButton;
