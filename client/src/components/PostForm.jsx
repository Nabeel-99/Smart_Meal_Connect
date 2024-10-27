import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import TextInput from "./formInputs/TextInput";
import SelectInput from "./formInputs/SelectInput";
import { mealCategories } from "../../../server/utils/helper";
import {
  Autocomplete,
  Button,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import { FaArrowLeft, FaArrowRight, FaTrash, FaXmark } from "react-icons/fa6";
import ingredientsData from "../../../server/utils/ingredientsHelper.json";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import axios from "axios";
import PreviewCard from "./PreviewCard";
import AutoHideSnackbar from "./AutoHideSnackbar";
import useTheme from "./UseTheme";

const PostForm = ({
  setCreatePost,
  theme,
  selectedPost,
  setShowModal,
  fetchUserPosts,
  setShowSuccessSnackbar,
  setSuccessMessage,
}) => {
  const [title, setTitle] = useState(selectedPost?.title || "");
  const [instructions, setInstructions] = useState(
    selectedPost?.instructions || []
  );
  const [images, setImages] = useState(selectedPost?.images || []);
  const [imagePreviews, setImagePreviews] = useState(
    selectedPost?.images || []
  );
  const [videoLink, setVideoLink] = useState(null);
  const [prepTime, setPrepTime] = useState(selectedPost?.prepTime || 0);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [item, setItem] = useState("");
  const [ingredients, setIngredients] = useState(
    selectedPost?.ingredients || []
  );
  const [category, setCategory] = useState(
    selectedPost?.category || "breakfast"
  );
  const [deletedImages, setDeletedImages] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const modalTheme = useTheme(theme);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const addIngredient = () => {
    if (item && !ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
      setItem("");
    }
  };
  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = imagePreviews.length + files.length;
    if (totalImages > 3) {
      setSnackbarOpen(true);
      setSnackbarMessage("You can only upload a maximum of 3 images.");
      return;
    }
    const newImages = files.map((file) => file);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  useEffect(() => {
    const newImagePreviews = images.map((image) =>
      typeof image === "string" ? image : URL.createObjectURL(image)
    );

    setImagePreviews(newImagePreviews);

    return () => {
      newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("ingredients", ingredients);
    formData.append("category", category);
    formData.append("prepTime", prepTime);
    formData.append("videoLink", videoLink);

    images.forEach((image) => {
      formData.append("images", image);
    });

    // removed images
    formData.append("deletedImages", JSON.stringify(deletedImages));
    try {
      let response;
      if (selectedPost) {
        response = await editRecipePost(selectedPost._id, formData);
      } else {
        response = await createRecipePost(formData);
      }
      console.log(response.data);
      if (response.status === 201 || response.status === 200) {
        setCreatePost(false);
        setShowModal(false);
        setShowSuccessSnackbar(true);
        setSuccessMessage("Your post has been shared");
        await fetchUserPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createRecipePost = async (formData) => {
    return await axios.post("http://localhost:8000/api/users/post", formData, {
      withCredentials: true,
    });
  };

  const editRecipePost = async (postId, formData) => {
    return await axios.patch(
      `http://localhost:8000/api/users/update/${postId}`,
      formData,
      { withCredentials: true }
    );
  };
  return (
    <>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <div className="flex flex-col gap-3 dark:bg-[#1d1d1d] bg-[#e2e2e2] border-[#08090a] p-8 rounded-md">
            <div>{snackbarMessage}</div>
            <div className="flex items-end justify-end mt-4">
              <button
                className="bg-blue-600 text-white hover:bg-blue-800 py-1 w-14 px-2 text-sm rounded-md"
                onClick={handleCloseSnackbar}
              >
                OK
              </button>
            </div>
          </div>
        </Snackbar>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row justify-between items-center overflow-scroll lg:items-stretch p-4 lg:p-12 h-[40rem] w-80 md:w-full xl:w-full  lg:h-[35rem] xl:h-[45rem]"
      >
        <div className="hidden lg:block lg:fixed right-4 top-2  pb-10">
          <button className="text-blue-500 font-semibold hover:text-blue-300">
            {selectedPost ? "Update" : "Post"}
          </button>
        </div>

        <div className="relative w-[15rem] lg:w-[200rem] xl:w-[230rem]  border border-[#e0e0e0] dark:border-[#2a2a2a] rounded-md">
          {imagePreviews.length > 0 ? (
            <PreviewCard
              imagePreviews={imagePreviews}
              images={images}
              setImages={setImages}
              handleImageUpload={handleImageUpload}
              theme={theme}
              setImagePreviews={setImagePreviews}
              setDeletedImages={setDeletedImages}
            />
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full h-64 lg:h-[416px] xl:h-full">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <IoCloudUploadOutline className="text-xl" />
                <div>Upload file</div>
                <div className="text-sm text-[#969696]">
                  maximum of 3 images.
                </div>
              </label>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="file-upload"
                multiple
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col  pt-8 gap-3  w-full lg:px-4 l lg:w-[200rem] xl:w-[230rem] h-full lg:overflow-scroll">
          <TextInput
            label={"Title"}
            bgColor="dark:bg-[#0c0c0c] bg-[#e9e9e9]"
            className=""
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
            <TextInput
              label={"Cooking time"}
              className="w-full"
              type={"number"}
              min={0}
              bgColor="dark:bg-[#0c0c0c] bg-[#e9e9e9]"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
            <SelectInput
              label={"Category"}
              options={mealCategories}
              id={"category"}
              bgColor="dark:bg-[#0c0c0c] bg-[#e9e9e9]"
              className=" w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-col  items-start w-full gap-2">
              <label htmlFor="ingredients-autocomplete" className="text-sm ">
                Ingredients
              </label>
              <div className="flex items-center justify-between w-full gap-2">
                <Autocomplete
                  id="ingredients-autocomplete"
                  disablePortal
                  options={ingredientsData}
                  getOptionLabel={(option) => option.name}
                  sx={{
                    width: 300,
                    "& .MuiInputBase-root": {
                      backgroundColor:
                        modalTheme === "dark" ? "#0c0c0c" : "#e9e9e9",
                      borderRadius: "8px",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      color: modalTheme === "dark" ? "white" : "black",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        modalTheme === "dark" ? "#1d1d1d" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ffffff",
                    },
                    "& .MuiAutocomplete-popupIndicator": {
                      color: modalTheme === "dark" ? "#ffffff" : "#333333",
                    },
                    "& .MuiAutocomplete-clearIndicator": {
                      color: modalTheme === "dark" ? "#ffffff" : "#333333",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="e.g chicken, pasta ..."
                      className="text-sm"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: 15,
                          backgroundColor:
                            modalTheme === "dark" ? "#0c0c0c" : "e9e9e9",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          color: modalTheme === "dark" ? "white" : "black",
                        },
                      }}
                    />
                  )}
                  value={autocompleteValue}
                  onChange={(event, value) => {
                    setItem(value.name);
                    setAutocompleteValue(null);
                  }}
                />
                <button
                  onClick={addIngredient}
                  type="button"
                  className="bg-[#B678F0] hover:bg-[#813ebf] text-white px-6 h-10 rounded-xl"
                >
                  Add
                </button>
              </div>
            </div>
            <div className=" rounded-md dark:bg-[#0c0c0c] bg-[#e9e9e9] border dark:border-[#1d1d1d] border-[#e0e0e0] h-44 max-h-44 w-full p-8  overflow-auto  ">
              {" "}
              <div className="grid  gap-2">
                {ingredients.length > 0 &&
                  ingredients.map((ingredient, index) => (
                    <div
                      className="dark:bg-[#2d2d2d] bg-[#c4c4c4] border-[#dadada] border dark:border-[#444544] px-3 py-2 rounded-xl dark:text-white flex items-center w-full justify-between"
                      key={index}
                    >
                      <p className="pr-4">{ingredient}</p>
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient)}
                        className="border border-[#7a7a7a] bg-[#535252] rounded-full p-1 hover:text-white hover:bg-[#34343d]"
                      >
                        <FaXmark className="text-gray-400 hover:text-white " />
                      </button>
                    </div>
                  ))}
              </div>
              {ingredients.length <= 0 && (
                <div className="flex items-center justify-center text-sm h-full">
                  <p>Ingredients added will appear here.</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-sm flex  lg:pb-0 flex-col gap-2">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              placeholder="Type instructions here"
              className="dark:bg-[#0c0c0c] bg-[#e9e9e9] w-full min-h-52 overflow-scroll border text-sm dark:border-[#1d1d1d] border-[#e0e0e0] rounded-md px-2 py-2"
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
            />
          </div>
          <div className="lg:hidden pb-12">
            <button
              type="submit"
              className=" bg-blue-600  text-white p-2 w-full rounded-md font-semibold hover:bg-blue-700"
            >
              {selectedPost ? "Update Post" : "Create post"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostForm;
