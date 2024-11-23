import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../apiConfig";
import { useNavigate, useParams } from "react-router-dom";

const EmailPrompt = ({ showVerifyEmail, userData, setShowVerifyEmail }) => {
  const [loading, setLoading] = useState(false);
  const [newVerification, setNewVerification] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/resend-verification-email`,
        {
          email: userData.email,
        }
      );

      if (response.status === 200) {
        setShowVerifyEmail(false);
        setNewVerification(true);
        setResendTimer(60);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/resend-verification-email`,
        { email }
      );
      if (response.status === 200) {
        setShowVerifyEmail(false);
        setNewVerification(true);
        setResendTimer(60);
      }
    } catch (error) {
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

  useEffect(() => {}, [showVerifyEmail, userData]);

  return (
    <>
      {showVerifyEmail && (
        <div className="border dark:bg-[#180e06] bg-[#f3d0af] border-[#e0e0e0] dark:border-[#1d1d1d] p-4 rounded-lg">
          <div>
            Your email address is not verified. Please click the button below to
            verify.
          </div>
          <button
            disabled={loading}
            onClick={verifyEmail}
            className={` ${
              loading ? "cursor-not-allowed" : ""
            }bg-[#353ddb] text-white hover:bg-[#3c45f3] p-1 px-4 rounded mt-2`}
          >
            Verify Email
          </button>
        </div>
      )}
      {newVerification && (
        <div className="border dark:bg-[#0a2d0c] bg-[#10630b] border-[#e0e0e0] text-white dark:border-[#1d1d1d] p-4 rounded-lg">
          <div>
            A new verification link has been sent. Please check your inbox.
          </div>
          <button
            disabled={resendTimer > 0 || loading}
            onClick={handleResend}
            className={` ${
              resendTimer > 0 ? "cursor-not-allowed" : ""
            } bg-[#353ddb] text-white hover:bg-[#3c45f3] p-1 px-4 rounded mt-2`}
          >
            Resend verification link {resendTimer > 0 && `(${resendTimer}s)`}
          </button>
        </div>
      )}
    </>
  );
};

export default EmailPrompt;
