import React, { useEffect, useRef, useState } from "react";
import { FaBarsStaggered, FaRegHeart, FaXmark } from "react-icons/fa6";
import SavedMeals from "./SavedMeals";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileSideMenu from "../../components/menuCards/MobileSideMenu";
import SideMenu from "../../components/menuCards/SideMenu";
import Settings from "./Settings";
import { Routes, Route } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import PantryPage from "./PantryPage";
import DialogComponent from "../../components/DialogComponent";
import PopperComponent from "../../components/PopperComponent";
import ModalComponent from "../../components/ModalComponent";
import Profile from "./Profile";
import MobileNotificationCard from "../../components/MobileNotificationCard";
import PostForm from "../../components/PostForm";
import Dashboard from "./Dashboard";
import Feeds from "./Feeds";

const DashboardLayout = ({ userData, fetchUserData, theme, updateTheme }) => {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [listView, setListView] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [viewOptions, setViewOptions] = useState(false);
  const [userMetrics, setUserMetrics] = useState(null);
  const [dashboardRecipes, setDashboardRecipes] = useState([]);
  const [fetchingInProgress, setFetchingInProgress] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [item, setItem] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [prepTime, setPrepTime] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const anchorRef = useRef(null);

  const navigate = useNavigate();

  const addIngredient = () => {
    if (item && !ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
      setItem("");
    }
  };
  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const showPostModal = () => setCreatePost(!createPost);

  const showNotifications = () => setViewNotifications(!viewNotifications);

  const openDialog = () => {
    setShowDialog(true);
  };

  const showListView = () => {
    setListView(true);
    setGridView(false);
    setViewOptions(false);
  };
  const showGridView = () => {
    setGridView(true);
    setListView(false);
    setViewOptions(false);
  };
  const showOptions = () => setViewOptions(!viewOptions);
  const showSideMenu = () => setSideMenu(!sideMenu);
  const showPreferences = () => setPreferences(!preferences);
  const location = useLocation();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        null,
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserMetrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/get-user-metrics",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserMetrics(response.data.metrics);
      }
      if (response.status === 404) {
        console.log("User has no metrics");

        setUserMetrics("You haven't set your preferences yet.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDashboardRecipes = async () => {
    if (fetchingInProgress) return;
    setFetchingInProgress(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/recipes/dashboard-recipes",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDashboardRecipes(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingInProgress(false);
    }
  };

  const getCurrentView = () => {
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/saved-meals") return "Saved Meals";
    if (location.pathname === "/settings") return "Settings";
    if (location.pathname === "/pantry-items") return "Pantry";
  };

  const renderContentView = () => {
    return (
      <Routes>
        <Route
          path="dashboard"
          element={
            <Dashboard
              showOptions={showOptions}
              showGridView={showGridView}
              showListView={showListView}
              setViewOptions={setViewOptions}
              viewOptions={viewOptions}
              gridView={gridView}
              listView={listView}
              dashboardRecipes={dashboardRecipes}
            />
          }
        />
        <Route
          path="feeds"
          element={
            <Feeds
              anchorRef={anchorRef}
              showNotifications={showNotifications}
              currentUserId={userData._id}
              showPostModal={showPostModal}
              theme={theme}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              theme={theme}
              setCreatePost={setCreatePost}
              currentUserId={userData._id}
            />
          }
        />
        <Route path="/profile/:id" element={<Profile />} />

        <Route
          path="saved-meals"
          element={
            <SavedMeals
              showGridView={showGridView}
              showListView={showListView}
              gridView={gridView}
              listView={listView}
            />
          }
        />
        <Route
          path="settings"
          element={
            <Settings
              userData={userData}
              refreshUserData={fetchUserData}
              userMetrics={userMetrics}
              refreshSideMenu={getUserMetrics}
              updateTheme={updateTheme}
              theme={theme}
            />
          }
        />
        <Route path="pantry-items" element={<PantryPage theme={theme} />} />
      </Routes>
    );
  };

  useEffect(() => {
    getUserMetrics();
  }, []);

  useEffect(() => {
    fetchUserDashboardRecipes();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (userMetrics) {
      const refetchData = async () => await fetchUserData();
      refetchData();
    }
  }, [userMetrics]);

  useEffect(() => {
    if (sideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sideMenu]);

  if (loading || !userData || !userMetrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AiOutlineLoading3Quarters className="spin text-3xl" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] text-black w-full  gap-10">
        {/* side Menu */}
        {userData && userMetrics && (
          <SideMenu
            theme={theme}
            userData={userData}
            userMetrics={userMetrics}
            showPreferences={showPreferences}
            preferences={preferences}
            openDialog={openDialog}
            showPostModal={showPostModal}
          />
        )}

        <div className="lg:hidden pt-6 pl-6 flex items-center text-sm gap-4 border-b pb-3 dark:border-b-[#343333] border-b-[#E0E0E0] fixed  dark:bg-[#0c0c0c] bg-white z-50 w-full">
          <div className="flex items-center">
            <button onClick={showSideMenu} className="">
              {sideMenu ? (
                <FaXmark className="text-2xl" />
              ) : (
                <FaBarsStaggered className="text-2xl" />
              )}
            </button>
            {location.pathname === "/feeds" && (
              <button
                ref={anchorRef}
                onClick={showNotifications}
                className="fixed right-5"
              >
                <FaRegHeart className="text-2xl" />
              </button>
            )}
            {viewNotifications && (
              <PopperComponent
                viewPopper={viewNotifications}
                anchorRef={anchorRef}
                setViewPopper={setViewNotifications}
              >
                <MobileNotificationCard />
              </PopperComponent>
            )}
          </div>
          <div className="mb-1 text-lg">{getCurrentView()}</div>
        </div>
        {/* mobile side menu */}
        {sideMenu && userData && userMetrics && (
          <MobileSideMenu
            theme={theme}
            userData={userData}
            userMetrics={userMetrics}
            showPreferences={showPreferences}
            preferences={preferences}
            setSideMenu={setSideMenu}
            openDialog={openDialog}
            showPostModal={showPostModal}
          />
        )}
        {/* Outlet */}
        <div className="dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] lg:pl-64 flex flex-col min-h-screen pb-8 w-full">
          <div
            className={`hidden lg:block   pb-6  z-30 w-full ${
              location.pathname === "/feeds"
                ? ""
                : "border-b dark:border-b-[#1d1d1d] border-b-[#E0E0E0] fixed dark:bg-[#0c0c0c] bg-[#F7F7F8]   pt-6"
            }`}
          >
            <div className="px-10 text-sm">{getCurrentView()}</div>
          </div>
          {renderContentView()}
        </div>
      </div>
      {showDialog && (
        <DialogComponent
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleAction={handleLogout}
          title={"Arer you sure you want to log out?"}
        />
      )}
      {createPost && (
        <ModalComponent
          theme={theme}
          showModal={createPost}
          setShowModal={setCreatePost}
        >
          <PostForm
            theme={theme}
            setCreatePost={setCreatePost}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setSuccessMessage={setSuccessMessage}
          />
        </ModalComponent>
      )}
      {showSuccessSnackbar && (
        <AutoHideSnackbar
          message={successMessage}
          setSnackbar={setShowSuccessSnackbar}
          openSnackbar={showSuccessSnackbar}
        />
      )}
    </>
  );
};

export default DashboardLayout;
