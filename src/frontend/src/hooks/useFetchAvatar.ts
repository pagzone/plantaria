import { QueryKeys } from "@/constants/QueryKeys";
import { getUserAvatar } from "@/lib/avatar";
import { useQuery } from "@tanstack/react-query";

export const useFetchAvatar = (userId: string, avatarLink?: string) => {
  return useQuery(
    [QueryKeys.USER_AVATAR, userId],
    async () => {
      const response = await getUserAvatar(avatarLink);
      return response;
    },
    {
      enabled: !!avatarLink,
      refetchOnWindowFocus: false
    },
  );
}