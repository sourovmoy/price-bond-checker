import axios from "axios";
import { useState } from "react";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    if (!file) {
      setError("No file selected.");
      return null;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      const msg = "Cloudinary environment variables are missing.";
      setError(msg);
      return null;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setIsUploading(false);

      // Best Practice: Return both public_id and secure_url
      return {
        publicId: data.public_id,
        secureUrl: data.secure_url,
      };
    } catch (err) {
      const errMsg = err.response?.data?.error?.message || err.message;
      setError(errMsg);
      setIsUploading(false);
      return null;
    }
  };

  // Return the function and the states so pages can use them
  return { uploadImage, isUploading, error };
};
