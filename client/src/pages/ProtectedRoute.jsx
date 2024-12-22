import { Navigate } from "react-router-dom";
import LoadingAnimation from "../components/animation/LoadingAnimation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (loading || showLoading) {
    return <LoadingAnimation />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    // return <div>You need to be logged in to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
