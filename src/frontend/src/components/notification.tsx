import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Bell } from "lucide-react"
import IconTooltip from "./icon-tooltip"

const Notification = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className="">

                </div>
                <IconTooltip
                    IconComponent={Bell}
                    tooltipText="Notification"
                    className="max-md:hidden"
                />
            </PopoverTrigger>
            <PopoverContent>
                

            </PopoverContent>
        </Popover>
    )
}

export default Notification