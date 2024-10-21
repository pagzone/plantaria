import StoriesCard from "@/components/home-page/stories-card";
import StoriesCardSkeleton from "@/components/skeletons/storiesCard-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryKeys } from "@/constants/QueryKeys";
import { IStory } from "@/interface/IStory";
import { fetchStories } from "@/lib/api";
import { getPlainTextFromHtml } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const Stories = () => {
  const {
		data,
		isLoading: isStoriesLoading,
		isError: isStoriesError,
		error: storiesError,
	} = useQuery(
		[QueryKeys.STORIES],
		async () => {
			const response = await fetchStories();

			return response;
		},
		{
			keepPreviousData: true,
		},
	);

	if (isStoriesError && storiesError instanceof Error) {
		return <div>Error: {storiesError.message}</div>;
	}

	const stories: IStory[] | undefined = data?.data![0];


  return (
    <ScrollArea className="h-[40rem] lg:h-[67rem]">
      <div className="flex flex-col gap-y-4 py-1.5 px-2">
        {isStoriesLoading
          ? Array(stories?.length)
            .fill(0)
            .map((_, index) => <StoriesCardSkeleton key={index} />)
          : stories?.map((stories) => (
            <Link key={stories.id} to={`/stories/${stories.id}`}>
              <StoriesCard
                key={stories.id}
                storyImg={stories.thumbnail}
                projectName={stories.title}
                description={getPlainTextFromHtml(stories.content)}
              />
            </Link>
          ))}
      </div>
    </ScrollArea>
  )
}

export default Stories