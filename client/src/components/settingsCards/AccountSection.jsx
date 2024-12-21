import React, { useEffect, useState } from "react";

import DialogComponent from "../popupCards/DialogComponent";
import ChangeNameForm from "../forms/ChangeNameForm";
import ChangeEmailForm from "../forms/ChangeEmailForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ThemeInput from "../formInputs/ThemeInput";
import DeleteAccountButton from "../buttons/DeleteAccountButton";
import BASE_URL, { axiosInstance } from "../../../apiConfig";
import EmailToggleInput from "../formInputs/EmailToggleInput";

const AccountSection = ({
  userData,
  theme,
  updateTheme,
  setTheme,
  refreshUserData,
  showVerifyEmail,
}) => {
  console.log("userData", userData);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [success, setSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

  const [showNameError, setShowNameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const showInput = () => {
    setIsChangingName(true);
  };
  const showEmailInput = () => {
    setIsChangingEmail(true);
  };
  const showPasswordFields = () => {
    setIsChangingPassword(true);
    setPassword("");
    setConfirmPassword("");
  };
  const closePasswordFields = () => {
    setIsChangingPassword(false);
    setPassword("");
    setConfirmPassword("");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
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
  }, [userData._id]);

  const toggleEmailNotifications = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/auth/update-email-notifications`,
        {
          emailNotifications: !emailNotifications,
        }
      );
      setEmailNotifications(response.data.emailNotifications);
      console.log("respoonse.data", response.data);
    } catch (error) {
      console.error("Error updating email notifications:", error);
    }
  };
  const openDeleteModal = () => {
    setShowDialog(true);
  };
  const deleteAccount = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/api/auth/delete-user`);
      if (response.status === 200) {
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
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

  return (
    <div className="flex flex-col gap-8 ">
      <ChangeNameForm
        isChangingName={isChangingName}
        updateAccount={updateAccount}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        userData={userData}
        showSuccess={showSuccess}
        success={success}
        showInput={showInput}
        nameError={nameError}
        setIsChangingName={setIsChangingName}
        showNameError={showNameError}
      />
      <ChangeEmailForm
        showEmailError={showEmailError}
        showVerifyEmail={showVerifyEmail}
        emailError={emailError}
        isChangingEmail={isChangingEmail}
        updateAccount={updateAccount}
        email={email}
        setEmail={setEmail}
        userData={userData}
        showEmailSuccess={showEmailSuccess}
        emailSuccess={emailSuccess}
        showEmailInput={showEmailInput}
        setIsChangingEmail={setIsChangingEmail}
      />
      <ChangePasswordForm
        showPasswordFields={showPasswordFields}
        showPasswordSuccess={showPasswordSuccess}
        passwordSuccess={passwordSuccess}
        isChangingPassword={isChangingPassword}
        updateAccount={updateAccount}
        showPasswordError={showPasswordError}
        passwordError={passwordError}
        isPasswordVisible={isPasswordVisible}
        isConfirmPasswordVisible={isConfirmPasswordVisible}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
        togglePasswordVisibility={togglePasswordVisibility}
        closePasswordFields={closePasswordFields}
      />
      <ThemeInput theme={theme} setTheme={setTheme} updateTheme={updateTheme} />
      <EmailToggleInput
        handleToggle={toggleEmailNotifications}
        emailNotifications={emailNotifications}
      />
      <DeleteAccountButton openDeleteModal={openDeleteModal} />

      <DialogComponent
        theme={theme}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        loading={loading}
        handleAction={deleteAccount}
        title={"Are you sure you want to delete your account?"}
      />
    </div>
  );
};

export default AccountSection;
