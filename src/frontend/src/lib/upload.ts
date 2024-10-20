import { APIRoutes } from "@/constants/ApiRoutes";
import { getToken } from "./auth";
import UploadFileResponse from "@/interface/UploadFileResponse";

export const uploadImage = async (imageFile: File, prefix?: string) => {
  if (!imageFile) return;

  const arrayBuffer = await imageFile.arrayBuffer();

  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.UPLOAD_IMAGE}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/octet-stream',
      'x-filename': `${prefix}/${imageFile.name}`,
    },
    body: arrayBuffer,
  });

  const data: { status: number, message: string, data?: UploadFileResponse } = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Upload failed:', data);
  }
};
