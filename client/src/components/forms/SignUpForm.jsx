import React from "react";
import TextInput from "../formInputs/TextInput";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUpForm = ({
  error,
  onSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  isPasswordVisible,
  password,
  setPassword,
  togglePasswordVisibility,
  loading,
}) => {
  return (
    <div className="w-full md:w-2/3 lg:w-auto">
      {error && <div className="text-red-500 pb-4">{error}</div>}
      <form onSubmit={onSubmit} className="">
        <TextInput
          label={"First name"}
          htmlFor={"first-name"}
          id={"first-name"}
          type={"text"}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          labelClassName="lg:text-lg"
          className="lg:w-96"
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
          applyDarkMode={true}
        />
        <TextInput
          label={"Last name"}
          htmlFor={"last-name"}
          id={"last-name"}
          type={"text"}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          labelClassName="lg:text-lg"
          className="lg:w-96"
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
          applyDarkMode={true}
        />
        <TextInput
          label={"Email"}
          htmlFor={"email"}
          id={"email"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelClassName="lg:text-lg"
          className="lg:w-96"
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
          applyDarkMode={true}
        />
        <div className="relative">
          <TextInput
            label={"Password"}
            htmlFor={"password"}
            id={"password"}
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelClassName="lg:text-lg"
            className="lg:w-96"
            bgColor="bg-[#171717]"
            borderColor="border-[#343333]"
            applyDarkMode={true}
          />
          <button
            type="button"
            className="absolute right-2 top-12"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#B678F0] py-2 text-center flex items-center justify-center w-full lg:w-96 rounded-lg ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl" />
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>

      <div className="flex gap-2 pt-4">
        <p>Already have an account?</p>
        <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
