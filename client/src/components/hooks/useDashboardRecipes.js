import { useState } from "react";
import { axiosInstance } from "../../../apiConfig";

const useDashboardRecipes = () => {
  const [dashboardRecipes, setDashboardRecipes] = useState([]);
  const [fetchingInProgress, setFetchingInProgress] = useState(false);

  const fetchUserDashboardRecipes = async () => {
    if (fetchingInProgress) return;
    setFetchingInProgress(true);
    try {
      const response = await axiosInstance.get(
        `/api/recipes/dashboard-recipes`
      );
      if (response.status === 200) {
        const filteredBreakfast = (
          response.data.recipes?.breakfast || []
        ).filter((meal) => meal !== null);
        const filteredLunch = (response.data.recipes?.lunch || []).filter(
          (meal) => meal !== null
        );
        const filteredDinner = (response.data.recipes?.dinner || []).filter(
          (meal) => meal !== null
        );

        setDashboardRecipes({
          ...response.data,
          recipes: {
            breakfast: filteredBreakfast,
            lunch: filteredLunch,
            dinner: filteredDinner,
          },
        });
        if (response.data.deleteConsumedCalories) {
          localStorage.removeItem("caloriesConsumed");
          localStorage.removeItem("checkedMeals");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingInProgress(false);
    }
  };

  return {
    dashboardRecipes,
    fetchingInProgress,
    fetchUserDashboardRecipes,
  };
};

export default useDashboardRecipes;
