import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import useTheme from "../stateManagement/UseTheme";
import ingredientsData from "../../../../server/utils/ingredientsHelper.json";

const AutoCompleteComponent = ({
  theme,
  setItem,
  setAutocompleteValue,
  autocompleteValue,
  label,
  placeholder,
  id,
  customStyles = {},
}) => {
  const autoCompleteTheme = useTheme(theme);

  const baseStyles = {
    width: {
      xs: "90%",
      sm: "80%",
      md: "70%",
      lg: "60%",
    },
    maxWidth: "800px",
    "& .MuiInputBase-root": {
      backgroundColor: autoCompleteTheme === "dark" ? "#0c0c0c" : "#F7F7F8",
      border:
        autoCompleteTheme === "dark"
          ? "1px solid #1d1d1d"
          : "1px solid #E0E0E0",
      color: autoCompleteTheme === "dark" ? "white" : "#333333",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: autoCompleteTheme === "dark" ? "#1d1d1d" : "#E0E0E0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: autoCompleteTheme === "dark" ? "#ffffff" : "#333333",
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: autoCompleteTheme === "dark" ? "#ffffff" : "#333333",
    },
  };
  const customSx =
    typeof customStyles === "function"
      ? customStyles(autoCompleteTheme)
      : customStyles;

  const filterOptions = (options, state) => {
    const inputValue = state.inputValue.toLowerCase();
    const exactMatches = options.filter(
      (option) => option.name.toLowerCase() === inputValue
    );
    const partialMatches = options.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue) &&
        option.name.toLowerCase() !== inputValue
    );

    const sortedOptions = [...exactMatches, ...partialMatches];
    return sortedOptions.slice(0, 5);
  };
  return (
    <Autocomplete
      id={id}
      clearOnBlur={false}
      disablePortal
      options={ingredientsData}
      getOptionLabel={(option) => option.name}
      sx={{
        ...baseStyles,
        ...customSx,
      }}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          slotProps={{
            inputLabel: {
              style: { color: "#a3a3a3" },
            },
          }}
          sx={{
            backgroundColor:
              autoCompleteTheme === "dark" ? "#0c0c0c" : "#F7F7F8",
            border:
              autoCompleteTheme === "dark"
                ? "1px solid #1d1d1d"
                : "1px solid #E0E0E0",
            color: autoCompleteTheme === "dark" ? "white" : "#333333",
            borderRadius: customStyles?.borderRadius || "",
          }}
        />
      )}
      value={autocompleteValue}
      onChange={(event, value) => {
        if (value) {
          setItem(value.name);
          setAutocompleteValue(null);
        }
      }}
    />
  );
};

export default AutoCompleteComponent;
