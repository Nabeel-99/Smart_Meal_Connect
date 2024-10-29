import React, { useState } from "react";
import AccountSection from "../../components/settingsCards/AccountSection";
import PreferenceSection from "../../components/settingsCards/PreferenceSection";

const Settings = ({
  userData,
  refreshUserData,
  userMetrics,
  refreshSideMenu,
  theme,
  updateTheme,
}) => {
  const [isAccount, setIsAccount] = useState(true);
  const [isPreferenecs, setIsPreferences] = useState(false);

  const showAccount = () => {
    setIsAccount(true);
    setIsPreferences(false);
  };
  const showPreferences = () => {
    setIsPreferences(true);
    setIsAccount(false);
  };

  return (
    <div className="flex flex-col h-full gap-8 pt-20 px-6 lg:px-10 dark:text-white">
      <div className="flex sticky top-[60px] pt-8 lg:pt-4 z-20 dark:bg-[#0c0c0c] bg-[#F7F7F8] items-center border-b border-b-[#e0e0e0] dark:border-b-[#343333] pb-3 gap-10">
        <button
          onClick={showAccount}
          className={` ${
            isAccount ? "" : "dark:text-[#959595] text-[#575757] "
          }`}
        >
          Account
        </button>
        <button
          onClick={showPreferences}
          className={` ${
            isPreferenecs ? "" : "dark:text-[#959595] text-[#575757] "
          }`}
        >
          Preferences
        </button>
      </div>
      {/* account */}
      {isAccount && (
        <AccountSection
          userData={userData}
          theme={theme}
          updateTheme={updateTheme}
          refreshUserData={refreshUserData}
        />
      )}
      {/* Preferences */}
      {isPreferenecs && (
        <PreferenceSection
          userMetrics={userMetrics}
          refreshSideMenu={refreshSideMenu}
          setIsPreferences={setIsPreferences}
          setIsAccount={setIsAccount}
        />
      )}
    </div>
  );
};

export default Settings;
