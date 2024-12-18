import React, { useEffect, useState } from "react";
import axios from "axios";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import CloseButtonHeader from "../../components/buttons/CloseButtonHeader";
import BASE_URL from "../../../apiConfig";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/request-reset-password`,
        { email }
      );
      if (response.status === 200) {
        setShowError(false);
        setShowSuccess(true);
        setSuccess(
          "We've sent a link to your email. Please follow the instructions to proceed."
        );
        setResendTimer(60);
        setTimeout(() => {
          setShowError(false);
          setShowSuccess(false);
          setSuccess("");
        }, 10000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setShowError(true);
        setError("An error occurred. Please try again later.");
        setTimeout(() => {
          setShowError(false);
          setError("");
        }, 10000);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/request-reset-password`,
        { email }
      );
      if (response.status === 200) {
        setShowError(false);
        setShowSuccess(true);
        setSuccess(
          "We've sent a link to your email. Please follow the instructions to proceed."
        );
        setResendTimer(60);
        setTimeout(() => {
          setShowError(false);
          setShowSuccess(false);
          setSuccess("");
        }, 10000);
      }
    } catch (error) {
      setShowError(true);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resendTimer]);
  return (
    <div className="flex flex-col gap-20  w-full pt-10 px-8 lg:px-24">
      <CloseButtonHeader />
      <div className="flex flex-col gap-8 pt-32 items-center justify-evenly  ">
        <div className="flex flex-col items-center w-full md:w-1/2 lg:w-auto   h-full lg:justify-center gap-2">
          <div className="flex flex-col w-full gap-4">
            <h1 className="text-4xl  font-bold tracking-tight">
              Forgot Password
            </h1>
            <p className="md:w-96">
              Enter the email address associated with your account and we will
              send you instructions to reset your password.
            </p>
          </div>
        </div>
        <div className=" w-[0.08px] h-full bg-[#343333]"></div>
        <ForgotPasswordForm
          handleSubmit={handleSubmit}
          showError={showError}
          error={error}
          showSuccess={showSuccess}
          success={success}
          email={email}
          handleResend={handleResend}
          resendTimer={resendTimer}
          loading={loading}
          setEmail={setEmail}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
