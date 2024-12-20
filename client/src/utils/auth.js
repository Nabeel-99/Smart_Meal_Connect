import { axiosInstance } from "../../apiConfig";

export const authenticateUser = async (
  isFetching,
  setIsFetching,
  setUserData,
  setLoading
) => {
  if (isFetching) return;
  setIsFetching(true);
  try {
    const response = await axiosInstance.get(`/api/auth`);
    if (response.status === 200) {
      setUserData(response.data.user);
    }
  } catch (error) {
    console.log("Auth error", error);
  } finally {
    setIsFetching(false);
    setLoading(false);
  }
};
