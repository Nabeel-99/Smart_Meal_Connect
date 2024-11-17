import React from "react";

const ErrorText = ({ error }) => {
  return (
    error && (
      <div
        className={`text-red-500 text-sm mt-1 text-center  w-full transition-opacity ease-in-out  duration-1000 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </div>
    )
  );
};

export default ErrorText;
