import { APIRoutes } from "@/constants/ApiRoutes";
import { tutorialFormSchema } from "./formSchema";
import { getToken } from "./auth";
import { z } from "zod";
import { ITutorial } from "@/interface/ITutorial";
import { IResponse } from "@/interface/IResponse";
import { IDownloadAuth } from "@/interface/IDownloadAuth";

export async function fetchDownloadAuth(prefix: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.DOWNLOAD_AUTHORIZATION}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prefix: prefix
    }),
  });

  const data: IResponse<IDownloadAuth> = await response.json();
  
  if (response.ok) {
    return data;
  } else {
    console.error('Get download authorization failed:', data);
  }
}

export async function fetchTutorials(page?: number) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.TUTORIALS}${page ? `?p=${page}` : ''}`);
  const tutorials: IResponse<[ITutorial[], number]> = await response.json();

  if (tutorials.data) {
    const downloadAuth = await fetchDownloadAuth("tutorial");
    tutorials.data[0].forEach(async (tutorial: ITutorial) => {
      tutorial.thumbnail = `${tutorial.thumbnail}?Authorization=${downloadAuth?.data?.authorizationToken}`
    })
  }

  if (response.ok) {
    return tutorials;
  } else {
    console.error('Get tutorials failed:', tutorials);
  }
}

export async function fetchTutorial(id: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.TUTORIALS}/${id}`);
  const tutorial: IResponse<ITutorial> = await response.json();

  if (tutorial.data) {
    const downloadAuth = await fetchDownloadAuth("tutorial");
    tutorial.data.thumbnail = `${tutorial.data.thumbnail}?Authorization=${downloadAuth?.data?.authorizationToken}`
  }

  if (response.ok) {
    return tutorial;
  } else {
    console.error('Get tutorial failed:', tutorial);
  }
}

export async function createTutorial(values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.TUTORIALS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });
  const data: IResponse<null> = await response.json();
  if (response.ok) {
    return data;
  } else {
    console.error('Create tutorial failed:', data);
  }
}

export async function updateTutorial(id: string, values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.TUTORIALS}/${id}`, {
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
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.TUTORIALS}/${id}`, {
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
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.STORIES}${page ? `?p=${page}` : ''}`);
  const stories = await response.json();

  if (stories.data) {
    const downloadAuth = await fetchDownloadAuth("tutorial");
    stories.data[0].forEach(async (story: ITutorial) => {
      story.thumbnail = `${story.thumbnail}?Authorization=${downloadAuth?.data?.authorizationToken}`
    })
  }

  if (response.ok) {
    return stories;
  } else {
    console.error('Get stories failed:', stories);
  }
}

export async function fetchStory(id: string) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.STORIES}/${id}`);
  const story = await response.json();

  if (story.data) {
    const downloadAuth = await fetchDownloadAuth("story");
    story.data.thumbnail = `${story.data.thumbnail}?Authorization=${downloadAuth?.data?.authorizationToken}`
  }

  if (response.ok) {
    return story;
  } else {
    console.error('Get story failed:', story);
  }
}

export async function createStory(values: z.infer<typeof tutorialFormSchema>) {
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.STORIES}`, {
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
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.STORIES}/${id}`, {
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
  const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.STORIES}/${id}`, {
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