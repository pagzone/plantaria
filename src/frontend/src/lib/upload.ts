import { APIRoutes } from "@/constants/ApiRoutes";
import { getToken } from "./auth";

export const uploadImage = async (imageFile: File) => {
  if (!imageFile) return;

  const arrayBuffer = await imageFile.arrayBuffer();

  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.UPLOAD_IMAGE}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/octet-stream',
      'x-filename': imageFile.name
    },
    body: arrayBuffer,
  });

  const data = await response.json();
  if (response.ok) {
    // setThumbnailURL(data.url);
    console.log(data);
  } else {
    console.error('Upload failed:', data);
  }
};
