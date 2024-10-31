import React from "react";
import ToggleInput from "./ToggleInput";
import { FaCircleInfo } from "react-icons/fa6";

const IngredientsBasedToggle = ({ isConnected, isLoggedIn, handleToggle }) => {
  return (
    <div className="flex justify-center w-full lg:justify-end  lg:w-2/3">
      <div className="flex flex-col items-end w-96 md:w-2/3 gap-2">
        <div className="flex items-center gap-2">
          <p>Connect your pantry and metrics</p>
          <ToggleInput
            isConnected={isConnected}
            isLoggedIn={isLoggedIn}
            handleToggle={handleToggle}
          />
        </div>
        <div className="flex gap-4 items-center">
          <FaCircleInfo className="text-xl " />
          <p className="text-sm italic text-[#A3A3A3]">
            {isLoggedIn ? (
              <span className="text-[0.8rem]">
                This utilizes your pantry and metrics data
                <span className="block">
                  {" "}
                  to enhance your recipe suggestions.
                </span>
              </span>
            ) : (
              "This requires creating an account"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientsBasedToggle;
