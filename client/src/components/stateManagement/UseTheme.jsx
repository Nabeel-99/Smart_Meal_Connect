import React, { useEffect, useState } from "react";

const useTheme = (theme) => {
  const [modalTheme, setModalTheme] = useState(theme);
  useEffect(() => {
    const updateTheme = () => {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      if (theme === "system") {
        setModalTheme(systemTheme);
      } else {
        setModalTheme(theme);
      }
    };

    updateTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      if (theme === "system") {
        setModalTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);
  return modalTheme;
};

export default useTheme;
