import React from "react";
import TextInput from "../formInputs/TextInput";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginForm = ({
  error,
  onSubmit,
  email,
  setEmail,
  isPasswordVisible,
  password,
  setPassword,
  togglePasswordVisibility,
  loading,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-auto">
      {error && <div className="text-red-500 lg:w-96 pb-4">{error}</div>}
      <form onSubmit={onSubmit} className="">
        <TextInput
          label={"Email"}
          htmlFor={"email"}
          id={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          labelClassName="lg:text-lg"
          className="lg:w-96"
          applyDarkMode={true}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <div className="relative">
          <TextInput
            label={"Confirm Password"}
            htmlFor={"confirm-password"}
            id={"confirm-password"}
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
        <div className="flex justify-end pb-4">
          <Link to={"/forgot-password"}>Forgot password?</Link>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#B678F0] py-2 text-center flex items-center justify-center w-full lg:w-96 rounded-lg"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      <div className="flex gap-2 pt-4">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
