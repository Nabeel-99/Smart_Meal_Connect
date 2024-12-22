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
        />
        <div className="relative">
          <TextInput
            label={"Password"}
            htmlFor={"password"}
            id={"password"}
            type={isPasswordVisible ? "text" : "password"}
            labelClassName="lg:text-lg"
            className="lg:w-96 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-12"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex justify-end pb-4">
          <Link
            to={"/forgot-password"}
            className="dark:text-[#b9b9b9] dark:hover:text-white text-[#252525] hover:text-black"
          >
            Forgot password?
          </Link>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#B678F0] transition-all duration-300 hover:bg-[#a977d9] py-2 text-center flex text-white items-center justify-center w-full lg:w-96 rounded-lg"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl " />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      <div className="flex gap-2 pt-4">
        <p>Don't have an account?</p>
        <Link
          to={"/sign-up"}
          className="text-[#8553b6] dark:text-[#bd94e6] dark:hover:text-[#d7b7f7] hover:text-[#a46adf]  font-bold"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
