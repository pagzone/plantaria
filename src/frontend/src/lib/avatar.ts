export const getUserAvatar = (avatar?: string) => {
  if (avatar) {
    return avatar
  }
  return "./images/default_avatar.jpeg"
}