import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import useTheme from "../UseTheme";
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
    maxWidth: "400px",
    "& .MuiInputBase-root": {
      backgroundColor: autoCompleteTheme === "dark" ? "#171717" : "#F7F7F8",
      border:
        autoCompleteTheme === "dark"
          ? "1px solid #343333"
          : "1px solid #E0E0E0",
      color: autoCompleteTheme === "dark" ? "white" : "#333333",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: autoCompleteTheme === "dark" ? "#343333" : "#E0E0E0",
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
  return (
    <Autocomplete
      id={id}
      disablePortal
      options={ingredientsData}
      getOptionLabel={(option) => option.name}
      sx={{
        ...baseStyles,
        ...customSx,
      }}
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
