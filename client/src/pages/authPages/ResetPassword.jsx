import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import CloseButtonHeader from "../../components/buttons/CloseButtonHeader";
import BASE_URL from "../../../apiConfig";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { token } = useParams();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/reset-password`, {
        token,
        newPassword: password,
        confirmPassword: confirmPassword,
      });
      console.log(response.data);
      if (response.status === 200) {
        setShowSuccess(true);
        setError(false);
        setSuccess("Password updated successfully. redirecting...");
        setTimeout(() => {
          setSuccess("");
          window.location = "/login";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setShowError(true);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };
  return (
    <div className="flex flex-col gap-20  w-full pt-10 px-8 lg:px-24">
      <CloseButtonHeader />
      <div className="flex flex-col gap-8 pt-32 items-center justify-evenly  ">
        <div className="flex flex-col items-center w-full md:w-1/2 lg:w-auto   h-full lg:justify-center gap-2">
          <div className="flex flex-col items-center  w-full gap-4">
            <h1 className="text-4xl  font-bold tracking-tight">
              Reset Password
            </h1>
            <p className="">Enter a new password for your account.</p>
          </div>
        </div>
        <div className=" w-[0.08px] h-full bg-[#343333]"></div>
        <ResetPasswordForm
          success={success}
          handleSubmit={handleSubmit}
          showError={showError}
          error={error}
          showSuccess={showSuccess}
          isPasswordVisible={isPasswordVisible}
          isConfirmPasswordVisible={isConfirmPasswordVisible}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          togglePasswordVisibility={togglePasswordVisibility}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
