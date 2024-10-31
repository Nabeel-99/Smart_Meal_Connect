import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import PreviewCard from "../viewCards/PreviewCard";

const ImageUploadCard = ({
  imagePreviews,
  images,
  setImages,
  handleImageUpload,
  theme,
  setImagePreviews,
  setDeletedImages,
}) => {
  return (
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
            <div className="text-sm text-[#969696]">maximum of 3 images.</div>
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
  );
};

export default ImageUploadCard;
