import React from "react";

const SuccessAlert = ({ message, type }) => {
  return (
    <div
      class={`flex items-center p-4 mb-4 text-sm ${
        type === "sucess"
          ? "text-green-800 border border-green-300  bg-green-50 dark:text-green-400 dark:border-green-800"
          : type === "error"
          ? "text-red-800 border border-red-300  bg-red-50 dark:text-red-400 dark:border-red-800"
          : "text-blue-800 border border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      } rounded-lg dark:bg-gray-800 `}
      role="alert"
    >
      <div>{message}</div>
    </div>
  );
};

export { SuccessAlert };
