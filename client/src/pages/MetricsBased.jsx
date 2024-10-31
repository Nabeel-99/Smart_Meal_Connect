import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import GetStartedSection from "../components/GetStartedSection";
import RecipeResults from "../components/viewCards/RecipeResults";
import MetricsForm from "../components/forms/MetricsForm";
import MetricsHeader from "../components/headers/MetricsHeader";

const MetricsBased = ({ userData }) => {
  let gridView = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredientCount, setIngredientCount] = useState(() =>
    isLoggedIn ? 24 : 10
  );
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("weight_loss");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [exerciseLevel, setExerciseLevel] = useState("moderately_active");
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setError] = useState("");
  const [tryCount, setTryCount] = useState(
    () => parseInt(localStorage.getItem("tryCountMetrics")) || 0
  );
  const cardRef = useRef(null);
  const TRY_LIMIT = 1;

  const getUserMetrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/get-user-metrics",
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("user metrics", response.data);
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

  const incrementCount = () => {
    setIngredientCount(ingredientCount + 1);
    if (ingredientCount >= 30) {
      setIngredientCount(30);
    }
  };
  const decrementCount = () => {
    setIngredientCount(ingredientCount - 1);
    if (ingredientCount <= 0) {
      setIngredientCount(0);
    }
  };
  const handleChecboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDietaryPreferences((prev) =>
      checked ? [...prev, id] : prev.filter((pref) => pref !== id)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("fields", gender, age, height, weight, goal, exerciseLevel);
    if (!isLoggedIn && tryCount >= TRY_LIMIT) {
      setError("Please create an account to continue using this feature.");
      setTimeout(() => {
        setError("");
      }, 10000);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/recipes/get-metrics-recipes",
        {
          gender: gender,
          age: age,
          height: height,
          weight: weight,
          goal: goal,
          exerciseLevel: exerciseLevel,
          dietaryPreferences: selectedDietaryPreferences,
          numberOfRecipes: ingredientCount,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.status === 200) {
        const recipes = response.data.recipes;
        sessionStorage.setItem("metricsBased", JSON.stringify(recipes));
        localStorage.setItem("tryCountMetrics", tryCount + 1);
        setTryCount((prevCount) => prevCount + 1);
        setFetchedRecipes(recipes);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserMetrics();
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  useEffect(() => {
    setIngredientCount(isLoggedIn ? 24 : 10);
  }, [isLoggedIn]);

  useEffect(() => {
    const storedRecipes = sessionStorage.getItem("metricsBased");
    if (storedRecipes) {
      setFetchedRecipes(JSON.parse(storedRecipes));
    }
  }, []);
  return (
    <div className="overflow-hidden flex flex-col gap-8 pt-8 justify-center items-center">
      <MetricsHeader />
      <div className="flex flex-col gap-6 items-center  w-full px-2 lg:px-44">
        <div className=" lg:relative border border-[#1d1d1d] w-96  md:w-auto   rounded-xl py-2 px-2 bg-[#0E0F10] min-h-[700px] h-full  ">
          <MetricsForm
            onSubmit={onSubmit}
            gender={gender}
            setGender={setGender}
            goal={goal}
            setGoal={setGoal}
            age={age}
            setAge={setAge}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            exerciseLevel={exerciseLevel}
            setExerciseLevel={setExerciseLevel}
            selectedDietaryPreferences={selectedDietaryPreferences}
            decrementCount={decrementCount}
            incrementCount={incrementCount}
            ingredientCount={ingredientCount}
            setIngredientCount={setIngredientCount}
            isLoggedIn={isLoggedIn}
            error={error}
            loading={loading}
            handleChecboxChange={handleChecboxChange}
          />
        </div>
        {/* showing results */}
        <RecipeResults
          cardRef={cardRef}
          loading={loading}
          fetchedRecipes={fetchedRecipes}
          gridView={gridView}
          sourceType={"metricsBased"}
        />
      </div>
      {!isLoggedIn && <GetStartedSection />}
    </div>
  );
};

export default MetricsBased;
