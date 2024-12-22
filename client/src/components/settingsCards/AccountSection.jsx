import React, { useEffect, useState } from "react";

import DialogComponent from "../popupCards/DialogComponent";
import ChangeNameForm from "../forms/ChangeNameForm";
import ChangeEmailForm from "../forms/ChangeEmailForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ThemeInput from "../formInputs/ThemeInput";
import DeleteAccountButton from "../buttons/DeleteAccountButton";
import BASE_URL, { axiosInstance } from "../../../apiConfig";
import EmailToggleInput from "../formInputs/EmailToggleInput";
import useEmailNotifications from "../hooks/useEmailNotifications";
import useUpdateAccount from "../hooks/useUpdateAccount";

const AccountSection = ({
  userData,
  theme,
  updateTheme,
  setTheme,
  refreshUserData,
  showVerifyEmail,
}) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const { emailNotifications, toggleEmailNotifications } =
    useEmailNotifications(userData);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    setFirstName,
    setLastName,
    setEmail,
    setConfirmPassword,
    setPassword,
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
  } = useUpdateAccount(refreshUserData, userData, setLoading);

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
