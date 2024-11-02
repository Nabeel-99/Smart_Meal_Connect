import React, { useState } from "react";
import SelectInput from "../formInputs/SelectInput";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TextInput from "../formInputs/TextInput";
import { themeOptions } from "../../../../server/utils/helper";
import axios from "axios";
import DialogComponent from "../popupCards/DialogComponent";
import ChangeNameForm from "../forms/ChangeNameForm";
import ChangeEmailForm from "../forms/ChangeEmailForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ThemeInput from "../formInputs/ThemeInput";
import DeleteAccountButton from "../buttons/DeleteAccountButton";

const AccountSection = ({ userData, theme, updateTheme, refreshUserData }) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingName, setIsChangingName] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState("");
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const showInput = () => setIsChangingName(!isChangingName);
  const showEmailInput = () => setIsChangingEmail(!isChangingEmail);
  const showPasswordFields = () => setIsChangingPassword(true);
  const closePasswordFields = () => setIsChangingPassword(false);

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
      const response = await axios.delete(
        "http://localhost:8000/api/auth/delete-user",
        { withCredentials: true }
      );
      console.log(response.data);
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
        }, 3000);
        return;
      }
    }
    const updatedData = {};
    if (firstName !== userData.firstName) updatedData.firstName = firstName;
    if (lastName !== userData.lastName) updatedData.lastName = lastName;
    if (email !== userData.email) updatedData.email = email;
    if (password) updatedData.password = password;
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/auth/update",
        updatedData,
        { withCredentials: true }
      );
      console.log(response.data);
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
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setShowError(true);
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
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
      />
      <ChangeEmailForm
        showError={showError}
        error={error}
        isChangingEmail={isChangingEmail}
        updateAccount={updateAccount}
        email={email}
        setEmail={setEmail}
        userData={userData}
        showEmailSuccess={showEmailSuccess}
        emailSuccess={emailSuccess}
        showEmailInput={showEmailInput}
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
      <ThemeInput theme={theme} updateTheme={updateTheme} />
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
