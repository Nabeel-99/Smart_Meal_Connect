import React from "react";
import useTheme from "../UseTheme";

const SelectInput = ({
  id,
  label,
  name,
  options,
  value,
  onChange,
  disabled = false,
  htmlFor,
  className = "",
  bgColor,
  inputWidth = "",
  theme,
  borderColor,
  applyDarkMode = false,
}) => {
  const inputTheme = useTheme(theme);
  let strokeColor = "black";

  if (applyDarkMode || inputTheme === "dark") {
    strokeColor = "white";
  } else if (inputTheme === "system") {
    strokeColor = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "white"
      : "black";
  }
  return (
    <div
      className={`flex flex-col gap-2 pb-4 ${
        inputWidth ? inputWidth : "w-full"
      }`}
    >
      <label htmlFor={htmlFor} className="lg:text-sm">
        {label}
      </label>
      <select
        id={id}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        className={`${
          bgColor ? bgColor : "dark:bg-[#171717] bg-[#ffffff]"
        } border ${
          borderColor ? borderColor : "dark:border-[#1d1d1d] border-[#e0e0e0]"
        } rounded-lg px-3 py-2 pr-8 appearance-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${strokeColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundPosition: "right 1rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1rem",
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
