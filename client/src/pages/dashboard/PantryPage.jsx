import axios from "axios";
import React, { useEffect, useState } from "react";
import pantryItems from "../../../../server/utils/pantry.json";
import AutoHideSnackbar from "../../components/popupCards/AutoHideSnackbar";
import SelectedPantryItems from "../../components/pantry/SelectedPantryItems";
import PantrySelection from "../../components/pantry/PantrySelection";
import ingredientsData from "../../../../server/utils/ingredientsHelper.json";
import BASE_URL, { isNative } from "../../../apiConfig";

const PantryPage = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [customItems, setCustomItems] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isEditingPantry, setIsEditingPantry] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showEditPantry = () => setIsEditingPantry(!isEditingPantry);
  const fetchPantryItems = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/get-user-pantry`,
        { withCredentials: true }
      );
      console.log(response.data);
      setSelectedItems(response.data.userPantry.items);
    } catch (error) {
      console.log(error);
    }
  };
  const updatePantry = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/users/update-pantry`,
        {
          items: selectedItems,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsEditingPantry(false);
        setShowSnackbar(true);
        setSnackbarMessage("Pantry updated");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const selectAllPantry = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems([...new Set([...selectedItems, ...pantryItems.pantry])]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => !pantryItems.pantry.includes(item))
      );
    }
  };
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItems((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const removeItem = (item) => {
    setSelectedItems((prevSelected) => prevSelected.filter((i) => i !== item));
    setCustomItems((prevCustom) => prevCustom.filter((i) => i !== item));
  };
  const addToPantry = () => {
    if (item && !selectedItems.includes(item)) {
      setCustomItems((prevCustom) => [...prevCustom, item]);
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
    setItem("");
  };
  const allSelected = pantryItems.pantry.every((item) =>
    selectedItems.includes(item)
  );

  useEffect(() => {
    fetchPantryItems();
  }, []);
  return (
    <div
      className={`flex flex-col  w-full h-full  ${isNative ? "px-0" : "px-8"} `}
    >
      <div className={`${isNative ? "pt-0" : "pt-32 md:pt-28 w-full "}  `}>
        <button
          onClick={showEditPantry}
          className="dark:text-blue-400  text-blue-600 text-sm"
        >
          {isEditingPantry ? "Cancel" : "Edit Pantry"}
        </button>
      </div>
      <div className="flex flex-col pt-8 md:pt-8  lg:gap-0 lg:flex-row w-full   h-full  ">
        {isEditingPantry && (
          <PantrySelection
            pantryItems={pantryItems}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
            selectAllPantry={selectAllPantry}
            allSelected={allSelected}
            theme={theme}
            setItem={setItem}
            setAutocompleteValue={setAutocompleteValue}
            autocompleteValue={autocompleteValue}
            addToPantry={addToPantry}
            loading={loading}
            updatePantry={updatePantry}
            ingredientsData={ingredientsData}
          />
        )}

        <SelectedPantryItems
          isEditingPantry={isEditingPantry}
          selectedItems={selectedItems}
          removeItem={removeItem}
        />

        <AutoHideSnackbar
          openSnackbar={showSnackbar}
          message={snackbarMessage}
          setSnackbar={setShowSnackbar}
        />
      </div>
    </div>
  );
};

export default PantryPage;
