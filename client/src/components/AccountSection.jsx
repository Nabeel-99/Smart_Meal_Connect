import React, { useState } from "react";
import SelectInput from "./formInputs/SelectInput";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TextInput from "./formInputs/TextInput";
import { themeOptions } from "../../../server/utils/helper";
import axios from "axios";
import DialogComponent from "./DialogComponent";

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
      <div className="flex flex-col items-start gap-4">
        <div className="text-lg">Name</div>
        {isChangingName ? (
          <div className="">
            <form
              onSubmit={updateAccount}
              className="flex flex-col  items-start lg:flex-row lg:items-center gap-3 lg:gap-8"
            >
              <TextInput
                label={"First name"}
                className="w-64"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextInput
                label={"Last name"}
                className="w-64"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-1 mt-2 bg-green-600 hover:bg-green-700  text-white rounded-md"
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <p>
              {userData.firstName} {userData.lastName}
            </p>
            {showSuccess && (
              <div
                className={`text-green-500 text-sm mt-1 transition-opacity ease-in-out  duration-1000 ${
                  showSuccess ? "opacity-100" : "opacity-0"
                }`}
              >
                {success}
              </div>
            )}
          </div>
        )}

        <button
          onClick={showInput}
          className="dark:text-blue-400 text-blue-700 text-sm"
        >
          {isChangingName ? "Cancel" : "Change name"}
        </button>
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="text-lg">Email</div>
        {showError && (
          <div
            className={`text-red-500 text-sm mt-1 transition-opacity ease-in-out  duration-1000 ${
              showError ? "opacity-100" : "opacity-0"
            }`}
          >
            {error}
          </div>
        )}
        {isChangingEmail ? (
          <form
            onSubmit={updateAccount}
            className="flex flex-col  items-start lg:flex-row lg:items-center gap-3 lg:gap-8"
          >
            <TextInput
              className="w-64"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-1 mb-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="flex gap-4 items-center">
            <p>{userData.email}</p>
            {showEmailSuccess && (
              <div
                className={`text-green-500 text-sm mt-1 transition-opacity ease-in-out  duration-1000 ${
                  showEmailSuccess ? "opacity-100" : "opacity-0"
                }`}
              >
                {emailSuccess}
              </div>
            )}
          </div>
        )}

        <button
          onClick={showEmailInput}
          className="dark:text-blue-400 text-blue-700 text-sm"
        >
          {" "}
          {isChangingEmail ? "Cancel" : "Change email"}
        </button>
      </div>
      <div className="flex flex-col border-b dark:border-b-[#343333] border-b-[#e0e0e0] pb-4 items-start gap-4">
        <div className="text-lg">Password</div>
        <div className="flex gap-2 items-center">
          <button
            onClick={showPasswordFields}
            className="dark:text-blue-400 text-blue-700 text-sm"
          >
            Change password
          </button>
          {showPasswordSuccess && (
            <div
              className={`text-green-500 text-sm mt-1 transition-opacity ease-in-out  duration-1000 ${
                showPasswordSuccess ? "opacity-100" : "opacity-0"
              }`}
            >
              {passwordSuccess}
            </div>
          )}
        </div>

        {isChangingPassword && (
          <form onSubmit={updateAccount} className="mt-3">
            {showPasswordError && (
              <div
                className={`text-red-500 text-sm mt-1 pb-2 transition-opacity ease-in-out  duration-1000 ${
                  showPasswordError ? "opacity-100" : "opacity-0"
                }`}
              >
                {passwordError}
              </div>
            )}
            <div className="relative">
              <TextInput
                label={"New Password"}
                htmlFor={"new-password"}
                id={"new-password"}
                type={isPasswordVisible ? "text" : "password"}
                labelClassName="lg:text-sm"
                className="lg:w-72 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-10"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <TextInput
                label={"Confirm Password"}
                htmlFor={"confirm-password"}
                id={"confirm-password"}
                type={isConfirmPasswordVisible ? "text" : "password"}
                labelClassName="lg:text-sm"
                className="lg:w-72 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-10"
                onClick={toggleConfirmPasswordVisibility}
              >
                {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={closePasswordFields}
                type="button"
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="flex flex-col gap-4  border-b dark:border-b-[#343333] border-b-[#e0e0e0] pb-4">
        <div>Theme</div>
        <SelectInput
          value={theme}
          onChange={(e) => updateTheme(e.target.value)}
          options={themeOptions}
          className="w-44"
          theme={theme}
          applyDarkMode={true}
        />
      </div>
      <div className="flex flex-col items-start gap-4 mt-8   pb-4">
        <div>Account</div>
        <button
          onClick={openDeleteModal}
          className="text-red-400 hover:text-red-500"
        >
          Delete account
        </button>
      </div>
      {showDialog && (
        <DialogComponent
          theme={theme}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleAction={deleteAccount}
          title={"Are you sure you want to delete your account?"}
        />
      )}
    </div>
  );
};

export default AccountSection;
