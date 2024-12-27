import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import GetStartedSection from "../../components/ui/GetStartedSection";
import RecipeResults from "../../components/viewCards/RecipeResults";
import MetricsForm from "../../components/forms/MetricsForm";
import MetricsHeader from "../../components/headers/MetricsHeader";
import ShowMoreButton from "../../components/buttons/ShowMoreButton";
import BASE_URL, { axiosInstance } from "../../../apiConfig";
import RecipeResultsContainer from "../../components/recipeDetailsCards/RecipeResultsContainer";
import { motion } from "framer-motion";
import usePagination from "../../components/hooks/usePagination";
import useUserMetrics from "../../components/hooks/useUserMetrics";

const MetricsBased = ({ userData }) => {
  let gridView = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ingredientCount, setIngredientCount] = useState(() =>
    isLoggedIn ? 24 : 10
  );
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("metricsCurrentPage")) || 1
  );
  const incrementCount = () => {
    setIngredientCount(ingredientCount + 1);
    if (ingredientCount >= 60) {
      setIngredientCount(60);
    }
  };
  const decrementCount = () => {
    setIngredientCount(ingredientCount - 1);
    if (ingredientCount <= 0) {
      setIngredientCount(0);
    }
  };
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDietaryPreferences((prev) =>
      checked ? [...prev, id] : prev.filter((pref) => pref !== id)
    );
  };

  const cardRef = useRef(null);

  const {
    fetchedRecipes,
    setFetchedRecipes,
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
    setTotalRecipes,
    loading,
    error,
  } = useUserMetrics(isLoggedIn, ingredientCount, setCurrentPage);

  const { paginatedRecipes, handleNextPage, handlePreviousPage, totalPages } =
    usePagination(
      "metricsCurrentPage",
      "metricsBased",
      currentPage,
      setCurrentPage,
      setFetchedRecipes,
      fetchedRecipes,
      setTotalRecipes
    );

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

  return (
    <div className="overflow-hidden flex flex-col gap-8 pt-8 justify-center items-center">
      <MetricsHeader />
      <div className="flex flex-col gap-6 items-center  w-full px-2 lg:px-44">
        <motion.div
          initial={{ marginTop: "40%" }}
          animate={{ marginTop: "10%" }}
          transition={{
            duration: 1,
            delay: 0.5,
            stiffness: 50,
            type: "spring",
          }}
          className=" lg:relative border bg-[#e0e0e0] dark:border-[#1d1d1d] w-96  md:w-auto   rounded-xl py-2 px-2 dark:bg-[#0E0F10] min-h-[700px] h-full  "
        >
          <MetricsForm
            fetchRecipes={fetchRecipes}
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
            handleCheckboxChange={handleCheckboxChange}
          />
        </motion.div>

        {/* showing results */}
        <RecipeResultsContainer
          fetchedRecipes={fetchedRecipes}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          cardRef={cardRef}
          loading={loading}
          paginatedRecipes={paginatedRecipes}
          gridView={gridView}
          sourceType={"metricsBased"}
          totalRecipes={totalRecipes}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
        />
      </div>
      {!isLoggedIn && <GetStartedSection />}
    </div>
  );
};

export default MetricsBased;
