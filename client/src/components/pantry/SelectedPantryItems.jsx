import React from "react";
import { FaXmark } from "react-icons/fa6";

const SelectedPantryItems = ({
  isEditingPantry,
  selectedItems,
  removeItem,
}) => {
  return (
    <div
      className={` rounded-md dark:bg-[#0f0f0f] bg-[#dadada] max-h-[650px] p-8 w-full border dark:border-[#1d1d1d] border-[#e0e0e0] overflow-auto  `}
    >
      {" "}
      <div
        className={`grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 ${
          !isEditingPantry ? "lg:grid-cols-3 xl:grid-cols-4" : ""
        }`}
      >
        {selectedItems.length > 0 &&
          selectedItems.map((item, index) => (
            <div
              className="dark:bg-[#2d2d2d] bg-[#c4c4c4] border-[#dadada] border dark:border-[#444544] px-3 py-2 rounded-xl dark:text-white flex items-center w-full justify-between"
              key={index}
            >
              <p className="pr-4 ">{item}</p>
              {isEditingPantry && (
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="border border-[#7a7a7a] bg-[#535252] rounded-full p-1 hover:text-white hover:bg-[#34343d]"
                >
                  <FaXmark className="text-gray-400 hover:text-white " />
                </button>
              )}
            </div>
          ))}
      </div>
      {selectedItems.length <= 0 && (
        <div className="flex items-center justify-center h-full">
          <p>Your Pantry Items will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default SelectedPantryItems;
