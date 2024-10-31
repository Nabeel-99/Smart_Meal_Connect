import React from "react";

const TextAreaInput = ({ instructions, setInstructions }) => {
  return (
    <>
      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        placeholder="Type instructions here"
        className="dark:bg-[#0c0c0c] bg-[#e9e9e9] w-full min-h-52 overflow-scroll border text-sm dark:border-[#1d1d1d] border-[#e0e0e0] rounded-md px-2 py-2"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />
    </>
  );
};

export default TextAreaInput;
