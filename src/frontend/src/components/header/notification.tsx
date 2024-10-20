import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import IconTooltip from "../tooltip/icon-tooltip";

const Notification = () => {
    const notifs = [
        { img: "", name: "Georgia Wiggins", action: "followed you.", utc: "2 minutes ago" },
        { img: "", name: "Thimothy Anderson", action: "liked your post.", utc: "4 hours ago" },
        { img: "", name: "Jesse Pinkman", action: "commented on your post.", utc: "October 12" },
        { img: "", name: "Jesse Pinkman", action: "replied to your comment", utc: "October 12" },
        { img: "", name: "Walter White", action: "sent you a message.", utc: "Yesterday" },
        { img: "", name: "Skyler White", action: "reacted to your post.", utc: "2 days ago" },
        { img: "", name: "Saul Goodman", action: "started following you.", utc: "3 days ago" }
    ];

    const [visibleCount, setVisibleCount] = useState(5); 

    const handleSeeMore = () => {
        if (visibleCount === 5) {
            setVisibleCount(notifs.length); 
        } else {
            setVisibleCount(5); 
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center rounded-full">
                    <IconTooltip
                        IconComponent={Bell}
                        tooltipText="Notification"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[27rem]">
                <div className="flex flex-col">
                    <h1 className="text-md font-bold border-b border-black py-2 text-start">Notification</h1>

                    {notifs.slice(0, visibleCount).map((notif, index) => (
                        <div key={index} className="flex items-center border-b p-2 gap-x-1.5">
                            <img
                                className="bg-slate-400 size-12 rounded-full"
                                src={notif.img}
                                alt="user-profile"
                            />
                            <div className="flex flex-col">
                                <div className="flex gap-1 items-center">
                                    <span className="font-medium text-md">{notif.name}</span>
                                    <span className="text-sm">{notif.action}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{notif.utc}</span>
                            </div>
                        </div>
                    ))}
                    <div
                        className="underline text-center pt-1.5 cursor-pointer text-sky-600"
                        onClick={handleSeeMore}
                    >
                        {visibleCount === 5 ? "see more" : "see less"}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Notification;
