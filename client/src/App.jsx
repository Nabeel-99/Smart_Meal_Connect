import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "@ionic/react/css/core.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/authPages/SignUp";
import MaybeShowComponent from "./components/MaybeShowComponent";
import Login from "./pages/authPages/Login";
import ResetPassword from "./pages/authPages/ResetPassword";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import IngredientsBased from "./pages/IngredientsBased";
import Home from "./pages/Home";
import MetricsBased from "./pages/MetricsBased";
import ScrollToTop from "./components/ScrollToTop";
import RecipeDetails from "./pages/RecipeDetails";
import Preferences from "./pages/Preferences";
import axios from "axios";
import PantryItems from "./pages/PantryItems";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import VerifyEmail from "./pages/authPages/VerifyEmail";
import { PushNotifications } from "@capacitor/push-notifications";
import { StatusBar } from "@capacitor/status-bar";
import BASE_URL, { isNative } from "../apiConfig";
import { Toast } from "@capacitor/toast";
import ProtectedRoute from "./pages/ProtectedRoute";

/**
 * @typedef {import('@capacitor/push-notifications').PushNotificationSchema} PushNotificationSchema
 * @typedef {import('@capacitor/push-notifications').Token} Token
 * @typedef {import('@capacitor/push-notifications').ActionPerformed} ActionPerformed
 */
const App = () => {
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  const authenticateUser = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/auth`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.log("Auth error", error);
    } finally {
      setIsFetching(false);
    }
  };

  // app theme
  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const systemMode = () => {
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(isSystemDark ? "dark" : "light");
  };

  const updateTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    if (selectedTheme === "light" || selectedTheme === "dark") {
      applyTheme(selectedTheme);
      localStorage.setItem("theme", selectedTheme);
    } else if (selectedTheme === "system") {
      localStorage.removeItem("theme");
      systemMode();
    }
  };

  /**
   * Handle push received
   * @param {import('@capacitor/push-notifications').PushNotificationSchema} notification
   */
  const handlePushReceived = async (notification) => {
    console.log("Push notification received:", notification);
    const message = notification.body || "You have a new notification!";

    await Toast.show({
      text: message,
      duration: "long",
      position: "top",
    });
  };

  useEffect(() => {
    console.log("Initializing HomePage");
    if (isNative && userData) {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener(
        "registration",
        /** @param {Token} token */ (token) => {
          saveToken(token.value);
          console.log("push registration token", token.value);
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener("registrationError", (error) => {
        alert("Error on registration: " + JSON.stringify(error));
      });

      const message = firebase.messaging();
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        "pushNotificationReceived",
        handlePushReceived
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        /** @param {ActionPerformed} notification */ (notification) => {
          alert("Push action performed: " + JSON.stringify(notification));
          console.log("push action", JSON.stringify(notification));
        }
      );
    }
  }, []);
  const saveToken = async (token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/save-notification-token`,
        {
          fcmToken: token,
        },
        { withCredentials: true }
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error saving token", error);
    }
  };
  useEffect(() => {
    if (theme === "system") {
      systemMode();
    } else {
      applyTheme(theme);
    }

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
  }, [theme]);

  // useEffect(() => {
  //   const setStatusBar = async () => {
  //     await StatusBar.setStyle({ style: Style.Dark });
  //     await StatusBar.setBackgroundColor({ color: "#08090a" });
  //   };
  //   setStatusBar();
  // }, []);

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    if (userData) {
      window.location = "/dashboard";
    }
  }, []);

  const isAuthenticated = Boolean(userData);
  return (
    <div
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className="flex flex-col h-full w-screen dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] text-black"
    >
      <Router>
        <ScrollToTop />
        <MaybeShowComponent>
          <Navbar userData={userData} />
        </MaybeShowComponent>

        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={<Home userData={userData} theme={theme} />}
          />
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
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          {/* Dashboard layout with nested routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout
                  userData={userData}
                  fetchUserData={authenticateUser}
                  theme={theme}
                  updateTheme={updateTheme}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preferences"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Preferences />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pantry"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PantryItems theme={theme} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ingredients-based"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <IngredientsBased userData={userData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/metrics-based"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MetricsBased userData={userData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe-details/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <RecipeDetails userData={userData} />
              </ProtectedRoute>
            }
          />

          {/* Fallback route or 404 */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>

        <MaybeShowComponent>
          <Footer />
        </MaybeShowComponent>
      </Router>
    </div>
  );
};

export default App;
