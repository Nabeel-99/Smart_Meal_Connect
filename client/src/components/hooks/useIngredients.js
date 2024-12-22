import { useState } from "react";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [item, setItem] = useState("");
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );

  const addIngredient = () => {
    if (item && !ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
      setItem("");
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDietaryPreferences((prev) =>
      checked ? [...prev, id] : prev.filter((pref) => pref !== id)
    );
  };

  return {
    ingredients,
    setIngredients,
    item,
    setItem,
    selectedDietaryPreferences,
    addIngredient,
    removeIngredient,
    handleCheckboxChange,
  };
};

export default useIngredients;
