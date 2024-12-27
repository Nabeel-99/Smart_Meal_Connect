import { useEffect, useState } from "react";

const usePagination = (
  storageKeyPage,
  featurePage,
  currentPage,
  setCurrentPage,
  setFetchedRecipes,
  fetchedRecipes,
  setTotalRecipes,
  ingredients = null,
  setIngredients = null
) => {
  const recipesPerPage = 8;

  const totalPages = Math.ceil(fetchedRecipes.length / recipesPerPage);
  const paginatedRecipes = fetchedRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      if (window.matchMedia("(max-width: 768px)").matches) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      if (window.matchMedia("(max-width: 768px)").matches) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  useEffect(() => {
    sessionStorage.setItem(storageKeyPage, currentPage);
  }, [currentPage]);

  useEffect(() => {
    const storedRecipes = sessionStorage.getItem(featurePage);
    const storedIngredientInput = sessionStorage.getItem("ingredientsInput");

    if (storedRecipes && fetchedRecipes.length === 0) {
      const parsedRecipes = JSON.parse(storedRecipes);
      setFetchedRecipes(parsedRecipes);
      setTotalRecipes(parsedRecipes.length);
    }

    if (
      ingredients &&
      setIngredients &&
      storedIngredientInput &&
      ingredients.length === 0
    ) {
      const ingredientsInput = JSON.parse(storedIngredientInput);
      setIngredients(ingredientsInput);
    }
  }, []);

  return {
    fetchedRecipes,
    paginatedRecipes,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

export default usePagination;
