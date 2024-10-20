import { APIRoutes } from "@/constants/ApiRoutes";
import { tutorialFormSchema } from "./formSchema";
import { getToken } from "./auth";
import { z } from "zod";
import { ITutorial } from "@/interface/ITutorial";

export async function fetchTutorials(page?: number) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.GET_TUTORIALS}${page ? `?p=${page}` : ''}`);
  const data: { status: number; message: string; data?: [ITutorial[], number] } = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Get tutorials failed:', data);
  }
}

export async function fetchTutorial(id: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.GET_TUTORIAL}/${id}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Get tutorial failed:', data);
  }
}

export async function createTutorial(values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.CREATE_TUTORIAL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Create tutorial failed:', data);
  }
}

export async function updateTutorial(id: string, values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.UPDATE_TUTORIAL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Update tutorial failed:', data);
  }
}

export async function deleteTutorial(id: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.DELETE_TUTORIAL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Delete tutorial failed:', data);
  }
}

export async function fetchStories(page?: number) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.GET_STORIES}${page ? `?p=${page}` : ''}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Get stories failed:', data);
  }
}

export async function fetchStory(id: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.GET_STORY}/${id}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Get story failed:', data);
  }
}

export async function createStory(values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.CREATE_STORY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Create story failed:', data);
  }
}

export async function updateStory(id: string, values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.UPDATE_STORY}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Update story failed:', data);
  }
}

export async function deleteStory(id: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.DELETE_STORY}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Delete story failed:', data);
  }
}