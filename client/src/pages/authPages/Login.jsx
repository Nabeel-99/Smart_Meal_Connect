import React, { useState } from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CloseButtonHeader from "../../components/buttons/CloseButtonHeader";
import LoginForm from "../../components/forms/LoginForm";
import BASE_URL, {
  axiosInstance,
  isNative,
  saveNativeAuthToken,
} from "../../../apiConfig";

const Login = ({ authenticateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { token, isNewUser } = response.data;
        if (isNative) {
          //save native Token
          await saveNativeAuthToken(token);
        }
        await authenticateUser();

        setLoading(true);
        setTimeout(() => {
          if (isNewUser) {
            navigate("/preferences");
          } else {
            navigate("/dashboard");
          }
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 10000);
        console.log(error);
      }
    }
  };
  console.log("base url", BASE_URL);
  return (
    <div className="flex flex-col gap-20 2xl:container 2xl:mx-auto   w-full pt-10 px-8 lg:px-24">
      <CloseButtonHeader />
      <div className="flex flex-col gap-8 pt-32 md:pt-40 lg:pt-44 lg:gap-0 lg:flex-row items-center justify-evenly 2xl:justify-center 2xl:gap-40  ">
        <div className="flex flex-col items-center w-full md:w-1/2 lg:w-auto   h-full lg:justify-center gap-2">
          <div className="flex flex-col  w-full gap-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Log in
            </h1>
            <p className="">
              Discover Smart Meals Tailored to your{" "}
              <span className="block">Ingredients and Goals.</span>
            </p>
          </div>
          <div className="mt-8 mr-4 hidden md:block">
            <SiGreasyfork className="text-2xl lg:text-8xl backdrop-blur-lg" />
          </div>
        </div>
        <div className=" w-[0.8px] h-full bg-[#343333]"></div>
        <LoginForm
          error={error}
          onSubmit={onSubmit}
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

export default Login;
