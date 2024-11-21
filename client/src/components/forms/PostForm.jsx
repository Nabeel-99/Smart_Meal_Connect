import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploadCard from "../feeds/ImageUploadCard";
import UploadLimitSnackbar from "../popupCards/UploadLimitSnackbar";
import InputArea from "../formInputs/InputArea";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import BASE_URL, { isNative } from "../../../apiConfig";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PostForm = ({
  setShowModal,
  theme,
  selectedPost,
  fetchUserPosts,
  setShowSuccessSnackbar,
  setSuccessMessage,
}) => {
  console.log("selected post", selectedPost);
  const loadSavedData = () => {
    const savedData = JSON.parse(localStorage.getItem("postFormData"));
    return savedData || {};
  };
  const [title, setTitle] = useState(
    selectedPost ? selectedPost?.title : loadSavedData()?.title || ""
  );
  const [instructions, setInstructions] = useState(
    selectedPost
      ? selectedPost?.instructions
      : loadSavedData()?.instructions || []
  );
  const [images, setImages] = useState(
    selectedPost ? selectedPost?.images : loadSavedData()?.images || []
  );
  const [imagePreviews, setImagePreviews] = useState(
    selectedPost ? selectedPost?.images : loadSavedData()?.imagePreviews || []
  );
  const [prepTime, setPrepTime] = useState(
    selectedPost ? selectedPost?.prepTime : loadSavedData()?.prepTime || 0
  );
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [item, setItem] = useState("");
  const [ingredients, setIngredients] = useState(
    selectedPost
      ? selectedPost?.ingredients
      : loadSavedData()?.ingredients || []
  );
  const [category, setCategory] = useState(
    selectedPost
      ? selectedPost?.category
      : loadSavedData()?.category || "breakfast"
  );
  const [deletedImages, setDeletedImages] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPost) {
      const formData = {
        title,
        instructions,
        images: images.map((image) =>
          image instanceof Blob ? URL.createObjectURL(image) : image
        ),
        imagePreviews,
        prepTime,
        item,
        ingredients,
        category,
      };
      localStorage.setItem("postFormData", JSON.stringify(formData));
    }
  }, [
    title,
    instructions,
    images,
    imagePreviews,
    prepTime,
    item,
    ingredients,
    category,
  ]);

  useEffect(() => {
    if (selectedPost) {
      localStorage.removeItem("postFormData");
    }
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      setImages(selectedPost.images || []);
      setImagePreviews(
        selectedPost.images.map((img) =>
          img.startsWith("uploads/") ? `${BASE_URL}/${img}` : img
        )
      );
    }
  }, [selectedPost]);
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
    const newImagePreviews = newImages.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
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
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        URL.createObjectURL(file),
      ]);
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
      !images ||
      !imagePreviews ||
      !category
    ) {
      setError("Please fill in all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("ingredients", ingredients);
    formData.append("category", category);
    formData.append("prepTime", prepTime);
    // formData.append("videoLink", videoLink);
    console.log("ingredients", ingredients);
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
        navigate("/feeds");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
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
  console.log("images", images);
  console.log("image", imagePreviews);
  return (
    <>
      <UploadLimitSnackbar
        snackbarOpen={snackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
      />
      {!isNative && (
        <div className="fixed -top-5  cursor-pointer left-0 right-0 w-full flex items-center justify-center ">
          <button
            className="cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            {" "}
            <FaXmark className="border text-3xl rounded-full backdrop-blur-xl" />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col lg:flex-row justify-between ${
          isNative ? "w-full h-full" : "w-80 h-[40rem]"
        } items-center overflow-scroll hide-scrollbar lg:items-stretch p-4 lg:p-12    md:w-full xl:w-full  lg:h-[35rem] xl:h-[45rem]`}
      >
        <div className="hidden lg:block lg:fixed right-4 top-2  pb-10">
          <button
            type="submit"
            className="text-blue-500 font-semibold hover:text-blue-300"
          >
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
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("instructions", instructions);
//   formData.append("category", category);
//   formData.append("prepTime", prepTime);
//   console.log("ingrede", ingredients);
//   images.forEach((image) => {
//     if (image instanceof File) {
//       formData.append("images", image);
//     }
//   });

//   ingredients.forEach((ingredient, index) => {
//     formData.append(`ingredients[${index}]`, ingredient);
//   });

//   // removed images
//   deletedImages.forEach((image) => {
//     formData.append("deletedImages[]", image);
//   });

//   try {
//     let response;
//     if (selectedPost) {
//       response = await editRecipePost(selectedPost._id, formData);
//     } else {
//       response = await createRecipePost(formData);
//     }
//     console.log(response.data);
//     if (response.status === 201 || response.status === 200) {
//       await fetchUserPosts();
//       setShowSuccessSnackbar(true);
//       setSuccessMessage("Your post has been shared");
//       setShowModal(false);
//     }
//   } catch (error) {
//     console.log(error);
//     if (
//       error.response &&
//       error.response.status >= 400 &&
//       error.response.status <= 500
//     ) {
//       setError(error.response.data.message);
//     }
//   }
// };
