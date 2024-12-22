import { useState, useEffect } from "react";
import { axiosInstance } from "../../../apiConfig";

const useEmailNotifications = (userData) => {
  const [emailNotifications, setEmailNotifications] = useState(
    userData?.emailNotifications
  );
  const [loading, setLoading] = useState(false);

  const fetchNotificationPreference = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/auth/get-email-notifications`
      );
      setEmailNotifications(response.data.emailNotifications);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationPreference();
  }, []);

  const toggleEmailNotifications = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/auth/update-email-notifications`,
        {
          emailNotifications: !emailNotifications,
        }
      );
      setEmailNotifications(response.data.emailNotifications);
    } catch (error) {
      console.error("Error updating email notifications:", error);
    }
  };

  return {
    emailNotifications,
    setEmailNotifications,
    toggleEmailNotifications,
    loading,
  };
};

export default useEmailNotifications;
