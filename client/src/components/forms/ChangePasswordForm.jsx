import React from "react";
import TextInput from "../formInputs/TextInput";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ChangePasswordForm = ({
  showPasswordFields,
  showPasswordSuccess,
  passwordSuccess,
  isChangingPassword,
  updateAccount,
  showPasswordError,
  passwordError,
  isPasswordVisible,
  isConfirmPasswordVisible,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  toggleConfirmPasswordVisibility,
  togglePasswordVisibility,
  closePasswordFields,
}) => {
  return (
    <div className="flex flex-col border-b dark:border-b-[#343333] border-b-[#e0e0e0] pb-4 items-start gap-4">
      <div className="text-lg">Password</div>
      <div className="flex gap-2 items-center">
        <button
          onClick={showPasswordFields}
          className="dark:text-blue-400 text-blue-700 text-sm"
        >
          Change password
        </button>
        {showPasswordSuccess && (
          <div
            className={`text-green-500 text-sm mt-1 transition-opacity ease-in-out  duration-1000 ${
              showPasswordSuccess ? "opacity-100" : "opacity-0"
            }`}
          >
            {passwordSuccess}
          </div>
        )}
      </div>

      {isChangingPassword && (
        <form onSubmit={updateAccount} className="mt-3">
          {showPasswordError && (
            <div
              className={`text-red-500 text-sm mt-1 pb-2 transition-opacity ease-in-out  duration-1000 ${
                showPasswordError ? "opacity-100" : "opacity-0"
              }`}
            >
              {passwordError}
            </div>
          )}
          <div className="relative">
            <TextInput
              label={"New Password"}
              htmlFor={"new-password"}
              id={"new-password"}
              type={isPasswordVisible ? "text" : "password"}
              labelClassName="lg:text-sm"
              className="lg:w-72 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-10"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <TextInput
              label={"Confirm Password"}
              htmlFor={"confirm-password"}
              id={"confirm-password"}
              type={isConfirmPasswordVisible ? "text" : "password"}
              labelClassName="lg:text-sm"
              className="lg:w-72 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-10"
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={closePasswordFields}
              type="button"
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePasswordForm;
