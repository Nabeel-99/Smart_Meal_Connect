import React, { useEffect, useRef, useState } from "react";
import MealCard from "../../components/viewCards/MealCard";
import IngredientsMetricsButtons from "../../components/buttons/IngredientsMetricsButtons";
import CaloriesBar from "../../components/headers/CaloriesBar";
import MealViewOptions from "../../components/viewCards/MealViewOptions";
import PreferencePrompt from "../../components/PreferencePrompt";
import EmailPrompt from "../../components/EmailPrompt";
import MealSkeletonLoader from "../../components/MealSkeletonLoader";

const Dashboard = ({
  showOptions,
  showGridView,
  showListView,
  viewOptions,
  gridView,
  listView,
  dashboardRecipes,
  setViewOptions,
  showMetricsPrompt,
  setShowMetricsPrompt,
  showVerifyEmail,
  setShowVerifyEmail,
  userData,
  fetchingInProgress,
}) => {
  let breakfastMeals = dashboardRecipes.recipes?.breakfast || [];
  let lunchMeals = dashboardRecipes.recipes?.lunch || [];
  let dinnerMeals = dashboardRecipes.recipes?.dinner || [];
  let calorieTargetTotal = Number(dashboardRecipes?.calorieTarget) || 0;

  const [breakfast, setBreakfast] = useState(true);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState(
    JSON.parse(localStorage.getItem("checkedMeals")) || []
  );
  const [caloriesConsumed, setCaloriesConsumed] = useState(
    Number(localStorage.getItem("caloriesConsumed")) || 0
  );
  const anchorRef = useRef(null);

  const handleChecboxChange = (meal) => {
    const calories = meal.calories;
    const isSelected = selectedRecipes.includes(meal._id);

    if (!isSelected) {
      setCaloriesConsumed((prev) => prev + calories);
      setSelectedRecipes((prev) => [...prev, meal._id]);
    } else {
      setCaloriesConsumed((prev) => prev - calories);
      setSelectedRecipes((prev) => prev.filter((id) => id !== meal._id));
    }
  };
  const uncheckAllRecipes = () => {
    setSelectedRecipes([]);
    setCaloriesConsumed(0);
  };
  const showBreakfast = () => {
    setBreakfast(true);
    setLunch(false);
    setDinner(false);
  };
  const showLunch = () => {
    setBreakfast(false);
    setLunch(true);
    setDinner(false);
  };
  const showDinner = () => {
    setBreakfast(false);
    setLunch(false);
    setDinner(true);
  };
  const caloriePercentage = (caloriesConsumed / calorieTargetTotal) * 100;

  useEffect(() => {
    localStorage.setItem("caloriesConsumed", caloriesConsumed);
    localStorage.setItem("checkedMeals", JSON.stringify(selectedRecipes));
  }, [caloriesConsumed, selectedRecipes]);

  return (
    <div className="flex flex-col h-full  pb-10 gap-8 pt-28 px-6 lg:px-10">
      <div className="flex flex-col xl:flex-row lg:items-center gap-4 w-full lg:gap-10 2xl:gap-0">
        <IngredientsMetricsButtons />
        <CaloriesBar
          caloriePercentage={caloriePercentage}
          calorieTargetTotal={calorieTargetTotal}
          caloriesConsumed={caloriesConsumed}
        />
      </div>
      <PreferencePrompt showMetricsPrompt={showMetricsPrompt} />
      <EmailPrompt
        showVerifyEmail={showVerifyEmail}
        setShowVerifyEmail={setShowVerifyEmail}
        userData={userData}
      />
      <MealViewOptions
        showLunch={showLunch}
        showBreakfast={showBreakfast}
        showDinner={showDinner}
        anchorRef={anchorRef}
        showOptions={showOptions}
        viewOptions={viewOptions}
        showGridView={showGridView}
        showListView={showListView}
        uncheckAllRecipes={uncheckAllRecipes}
        selectedRecipes={selectedRecipes}
        setViewOptions={setViewOptions}
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
      />

      {fetchingInProgress ? (
        <MealSkeletonLoader
          count={18}
          className="w-full"
          isGridView={gridView}
          isListView={listView}
        />
      ) : (
        <>
          {breakfast && breakfastMeals.length > 0 && (
            <MealCard
              meals={breakfastMeals}
              showInput={true}
              isGridView={gridView}
              isListView={listView}
              handleChecboxChange={handleChecboxChange}
              selectedRecipes={selectedRecipes}
            />
          )}
          {lunch && lunchMeals.length > 0 && (
            <MealCard
              meals={lunchMeals}
              showInput={true}
              isGridView={gridView}
              isListView={listView}
              handleChecboxChange={handleChecboxChange}
              selectedRecipes={selectedRecipes}
            />
          )}
          {dinner && dinnerMeals.length > 0 && (
            <MealCard
              meals={dinnerMeals}
              showInput={true}
              isGridView={gridView}
              isListView={listView}
              handleChecboxChange={handleChecboxChange}
              selectedRecipes={selectedRecipes}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
