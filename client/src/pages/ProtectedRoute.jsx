import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    // return <div>You need to be logged in to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
