import { useState } from "react";
import { axiosInstance } from "../../../apiConfig";

const useUpdateAccount = (refreshUserData, userData, setLoading) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingName, setIsChangingName] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const updateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Password: ", password);
    console.log("Confirm Password: ", confirmPassword);
    if (password) {
      if (password !== confirmPassword) {
        setShowPasswordError(true);
        setPasswordError("Passwords do not match");
        setTimeout(() => {
          setPasswordError("");
        }, 10000);
        return;
      }
    }
    const updatedData = {};
    if (firstName !== userData.firstName) updatedData.firstName = firstName;
    if (lastName !== userData.lastName) updatedData.lastName = lastName;
    if (email !== userData.email) updatedData.email = email;
    if (password) updatedData.password = password;
    try {
      const response = await axiosInstance.patch(
        `/api/auth/update`,
        updatedData
      );
      if (response.status === 200) {
        setIsChangingName(false);
        setIsChangingEmail(false);
        setIsChangingPassword(false);

        if (updatedData.firstName || updatedData.lastName) {
          setSuccess("Name updated successfully.");
          setShowSuccess(true);
        } else if (updatedData.email) {
          setEmailSuccess("Email updated successfully.");
          setShowEmailSuccess(true);
        } else if (updatedData.password) {
          setPasswordSuccess("Password updated successfully.");
          setShowPasswordSuccess(true);
        }

        await refreshUserData();
        setTimeout(() => {
          setSuccess("");
          setEmailSuccess("");
          setPasswordSuccess("");
          setShowEmailSuccess(false);
          setShowPasswordSuccess(false);
          setShowSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        const { message } = error.response.data;
        if (message.toLowerCase().includes("email")) {
          setEmailError(message);
          setShowEmailError(true);
        } else if (message.toLowerCase().includes("password")) {
          setPasswordError(message);
          setShowPasswordError(true);
        } else if (message.toLowerCase().includes("name")) {
          setNameError(message);
          setShowNameError(true);
        }
        setTimeout(() => {
          setNameError("");
          setEmailError("");
          setPasswordError("");
          setShowEmailError(false);
          setShowPasswordError(false);
          setShowNameError(false);
        }, 10000);
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    updateAccount,
    isChangingName,
    success,
    showSuccess,
    setIsChangingName,
    showNameError,
    nameError,
    showEmailError,
    emailError,
    isChangingEmail,
    showEmailSuccess,
    emailSuccess,
    setIsChangingEmail,
    showPasswordError,
    passwordError,
    showPasswordSuccess,
    passwordSuccess,
    isChangingPassword,
    setIsChangingPassword,
  };
};

export default useUpdateAccount;
