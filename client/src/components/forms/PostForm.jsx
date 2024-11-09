import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploadCard from "../feeds/ImageUploadCard";
import UploadLimitSnackbar from "../popupCards/UploadLimitSnackbar";
import InputArea from "../formInputs/InputArea";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import BASE_URL, { isNative } from "../../../apiConfig";
const PostForm = ({
  setShowModal,
  theme,
  selectedPost,
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
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handleFileUpload = (e) => {
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

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      const imageUri = image.webPath || image.path;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const file = new File([blob], `${Date.now()}.jpg`, { type: blob.type });

      setImages((prevImages) => [...prevImages, file]);
      console.log("image uri", imageUri);
      console.log("image", image);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageUpload = (e) => {
    if (
      Capacitor.getPlatform() === "android" ||
      Capacitor.getPlatform === "ios"
    ) {
      takePicture();
    } else {
      handleFileUpload(e);
    }
  };
  // for web
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
    if (
      !title ||
      !instructions ||
      !prepTime ||
      !ingredients ||
      !imagePreviews ||
      !category
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("ingredients", ingredients);
    formData.append("category", category);
    formData.append("prepTime", prepTime);
    formData.append("videoLink", videoLink);

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
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
        await fetchUserPosts();
        setShowSuccessSnackbar(true);
        setSuccessMessage("Your post has been shared");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.message);
      }
    }
  };

  const createRecipePost = async (formData) => {
    return await axios.post(`${BASE_URL}/api/users/post`, formData, {
      withCredentials: true,
    });
  };

  const editRecipePost = async (postId, formData) => {
    return await axios.patch(
      `${BASE_URL}/api/users/update/${postId}`,
      formData,
      { withCredentials: true }
    );
  };
  return (
    <>
      <UploadLimitSnackbar
        snackbarOpen={snackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
      />

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col lg:flex-row justify-between ${
          isNative ? "w-full h-full" : "w-80 h-[40rem]"
        } items-center overflow-scroll lg:items-stretch p-4 lg:p-12    md:w-full xl:w-full  lg:h-[35rem] xl:h-[45rem]`}
      >
        <div className="hidden lg:block lg:fixed right-4 top-2  pb-10">
          <button className="text-blue-500 font-semibold hover:text-blue-300">
            {selectedPost ? "Update" : "Post"}
          </button>
        </div>

        <ImageUploadCard
          imagePreviews={imagePreviews}
          images={images}
          setImages={setImages}
          handleImageUpload={handleImageUpload}
          theme={theme}
          setImagePreviews={setImagePreviews}
          setDeletedImages={setDeletedImages}
        />

        <InputArea
          error={error}
          title={title}
          setTitle={setTitle}
          prepTime={prepTime}
          setPrepTime={setPrepTime}
          category={category}
          setCategory={setCategory}
          theme={theme}
          setItem={setItem}
          setAutocompleteValue={setAutocompleteValue}
          autocompleteValue={autocompleteValue}
          addIngredient={addIngredient}
          ingredients={ingredients}
          removeIngredient={removeIngredient}
          instructions={instructions}
          setInstructions={setInstructions}
          selectedPost={selectedPost}
        />
      </form>
    </>
  );
};

export default PostForm;
