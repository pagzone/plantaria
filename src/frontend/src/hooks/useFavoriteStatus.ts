import { QueryKeys } from "@/constants/QueryKeys";
import { IResponse } from "@/interface/IResponse";
import { isFavoriteTutorial } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteStatus = (id: string) => {
  return useQuery(
    [QueryKeys.FAVORITE, id],
    async () => {
      const response: IResponse<boolean> = await isFavoriteTutorial(id);
      // console.log(response.);
      return response;
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  );
};