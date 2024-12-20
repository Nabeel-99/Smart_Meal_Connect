export const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const systemMode = () => {
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  applyTheme(isSystemDark ? "dark" : "light");
};

export const updateTheme = (selectedTheme, setTheme) => {
  if (selectedTheme === "light" || selectedTheme === "dark") {
    applyTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  } else if (selectedTheme === "system") {
    localStorage.removeItem("theme");
    systemMode();
  }
  setTheme(selectedTheme);
};

export const handleMediaQueryChange = (theme) => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e) => {
    if (theme === "system") {
      applyTheme(e.matches ? "dark" : "light");
    }
  };
  mediaQuery.addEventListener("change", handleChange);
  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
};
