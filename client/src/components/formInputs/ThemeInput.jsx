import React from "react";
import SelectInput from "./SelectInput";
import { themeOptions } from "../../variables";

const ThemeInput = ({ theme, updateTheme }) => {
  return (
    <div className="flex flex-col gap-4  border-b dark:border-b-[#343333] border-b-[#e0e0e0] pb-4">
      <div>Theme</div>
      <SelectInput
        value={theme}
        onChange={(e) => updateTheme(e.target.value)}
        options={themeOptions}
        className="w-44"
        theme={theme}
      />
    </div>
  );
};

export default ThemeInput;
