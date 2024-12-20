import { useState, useEffect } from "react";

const Views = ({ setListView, setGridView, setViewOptions }) => {
  const [viewOptions, setViewOptionsState] = useState(false);

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
    setViewOptionsState(false);
    localStorage.setItem("preferredView", "list");
  };

  const showGridView = () => {
    setGridView(true);
    setListView(false);
    setViewOptionsState(false);
    localStorage.setItem("preferredView", "grid");
  };

  return (
    <div>
      <button onClick={showListView}>List View</button>
      <button onClick={showGridView}>Grid View</button>
    </div>
  );
};

export default Views;
