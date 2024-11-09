import React, { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "../../components/viewCards/MealCard";
import DialogComponent from "../../components/popupCards/DialogComponent";
import SavedMealsHeader from "../../components/headers/SavedMealsHeader";
import MealSkeletonLoader from "../../components/MealSkeletonLoader";
import BASE_URL from "../../../apiConfig";

const SavedMeals = ({ showGridView, showListView, gridView, listView }) => {
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
      const response = await axios.get(
        `${BASE_URL}/api/recipes/get-saved-recipes`,
        { withCredentials: true }
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
      const response = await axios.post(
        `${BASE_URL}/api/recipes/delete-recipe`,
        {
          id: selectedId,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.status === 200) {
        setShowDialog(false);
        setSelectedId(null);
        fetchSavedRecipes();
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
        <MealSkeletonLoader count={savedMeals?.length} />
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
