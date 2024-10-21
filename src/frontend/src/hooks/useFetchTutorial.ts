import { QueryKeys } from "@/constants/QueryKeys";
import { fetchTutorial } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchTutorial = (id: string) => {
  return useQuery(
    [QueryKeys.TUTORIAL, id],
    async () => await fetchTutorial(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    },
  );
};