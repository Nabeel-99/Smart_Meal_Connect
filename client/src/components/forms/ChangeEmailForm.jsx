import React from "react";
import TextInput from "../formInputs/TextInput";

const ChangeEmailForm = ({
  showEmailError,
  emailError,
  isChangingEmail,
  updateAccount,
  email,
  setEmail,
  userData,
  showEmailSuccess,
  emailSuccess,
  showEmailInput,
  showVerifyEmail,
  setIsChangingEmail,
}) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="text-lg">Email</div>
      {showEmailError && (
        <div
          className={`text-red-500 text-sm mt-1 transition-opacity ease-in-out  duration-1000 ${
            showEmailError ? "opacity-100" : "opacity-0"
          }`}
        >
          {emailError}
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
          <div className="flex flex-col gap-3">
            <p>{userData.email}</p>
            {/* {showVerifyEmail && (
              <div className="text-orange-600 text-sm">
                Your Email hasn't been verified yet. Click on the link below to
                verify
              </div>
            )} */}
          </div>

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

      {isChangingEmail ? (
        <button
          onClick={() => {
            setIsChangingEmail(false);
            setEmail(userData.email);
          }}
          className="dark:text-blue-400 text-blue-700 text-sm"
        >
          Cancel
        </button>
      ) : (
        <button
          onClick={showEmailInput}
          className="dark:text-blue-400 text-blue-700 text-sm"
        >
          Change Email
        </button>
      )}
    </div>
  );
};

export default ChangeEmailForm;
