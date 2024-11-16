import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import RecipeResults from "./viewCards/RecipeResults";

const RecipeResultsContainer = ({
  fetchedRecipes,
  handlePreviousPage,
  currentPage,
  cardRef,
  loading,
  paginatedRecipes,
  gridView,
  sourceType,
  totalRecipes,
  totalPages,
  handleNextPage,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  return (
    <div className="flex ">
      {fetchedRecipes.length > 0 && (
        <button
          onClick={handlePreviousPage}
          disabled={isFirstPage}
          className="mr-10"
        >
          <FaAngleLeft
            className={`text-4xl rounded-full    ${
              isFirstPage
                ? "cursor-not-allowed"
                : "hover:border hover:dark:bg-[#181818] hover:bg-[#e0e0e0] dark:border-[#3b3b3b] border-[#dadada]"
            }`}
          />
        </button>
      )}

      <RecipeResults
        cardRef={cardRef}
        loading={loading}
        fetchedRecipes={paginatedRecipes}
        gridView={gridView}
        sourceType={sourceType}
        totalRecipes={totalRecipes}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      {fetchedRecipes.length > 0 && (
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="ml-10"
        >
          <FaAngleRight
            className={`text-4xl rounded-full    ${
              isLastPage
                ? "cursor-not-allowed"
                : "hover:border hover:dark:bg-[#181818] hover:bg-[#e0e0e0] dark:border-[#3b3b3b] border-[#dadada]"
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default RecipeResultsContainer;
