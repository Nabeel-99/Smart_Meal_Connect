import React, { useState } from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SignUpForm from "../../components/forms/SignUpForm";
import CloseButtonHeader from "../../components/buttons/CloseButtonHeader";
import BASE_URL from "../../../apiConfig";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setLoading(true);
        console.log(response);
        setTimeout(() => {
          navigate("/login");
          setLoading(false);
        }, 5000);
      }
      if (response.status === 400) {
        setError("User with give email already exists");
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status == 401) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 10000);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-20 pb-20  lg:gap-64 w-full pt-10 px-8 lg:px-24">
      <CloseButtonHeader />
      <div className="flex flex-col gap-8 pt-24 lg:gap-0 lg:flex-row items-center justify-evenly  ">
        <div className="flex flex-col items-center  w-full md:w-2/3 lg:w-auto  h-full lg:justify-center gap-2">
          <div className="flex flex-col w-full gap-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Sign Up
            </h1>
            <p className="">
              Join Smart Meal Finder and{" "}
              <span className="lg:block">
                {" "}
                Personalize Your Meal Experience.
              </span>
            </p>
          </div>
          <div className="mt-8 mr-4 hidden md:block">
            <SiGreasyfork className="text-2xl lg:text-8xl backdrop-blur-lg" />
          </div>
        </div>
        <div className="w-[0.8px] h-full bg-[#343333]"></div>
        <SignUpForm
          error={error}
          onSubmit={onSubmit}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          isPasswordVisible={isPasswordVisible}
          password={password}
          setPassword={setPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SignUp;
