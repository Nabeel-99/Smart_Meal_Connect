import React, { useEffect, useState } from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import AnimationComponent from "../components/AnimationComponent";
import axios from "axios";
import PreferenceForm from "../components/forms/PreferenceForm";
import BASE_URL from "../../apiConfig";

const Preferences = () => {
  const [getStarted, setGetStarted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(18);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [exerciseLevel, setExerciseLevel] = useState("moderately_active");
  const [goal, setGoal] = useState("weight_loss");
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );

  const navigate = useNavigate();

  const handleDietaryPreferenceChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDietaryPreferences((prev) =>
      checked ? [...prev, id] : prev.filter((pref) => pref !== id)
    );
  };

  const skipToDashboard = () => {
    navigate("/pantry");
    handleSubmit({ preventDefault: () => {} }, true);
  };

  const handleSubmit = async (e, skipped = false) => {
    e.preventDefault();
    setLoading(true);
    console.log({
      gender,
      age,
      weight,
      height,
      exerciseLevel,
      goal,
      dietaryPreferences: selectedDietaryPreferences,
      defaultMetrics: skipped,
    });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/create-metrics`,
        {
          gender: gender || "male",
          age: age || 18,
          weight: weight || 70,
          height: height || 170,
          exerciseLevel: exerciseLevel || "moderately_active",
          goal: goal || "weight_loss",
          dietaryPreferences: selectedDietaryPreferences || [],
          defaultMetrics: skipped,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoading(true);
        setTimeout(() => {
          navigate("/pantry");
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setGetStarted(false);
    }, 6000);
  }, []);

  return (
    <div className="flex flex-col gap-20  w-full 2xl:container 2xl:mx-auto  px-8 lg:px-24">
      {getStarted ? (
        <AnimationComponent />
      ) : (
        <div className="flex flex-col gap-8 pt-32 md:pt-28  lg:gap-0 lg:flex-row items-center justify-evenly 2xl:justify-center 2xl:gap-40 ">
          <div className="flex flex-col items-center w-full md:w-1/2 lg:w-auto   h-full lg:justify-center gap-2">
            <div className="flex flex-col  w-full gap-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Set up your <span className="block">Preferences</span>
              </h1>
              <p className="">
                We recommend setting up your preferences to{" "}
                <span className="block">help us tailor your experience. </span>
              </p>
            </div>
            <div className="mt-8 mr-4 hidden md:block">
              <SiGreasyfork className="text-2xl lg:text-8xl backdrop-blur-lg" />
            </div>
          </div>
          <div className=" w-[0.8px] h-full bg-[#343333]"></div>
          <div className="w-full md:w-1/2 lg:w-auto">
            <PreferenceForm
              handleSubmit={handleSubmit}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              exerciseLevel={exerciseLevel}
              goal={goal}
              setGoal={setGoal}
              setExerciseLevel={setExerciseLevel}
              handleDietaryPreferenceChange={handleDietaryPreferenceChange}
              loading={loading}
            />
            <div className="pt-10 flex justify-end items-end">
              <button
                type="button"
                onClick={skipToDashboard}
                className="text-[#A3A3A3] flex justify-end pb-6"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
