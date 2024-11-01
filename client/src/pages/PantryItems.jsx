import React, { useState } from "react";
import pantryItems from "../../../server/utils/pantry.json";
import ingredientsData from "../../../server/utils/ingredientsHelper.json";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PantrySelection from "../components/pantry/PantrySelection";
import PantryHeader from "../components/pantry/PantryHeader";
const PantryItems = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [customItems, setCustomItems] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItems((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };
  const selectAllPantry = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems([...pantryItems.pantry, ...customItems]);
    } else {
      setSelectedItems([]);
    }
  };

  const allSelected =
    pantryItems.pantry.length + customItems.length > 0 &&
    selectedItems.length === pantryItems.pantry.length + customItems.length;

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
  const skipToDashboard = () => {
    navigate("/dashboard");
  };
  const savePantryItems = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/create-pantry",
        {
          items: selectedItems,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-20  w-full h-full  px-8 lg:px-24">
      <div className="flex flex-col  pt-32 md:pt-28  lg:gap-10 lg:flex-row items-center justify-between h-full  ">
        <div className="flex flex-col items-center w-full lg:w-auto  pb-24  xl:h-full lg:justify-center gap-2">
          <PantryHeader />
          <PantrySelection
            pantryItems={pantryItems}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
            selectAllPantry={selectAllPantry}
            allSelected={allSelected}
            loading={loading}
            theme={theme}
            addToPantry={addToPantry}
            setAutocompleteValue={setAutocompleteValue}
            autocompleteValue={autocompleteValue}
            setItem={setItem}
            ingredientsData={ingredientsData}
            showSkip={true}
            skipToDashboard={skipToDashboard}
            save={true}
            savePantryItems={savePantryItems}
          />
        </div>

        <div className="hidden xl:block w-[0.08px] h-full bg-[#343333]"></div>
        <div className=" rounded-md bg-[#222121] h-[600px] max-h-[650px] p-8 w-full xl:w-[650px] xl:max-w-[650px] overflow-auto  ">
          {" "}
          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            {selectedItems.length > 0 &&
              selectedItems.map((item, index) => (
                <div
                  className="bg-[#2d2d2d] border border-[#444544] px-3 py-2 rounded-xl text-white flex items-center w-full justify-between"
                  key={index}
                >
                  <p className="pr-4">{item}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    className="border border-[#7a7a7a] bg-[#535252] rounded-full p-1 hover:text-white hover:bg-[#34343d]"
                  >
                    <FaXmark className="text-gray-400 hover:text-white " />
                  </button>
                </div>
              ))}
          </div>
          {selectedItems.length <= 0 && (
            <div className="flex items-center justify-center h-full">
              <p>Your Pantry Items will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PantryItems;
