import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../../apiConfig";
import { useNavigate, useParams } from "react-router-dom";

const EmailPrompt = ({ showVerifyEmail, userData, setShowVerifyEmail }) => {
  const [loading, setLoading] = useState(false);
  const [newVerification, setNewVerification] = useState(false);
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
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="border dark:bg-[#0a2d0c] bg-[#10630b] border-[#e0e0e0] dark:border-[#1d1d1d] p-4 rounded-lg">
          <div>
            A new verification link has been sent. Please check your inbox
          </div>
          <button
            disabled={loading}
            onClick={verifyEmail}
            className={` ${
              loading ? "cursor-not-allowed" : ""
            }bg-[#353ddb] text-white hover:bg-[#3c45f3] p-1 px-4 rounded mt-2`}
          >
            Resend verification link
          </button>
        </div>
      )}
    </>
  );
};

export default EmailPrompt;
