import { useState } from "react";
import {
  axiosInstance,
  clearNativeAuthToken,
  getNativeAuthToken,
  isNative,
} from "../../../apiConfig";

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      let token = null;
      const response = await axiosInstance.post(`/api/auth/logout`, {});
      if (isNative) {
        token = await getNativeAuthToken();
        if (token) {
          await clearNativeAuthToken();
        }
      }
      if (response.status === 200) {
        sessionStorage.removeItem("ingredientsBased");
        sessionStorage.removeItem("metricsBased");
        sessionStorage.removeItem("ingredientsInput");
        localStorage.removeItem("postFormData");
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogout,
  };
};

export default useLogout;
