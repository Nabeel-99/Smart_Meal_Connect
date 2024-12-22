import React from "react";

const ShowMoreButton = ({ fetchedRecipes, showMore, loading, loadMore }) => {
  return (
    fetchedRecipes.length > showMore &&
    !loading && (
      <button
        onClick={loadMore}
        className="bg-[#3a1dad] z-50 hover:bg-[#4322c6] text-white px-3 py-1 rounded-lg"
      >
        show more
      </button>
    )
  );
};

export default ShowMoreButton;
