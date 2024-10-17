import { LucideIcon } from "lucide-react"; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface IconTooltipProps {
    IconComponent: LucideIcon;    
    tooltipText: string;         
    size?: number;             
    className?: string;           
}

const IconTooltip: React.FC<IconTooltipProps> = ({ IconComponent, tooltipText, size = 25, className }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <IconComponent
                    size={size}
                    className={`cursor-pointer text-lima-500 ${className}`}
                />
            </TooltipTrigger>
            <TooltipContent className="text-black">
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default IconTooltip


