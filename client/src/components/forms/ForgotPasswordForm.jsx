import React from "react";
import TextInput from "../formInputs/TextInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgotPasswordForm = ({
  handleSubmit,
  showError,
  error,
  showSuccess,
  success,
  email,
  handleResend,
  resendTimer,
  loading,
  setEmail,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-auto">
      <form className="" onSubmit={handleSubmit}>
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
        <TextInput
          label={"Email"}
          htmlFor={"email"}
          id={"email"}
          type={"email"}
          labelClassName="lg:text-lg"
          className="lg:w-96"
          value={email}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
          onChange={(e) => setEmail(e.target.value)}
          applyDarkMode={true}
        />
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#B678F0] py-2 text-center w-full flex items-center justify-center lg:w-96 rounded-lg"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
        <div className="pt-4 flex gap-1 justify-end">
          <p>Didn't receive an email?</p>
          <button
            onClick={handleResend}
            disabled={resendTimer > 0 || loading}
            className={`${
              resendTimer > 0
                ? "cursor-not-allowed text-gray-400"
                : "hover:text-white hover:underline cursor-pointer"
            }`}
          >
            Resend {resendTimer > 0 && `(${resendTimer}s)`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
