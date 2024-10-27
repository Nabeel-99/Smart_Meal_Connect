import React, { useEffect, useRef, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { SiGreasyfork } from "react-icons/si";
import SkeletonLoader from "../../components/SkeletonLoader";
import { Link } from "react-router-dom";
import MealCard from "../../components/MealCard";
import PopperComponent from "../../components/PopperComponent";
import { MenuItem, MenuList } from "@mui/material";

const Dashboard = ({
  showOptions,
  showGridView,
  showListView,
  viewOptions,
  gridView,
  listView,
  dashboardRecipes,
  setViewOptions,
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
    <div className="flex flex-col h-full gap-8 pt-28 px-6 lg:px-10">
      <div className="flex flex-col xl:flex-row lg:items-center gap-4 w-full lg:gap-10">
        <div className="flex flex-col gap-5  md:grid grid-cols-2 w-full items-center lg:gap-10 ">
          <Link
            to={"/ingredients-based"}
            className="border dark:border-[#1d1d1d] border-[#e0e0e0] dark:bg-[#2e2e2e] bg-[#ededed] dark:hover:bg-[#5a4bc8] hover:bg-[#5a4bc8] transition-all duration-300 hover:text-white w-full rounded-lg h-20 xl:w-64 flex items-center justify-center gap-3"
          >
            <SiGreasyfork className="text-3xl " />
            <div className="font-semibold">Get Meal By Ingredients</div>
          </Link>
          <Link
            to={"/metrics-based"}
            className="border dark:border-[#1d1d1d] border-[#e0e0e0] dark:bg-[#2e2e2e] bg-[#ededed] dark:hover:bg-[#d08824]  hover:bg-[#d08824] transition-all duration-300 hover:text-white w-full rounded-lg h-20 xl:w-64 flex items-center justify-center gap-3"
          >
            <SiGreasyfork className="text-3xl" />
            <div className="font-semibold">Get Meal By Body Metrics</div>
          </Link>
        </div>
        <div className="flex flex-col xl:flex-row items-center w-full gap-3">
          <div className="font-semibold">Calories Target</div>
          <div className="border dark:border-[#1d1d1d] border-[#e0e0e0] px-1 w-full xl:w-96 h-10  flex items-center rounded-full">
            <div
              style={{ width: `${caloriePercentage}%` }}
              className="h-8 rounded-full bg-gradient-to-r from-red-500  via-orange-400 via-10%  to-green-600 to-90% flex items-center justify-center transition-all duration-500 ease-in-out"
            >
              <div className="text-sm font-bold w-full text-nowrap text-center">
                {caloriesConsumed.toFixed(0)}/{calorieTargetTotal.toFixed(0)}{" "}
                calories
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full sticky top-[60px] lg:top-[40px] z-10 dark:bg-[#0c0c0c] bg-[#F7F7F8] pb-3 lg:pb-5  h-full gap-4">
        <div className="text-xl lg:text-3xl font-bold pt-6 lg:pt-10">
          Personalized Meal Suggestions for You
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center  lg:justify-between">
          <div className="flex items-center justify-between   lg:justify-normal gap-4">
            <div className="relative flex items-center gap-2">
              <button
                onClick={showBreakfast}
                className={` px-3 py-1  rounded-md dark:hover:bg-[#181818] hover:bg-[#dadada] ${
                  breakfast
                    ? "border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] border-[#e0e0e0] bg-[#dadada]  "
                    : ""
                }`}
              >
                Breakfast
              </button>
              <button
                onClick={showLunch}
                className={` px-3 py-1  rounded-md dark:hover:bg-[#181818] hover:bg-[#dadada] ${
                  lunch
                    ? "border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] border-[#e0e0e0] bg-[#dadada] "
                    : ""
                }`}
              >
                Lunch
              </button>
              <button
                onClick={showDinner}
                className={` px-3 py-1  rounded-md dark:hover:bg-[#181818] hover:bg-[#dadada] ${
                  dinner
                    ? "border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] border-[#e0e0e0] bg-[#dadada] "
                    : ""
                }`}
              >
                Dinner
              </button>
            </div>
            <div className="lg:hidden flex items-center  gap-2">
              <button ref={anchorRef} onClick={showOptions}>
                <LuArrowDownWideNarrow />
              </button>
              {viewOptions && (
                <PopperComponent
                  viewPopper={viewOptions}
                  anchorRef={anchorRef}
                  setViewPopper={setViewOptions}
                >
                  <MenuList className="absolute right-0 top-10 p-4 dark:bg-[#08090a] bg-[#F7F7F8] text-black dark:text-white border dark:border-[#1d1d1d] border-[#e0e0e0] flex flex-col gap-4 rounded-md">
                    <MenuItem
                      onClick={showGridView}
                      className="flex items-center text-sm gap-4"
                    >
                      <CiGrid41 />
                      Grid view
                    </MenuItem>
                    <MenuItem
                      onClick={showListView}
                      className="flex items-center text-sm gap-4"
                    >
                      <HiBars3 />
                      List View
                    </MenuItem>
                  </MenuList>
                </PopperComponent>
              )}
            </div>
          </div>
          <div className="flex items-center gap-10">
            {selectedRecipes.length > 0 && (
              <div className="text-sm  py-2 border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] dark:hover:bg-[#181818] hover:bg-[#bebdbd] border-[#e0e0e0] bg-[#dadada] font-semibold  px-4 rounded-md">
                <button onClick={uncheckAllRecipes}>Uncheck All</button>
              </div>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={showGridView}>
                <CiGrid41 />
              </button>
              <button onClick={showListView}>
                {" "}
                <HiBars3 className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
      {/* <div className="">
          <div className="pb-2">
            <img
              src={""}
              alt=""
              className="w-full h-[250px] object-cover rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>Chicken Sandwich</div>
              <input type="checkbox" />
            </div>
            <div>600 calories</div>
          </div>
        </div> */}

      {/* <SkeletonLoader
        count={12}
        className="w-full"
        isGridView={gridView}
        isListView={listView}
      /> */}
    </div>
  );
};

export default Dashboard;
