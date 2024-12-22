import React, { useState } from "react";
import { axiosInstance } from "../../../apiConfig";
import { IoIosCheckmarkCircle } from "react-icons/io";

const UnsubscribeEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const unsubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/auth/unsubscribe-email-notifications"
      );

      if (response.status === 200) {
        setHasUnsubscribed(true);
        setMessage(
          "You have successfully unsubscribed from email notifications."
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error && error.response.status === 400) {
        setHasUnsubscribed(true);
        setMessage("You are already unsubscribed from email notifications.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full gap-20 w-full pt-10 px-8 lg:px-24">
      <div className="flex flex-col gap-6 items-center w-full">
        <h1 className="text-4xl font-bold  text-center tracking-tight">
          Dashboard Meals Notification
        </h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {hasUnsubscribed ? (
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <IoIosCheckmarkCircle className="text-[10rem]" />
                <p>{message}</p>
              </div>
            ) : (
              <div>
                <button
                  onClick={unsubscribe}
                  className="border bg-blue-700 hover:bg-blue-600 border-[#145151] p-2 rounded-lg"
                >
                  Unsubscribe
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnsubscribeEmail;
