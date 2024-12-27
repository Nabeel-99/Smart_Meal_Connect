import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apiConfig";

const useUserMetrics = (isLoggedIn, ingredientCount, setCurrentPage) => {
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("weight_loss");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [exerciseLevel, setExerciseLevel] = useState("moderately_active");
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setError] = useState("");
  const TRY_LIMIT = 1;
  const [tryCount, setTryCount] = useState(
    () => parseInt(localStorage.getItem("tryCountMetrics")) || 0
  );

  useEffect(() => {
    getUserMetrics();
  }, []);

  const getUserMetrics = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/users/get-user-metrics`);
      if (response.status === 200) {
        const metrics = response.data.metrics;
        setAge(metrics.age || "");
        setHeight(metrics.height || "");
        setWeight(metrics.weight || "");
        setGender(metrics.gender || "");
        setGoal(metrics.goal || "");
        setExerciseLevel(metrics.exerciseLevel || "");
        setSelectedDietaryPreferences(metrics.dietaryPreferences || []);
      }
      if (response.status === 404) {
        console.log("User has no metrics");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async (e) => {
    e.preventDefault();
    if (!isLoggedIn && tryCount >= TRY_LIMIT) {
      setError(
        "Please create an account or login to continue using this feature."
      );
      setTimeout(() => {
        setError("");
      }, 10000);
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/recipes/get-metrics-recipes`,
        {
          gender: gender,
          age: age,
          height: height,
          weight: weight,
          goal: goal,
          exerciseLevel: exerciseLevel,
          dietaryPreferences: selectedDietaryPreferences,
          numberOfRecipes: ingredientCount,
        }
      );

      if (response.status === 200) {
        const recipes = response.data.recipes;
        sessionStorage.setItem("metricsBased", JSON.stringify(recipes));

        if (!isLoggedIn) {
          localStorage.setItem("tryCountMetrics", tryCount + 1);
          setTryCount((prevCount) => prevCount + 1);
        }

        setFetchedRecipes(recipes);
        setTotalRecipes(recipes.length);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError("Please fill out all fields.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return {
    fetchedRecipes,
    fetchRecipes,
    totalRecipes,
    age,
    setAge,
    goal,
    setGoal,
    height,
    setHeight,
    weight,
    setWeight,
    exerciseLevel,
    setExerciseLevel,
    selectedDietaryPreferences,
    setSelectedDietaryPreferences,
    gender,
    setGender,
    setFetchedRecipes,
    setTotalRecipes,
    loading,
    error,
  };
};

export default useUserMetrics;
