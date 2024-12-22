import { useState, useEffect } from "react";

const useViewPreferences = () => {
  const [listView, setListView] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [viewOptions, setViewOptions] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [preferences, setPreferences] = useState(false);

  useEffect(() => {
    const preferredView = localStorage.getItem("preferredView");
    if (preferredView === "list") {
      setListView(true);
      setGridView(false);
    } else if (preferredView === "grid") {
      setGridView(true);
      setListView(false);
    }
  }, []);

  const showListView = () => {
    setListView(true);
    setGridView(false);
    setViewOptions(false);
    localStorage.setItem("preferredView", "list");
  };

  const showGridView = () => {
    setGridView(true);
    setListView(false);
    setViewOptions(false);
    localStorage.setItem("preferredView", "grid");
  };

  const showOptions = () => setViewOptions(!viewOptions);
  const showSideMenu = () => setSideMenu(!sideMenu);
  const showPreferences = () => setPreferences(!preferences);

  return {
    listView,
    gridView,
    viewOptions,
    sideMenu,
    preferences,
    setSideMenu,
    setViewOptions,
    showListView,
    showGridView,
    showOptions,
    showSideMenu,
    showPreferences,
  };
};

export default useViewPreferences;
