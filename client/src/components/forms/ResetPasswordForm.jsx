import React from "react";
import TextInput from "../formInputs/TextInput";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ResetPasswordForm = ({
  success,
  handleSubmit,
  showError,
  error,
  showSuccess,
  isPasswordVisible,
  isConfirmPasswordVisible,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  toggleConfirmPasswordVisibility,
  togglePasswordVisibility,
  loading,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-auto">
      <form onSubmit={handleSubmit} className="">
        {showError && (
          <div
            className={`text-red-500 text-sm mt-1 pb-4 transition-opacity ease-in-out  duration-1000 ${
              showError ? "opacity-100" : "opacity-0"
            }`}
          >
            {error}
          </div>
        )}
        {showSuccess && (
          <div
            className={`text-green-500  md:w-96 text-sm mt-1 pb-4 transition-opacity ease-in-out  duration-1000 ${
              showSuccess ? "opacity-100" : "opacity-0"
            }`}
          >
            {success}
          </div>
        )}
        <div className="relative">
          <TextInput
            label={"New Password"}
            htmlFor={"new-password"}
            id={"new-password"}
            type={isPasswordVisible ? "text" : "password"}
            labelClassName="lg:text-sm"
            className="lg:w-96 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            applyDarkMode={true}
            bgColor="bg-[#171717]"
            borderColor="border-[#343333]"
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
            className="lg:w-96 pr-10"
            value={confirmPassword}
            bgColor="bg-[#171717]"
            borderColor="border-[#343333]"
            onChange={(e) => setConfirmPassword(e.target.value)}
            applyDarkMode={true}
          />
          <button
            type="button"
            className="absolute right-2 top-10"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-[#B678F0] py-2 text-center w-full lg:w-96 rounded-lg"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl" />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
