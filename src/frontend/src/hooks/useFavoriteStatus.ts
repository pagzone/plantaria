import { QueryKeys } from "@/constants/QueryKeys";
import { isFavoriteTutorial } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteStatus = (id: string) => {
  return useQuery(
    [QueryKeys.FAVORITE, id],
    async () => {
      const response = await isFavoriteTutorial(id);
      return response.data?.isFavorite ?? false; // Ensure fallback value
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    },
  );
};