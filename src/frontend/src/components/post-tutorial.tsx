import { CirclePlus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CategoriesCB } from "./catergories-cb"
import IconTooltip from "./icon-tooltip"

const PostDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full max-md:hidden flex items-center">
                        <IconTooltip 
                            IconComponent={CirclePlus} 
                            tooltipText="Post Tutorial"
                            size={30}
                            className="cursor-pointer text-lima-500 "
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="h-[30rem] w-[50rem] ">
                <DialogHeader className="flex items-center h-fit">
                    <DialogTitle className="text-2xl font-bold">Create Tutorial</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-y-2">
                    <div className="flex flex-col w-full gap-y-4">
                        <div className="flex gap-x-2">
                            <Input
                                id="title"
                                placeholder="Enter Title"
                                className="w-full border border-black rounded-lg"
                            />
                            <CategoriesCB
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PostDialog;