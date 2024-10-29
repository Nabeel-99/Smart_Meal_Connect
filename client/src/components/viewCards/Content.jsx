import React from "react";

const Content = ({ getCurrentView, renderContentView, location }) => {
  return (
    <div className="dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] lg:pl-64 flex flex-col min-h-screen pb-8 w-full">
      <div
        className={`hidden lg:block   pb-6  z-30 w-full ${
          location.pathname === "/feeds"
            ? ""
            : "border-b dark:border-b-[#1d1d1d] border-b-[#E0E0E0] fixed dark:bg-[#0c0c0c] bg-[#F7F7F8]   pt-6"
        }`}
      >
        <div className="px-10 text-sm">{getCurrentView()}</div>
      </div>
      {renderContentView()}
    </div>
  );
};

export default Content;
