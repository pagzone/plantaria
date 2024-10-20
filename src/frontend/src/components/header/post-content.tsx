import { CirclePlus, Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import IconTooltip from "../tooltip/icon-tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TutorialForm from "../home-page/HomeContent/tutorial-form";
import { useState } from "react";
import StoryForm from "./story-form";
import { cn } from "@/lib/utils";

const PostDialog = () => {
	const [tab, setTab] = useState<string>("tutorial");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center rounded-full max-md:fixed bottom-4 max-md:bg-lima-500 max-md:p-3 cursor-pointer z-10">
					<IconTooltip
						IconComponent={CirclePlus}
						tooltipText="Post Tutorial"
						size={30}
						className="cursor-pointer text-lima-500 max-md:hidden"
					/>

					<IconTooltip
						IconComponent={Plus}
						tooltipText="Post Tutorial"
						size={25}
						className="cursor-pointer text-white md:hidden"
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="h-auto max-h-screen overflow-auto md:min-h-[26rem] md:w-[40rem] w-[90vw] max-w-[50rem] flex flex-col p-4 md:p-6 rounded-lg">
				<Tabs
					defaultValue="tutorial"
					onValueChange={(value) => setTab(value)}
					className="flex-1 flex flex-col"
				>
					<DialogHeader>
						<div className="flex justify-between h-fit w-full items-center">
							<DialogTitle className="text-xl md:text-2xl font-bold">
								Create {tab === "tutorial" ? "Tutorial" : "Story"}
							</DialogTitle>
							<TabsList className="flex gap-x-2">
								<TabsTrigger value="tutorial">Tutorial</TabsTrigger>
								<TabsTrigger value="story">Story</TabsTrigger>
							</TabsList>
						</div>
					</DialogHeader>

					<TabsContent
						className={cn("flex flex-col flex-1 gap-2", {
							hidden: tab !== "tutorial",
						})}
						value="tutorial"
					>
						<TutorialForm />
					</TabsContent>
					<TabsContent
						className={cn("flex flex-col flex-1 gap-2", {
							hidden: tab !== "story",
						})}
						value="story"
					>
						<StoryForm />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default PostDialog;
