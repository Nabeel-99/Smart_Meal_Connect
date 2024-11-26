import React, { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "../../components/viewCards/MealCard";
import DialogComponent from "../../components/popupCards/DialogComponent";
import SavedMealsHeader from "../../components/headers/SavedMealsHeader";
import MealSkeletonLoader from "../../components/skeletons/MealSkeletonLoader";
import BASE_URL, { axiosInstance } from "../../../apiConfig";
import AutoHideSnackbar from "../../components/popupCards/AutoHideSnackbar";

const SavedMeals = ({
  showGridView,
  showListView,
  gridView,
  listView,
  setSuccessMessage,
  setShowSuccessSnackbar,
}) => {
  const [viewOptions, setViewOptions] = useState(false);
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDialog = (id) => {
    setSelectedId(id);
    setShowDialog(true);
  };
  const showOptions = () => setViewOptions(!viewOptions);
  const fetchSavedRecipes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/recipes/get-saved-recipes`
      );
      console.log(response.data);
      setSavedMeals(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const deleteRecipe = async () => {
    try {
      const response = await axiosInstance.post(`/api/recipes/delete-recipe`, {
        id: selectedId,
      });
      console.log(response.data);
      if (response.status === 200) {
        setShowDialog(false);
        setSelectedId(null);
        fetchSavedRecipes();
        setSuccessMessage("Meal deleted successfully");
        setShowSuccessSnackbar(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("selected Id", selectedId);
  useEffect(() => {
    fetchSavedRecipes();
  }, []);
  return (
    <div className="flex flex-col h-full gap-8 pt-28 px-6 lg:px-10">
      <SavedMealsHeader
        showGridView={showGridView}
        showListView={showListView}
      />

      {loading ? (
        <MealSkeletonLoader count={3} />
      ) : savedMeals.length > 0 ? (
        <MealCard
          meals={savedMeals}
          isGridView={gridView}
          isListView={listView}
          showTrash={true}
          openDialog={openDialog}
        />
      ) : (
        <div>
          <p className="text-sm text-left text-[#808080]">No saved meals</p>
        </div>
      )}
      <DialogComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleAction={() => deleteRecipe(selectedId)}
        title={"Are you sure you want to delete?"}
      />
    </div>
  );
};

export default SavedMeals;
