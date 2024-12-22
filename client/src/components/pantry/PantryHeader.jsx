import React from "react";

const PantryHeader = () => {
  return (
    <div className="flex flex-col  w-full gap-4">
      <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
        Let's Get Your<span className="lg:block">Pantry Ready</span>
      </h1>
      <p className="">
        We suggest choosing a few items for your pantry to{" "}
        <span className="lg:block">help us customize your experience. </span>
      </p>
    </div>
  );
};

export default PantryHeader;
