import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/authPages/SignUp";
import Login from "./pages/authPages/Login";
import ResetPassword from "./pages/authPages/ResetPassword";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import VerifyEmail from "./pages/authPages/VerifyEmail";
import { axiosInstance, isNative } from "../apiConfig";
import { Toast } from "@capacitor/toast";
import ProtectedRoute from "./pages/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import IngredientsBased from "./pages/featuresPages/IngredientsBased";
import MetricsBased from "./pages/featuresPages/MetricsBased";
import PreferencesPage from "./pages/startupPages/PreferencesPage";
import PantryItems from "./pages/startupPages/PantryItems";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import MaybeShowComponent from "./components/stateManagement/MaybeShowComponent";
import ScrollToTop from "./components/stateManagement/ScrollToTop";
import { handleMediaQueryChange, updateTheme } from "./utils/theme";
import { requestPushNotificationPermissions } from "./utils/notification";
import UnsubscribeEmail from "./pages/authPages/UnsubscribeEmail";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const [message, setMessage] = useState("");
  const [showNotificationBar, setShowNotificationBar] = useState(false);

  const authenticateUser = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(`/api/auth`);
      if (response.status === 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.log("Auth error", error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const isAuthenticated = Boolean(userData);

  useEffect(() => {
    updateTheme(theme, setTheme);
    return handleMediaQueryChange(theme, updateTheme);
  }, [theme]);

  // Push notifications setup
  useEffect(() => {
    if (userData) {
      requestPushNotificationPermissions(
        isNative,
        userData,
        setShowNotificationBar,
        setMessage
      );
    }
  }, [isNative, userData]);

  return (
    <div
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={`flex flex-col 
       h-full  dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] text-black`}
    >
      <ScrollToTop />
      <MaybeShowComponent>
        <Navbar
          userData={userData}
          setTheme={setTheme}
          updateTheme={updateTheme}
        />
      </MaybeShowComponent>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home userData={userData} theme={theme} />} />
        <Route path="/about" element={<AboutPage theme={theme} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login authenticateUser={authenticateUser} />}
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/verify-email/:token"
          element={<VerifyEmail userData={userData} />}
        />
        <Route path="/unsubscribe-email" element={<UnsubscribeEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/ingredients-based"
          element={<IngredientsBased userData={userData} theme={theme} />}
        />
        <Route
          path="/metrics-based"
          element={<MetricsBased userData={userData} />}
        />
        <Route
          path="/recipe-details/:id"
          element={<RecipeDetails userData={userData} />}
        />
        {/* Protected routes */}
        {/* Dashboard layout with nested routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
              <DashboardLayout
                userData={userData}
                fetchUserData={authenticateUser}
                theme={theme}
                updateTheme={updateTheme}
                setTheme={setTheme}
                message={message}
                showNotificationBar={showNotificationBar}
                setShowNotificationBar={setShowNotificationBar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
              <PreferencesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pantry"
          element={
            <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
              <PantryItems theme={theme} />
            </ProtectedRoute>
          }
        />

        {/* Fallback route or 404 */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

      <MaybeShowComponent>
        <Footer />
      </MaybeShowComponent>
    </div>
  );
};

export default App;
