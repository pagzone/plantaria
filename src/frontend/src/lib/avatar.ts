import { fetchDownloadAuth } from "./api";

export const getUserAvatar = async (avatar?: string) => {
  const downloadAuth = await fetchDownloadAuth("avatar");
  if (avatar && downloadAuth && downloadAuth.data) {
    return `${avatar}?Authorization=${downloadAuth.data.authorizationToken}`
  }
  return "./images/default_avatar.jpeg"
}