import React from "react";

const ToggleInput = ({ isLoggedIn, isConnected, handleToggle }) => {
  return (
    <label
      className={`relative inline-flex items-center  ${
        isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
      }`}
    >
      <input
        type="checkbox"
        className=" sr-only peer"
        checked={isConnected}
        onChange={handleToggle}
        disabled={!isLoggedIn}
      />
      <div className="w-11 h-6 bg-[#4B4B4B] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#343333] rounded-full peer peer-checked:bg-green-600 transition-colors duration-300"></div>
      <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-0.5 peer-checked:translate-x-full transition-transform duration-300"></div>
    </label>
  );
};

export default ToggleInput;
