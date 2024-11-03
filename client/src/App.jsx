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
import { IonApp, IonContent, setupIonicReact } from "@ionic/react";
import { StatusBar } from "@capacitor/status-bar";
setupIonicReact();
const App = () => {
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  const authenticateUser = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await axios.get("http://localhost:8000/api/auth", {
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

  useEffect(() => {
    const setStatusBar = async () => {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: "#08090a" });
    };
    setStatusBar();
  }, []);

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <div
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className="flex  flex-col h-full w-screen  gap-10"
    >
      <Router>
        <ScrollToTop />
        <MaybeShowComponent>
          <Navbar userData={userData} />
        </MaybeShowComponent>

        <Routes>
          <Route path="/" element={<Home userData={userData} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login authenticateUser={authenticateUser} />}
          />

          <Route
            path="/*"
            element={
              <DashboardLayout
                userData={userData}
                fetchUserData={authenticateUser}
                theme={theme}
                updateTheme={updateTheme}
              />
            }
          />

          <Route path="preferences" element={<Preferences />} />
          <Route path="pantry" element={<PantryItems theme={theme} />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/verify-email/:token"
            element={<VerifyEmail userData={userData} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/ingredients-based"
            element={<IngredientsBased userData={userData} />}
          />
          <Route
            path="/metrics-based"
            element={<MetricsBased userData={userData} />}
          />
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        </Routes>
        <MaybeShowComponent>
          <Footer />
        </MaybeShowComponent>
      </Router>
    </div>
  );
};

export default App;
