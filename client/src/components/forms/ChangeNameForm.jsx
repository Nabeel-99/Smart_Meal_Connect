import React from "react";
import TextInput from "../formInputs/TextInput";

const ChangeNameForm = ({
  isChangingName,
  updateAccount,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  userData,
  showSuccess,
  success,
  showInput,
}) => {
  return (
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
  );
};

export default ChangeNameForm;
