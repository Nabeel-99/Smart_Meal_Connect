import React from "react";
import TextInput from "../formInputs/TextInput";
import { FaCamera, FaEye, FaEyeSlash, FaPerson } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";

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
        {/* <div className="pb-4">
          <label
            htmlFor="profile-photo"
            className="cursor-pointer flex flex-col gap-2"
          >
            <div className="lg:text-lg">Profile Picture</div>
            <BsPersonFillAdd className="text-6xl border rounded-full p-3 text-[#e6e6e6]" />
          </label>
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            className="hidden"
          />
        </div> */}
        {/* <div className="flex flex-col lg:flex-row gap-4"> */}
        <TextInput
          label={"First name"}
          htmlFor={"first-name"}
          id={"first-name"}
          type={"text"}
          value={firstName}
          // className="lg:w-64"
          onChange={(e) => setFirstName(e.target.value)}
          labelClassName="lg:text-lg"
        />
        <TextInput
          label={"Last name"}
          htmlFor={"last-name"}
          id={"last-name"}
          type={"text"}
          // className="lg:w-64"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          labelClassName="lg:text-lg"
        />
        {/* </div> */}

        <TextInput
          label={"Email"}
          htmlFor={"email"}
          id={"email"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelClassName="lg:text-lg"
          className="lg:w-full"
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
            className="lg:w-full"
          />
          <button
            type="button"
            className="absolute right-4 top-12"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="text-sm dark:text-[#a3a3a3]">
          Password must meet the following criteria:
          <ul className="list-disc pl-5">
            <li>At least 8 characters long</li>
            <li>Contains at least 1 uppercase letter</li>
            <li>Contains at least 1 lowercase letter</li>
            <li>Contains at least 1 number</li>
            <li>
              Contains at least 1 special character (e.g. @, #, $, %, &, *)
            </li>
          </ul>
        </div>
        <div className="pt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#B678F0] transition-all duration-300 hover:bg-[#a977d9] py-2 text-center flex text-white items-center justify-center w-full lg:w-96 rounded-lg"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl " />
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>

      <div className="flex gap-2 pt-4">
        <p>Already have an account?</p>
        <Link
          to={"/login"}
          className="text-[#8553b6] dark:text-[#bd94e6] dark:hover:text-[#d7b7f7] hover:text-[#a46adf]  font-bold"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
