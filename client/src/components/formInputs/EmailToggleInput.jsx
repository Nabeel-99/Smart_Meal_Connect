import React from "react";

const EmailToggleInput = ({ emailNotifications, handleToggle }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <p>Email Notifications</p>
        <label className="relative inline-flex items-center">
          <input
            type="checkbox"
            className=" sr-only peer"
            checked={emailNotifications}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-[#4B4B4B] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#343333] rounded-full peer peer-checked:bg-green-600 transition-colors duration-300"></div>
          <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-0.5 peer-checked:translate-x-full transition-transform duration-300"></div>
        </label>
      </div>
      <span className="text-sm text-[#9a9a9a]">
        Receive notifications whenever your new dashboard meals are generated.
      </span>
    </div>
  );
};

export default EmailToggleInput;
