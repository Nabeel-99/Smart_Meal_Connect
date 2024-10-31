import React from "react";

const SubmitButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`bg-[#B678F0] py-2 text-white text-center px-6 w-44 rounded-lg ${
        loading ? "cursor-not-allowed bg-[#b678f096] " : ""
      }
          `}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
