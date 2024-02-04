import React from "react";

const ImageUpload = ({ getPicUrl, enqueueSnackbar, setPic, setPicLoading }) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="profile">Upload Your Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          getPicUrl(e.target.files[0], enqueueSnackbar, setPic, setPicLoading)
        }
        className="cursor-pointer"
      />
    </div>
  );
};

export default ImageUpload;
