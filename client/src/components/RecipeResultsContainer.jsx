import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import RecipeResults from "./viewCards/RecipeResults";
import ErrorText from "./ErrorText";

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
  resultError,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <ErrorText error={resultError} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        {fetchedRecipes.length > 0 && (
          <button
            onClick={handlePreviousPage}
            disabled={isFirstPage}
            className="mb-4 mx-auto sm:mb-0 sm:mr-10"
          >
            <FaAngleLeft
              className={`text-4xl rounded-full mx-auto ${
                isFirstPage
                  ? "cursor-not-allowed"
                  : "hover:border hover:dark:bg-[#181818] hover:bg-[#e0e0e0] dark:border-[#3b3b3b] border-[#dadada]"
              }`}
            />
            <div className="">Previous page</div>
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
            className="mt-4 sm:mt-0 mx-auto sm:ml-10"
          >
            <FaAngleRight
              className={`text-4xl rounded-full mx-auto ${
                isLastPage
                  ? "cursor-not-allowed"
                  : "hover:border hover:dark:bg-[#181818] hover:bg-[#e0e0e0] dark:border-[#3b3b3b] border-[#dadada]"
              }`}
            />
            <div>Next page</div>
          </button>
        )}
      </div>
    </>
  );
};

export default RecipeResultsContainer;
