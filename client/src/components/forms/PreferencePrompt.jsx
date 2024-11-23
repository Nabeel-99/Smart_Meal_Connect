import React from "react";

const PreferencePrompt = ({ showMetricsPrompt }) => {
  return (
    showMetricsPrompt && (
      <div className="border dark:bg-[#180e06] bg-[#f3d0af] border-[#e0e0e0] dark:border-[#1d1d1d] p-4 rounded-lg">
        <div>
          You’re seeing meal suggestions based on general settings. Adjust your
          metrics in Settings for a personalized experience.
        </div>
      </div>
    )
  );
};

export default PreferencePrompt;
