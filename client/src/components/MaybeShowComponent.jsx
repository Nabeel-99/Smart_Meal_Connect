import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowComponent = ({ children }) => {
  const [showComponent, setShowComponent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hidePaths = [
      "/dashboard",
      "/sign-up",
      "/login",
      "/profile",
      "/saved-meals",
      "/recipe-details",
      "/settings",
      "/pantry-items",
      "/feeds",
      "/preferences",
      "/pantry",
      "/forgot-password",
      "/reset-password",
      "/verify-email",
    ];
    setShowComponent(
      !hidePaths.some((path) => location.pathname.startsWith(path))
    );
  }, [location]);
  return showComponent ? <div>{children}</div> : null;
};

export default MaybeShowComponent;
