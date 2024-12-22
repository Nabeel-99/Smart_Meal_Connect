import React from "react";

const DeleteAccountButton = ({ openDeleteModal }) => {
  return (
    <div className="flex flex-col items-start gap-4 mt-8   pb-4">
      <div>Account</div>
      <button
        onClick={openDeleteModal}
        className="text-red-400 hover:text-red-500"
      >
        Delete account
      </button>
    </div>
  );
};

export default DeleteAccountButton;
