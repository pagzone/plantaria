import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandInput,
	CommandEmpty,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const categories = [
	{
		value: "vertical-farming",
		label: "Vertical Farming",
	},
	{
		value: "aydrophonics",
		label: "Hydrophonics",
	},
	{
		value: "aeroponics",
		label: "Aeroponics",
	},
	{
		value: "rooftop-farming",
		label: "Rooftop Farming",
	},
	{
		value: "indoor-farming",
		label: "Indoor Farming",
	},
	{
		value: "window-farming",
		label: "Window Farming",
	},
];

interface CategoriesCBProps {
	className?: string;
	onChange?: (value: string) => void;
}

const CategoriesCB: React.FC<CategoriesCBProps> = ({ className, onChange }) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={className}
				>
					{value
						? categories.find((framework) => framework.value === value)?.label
						: "Categories"}
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-black" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[190px] p-0">
				<Command>
					<CommandInput placeholder="Search category..." />
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{categories.map((framework) => (
								<CommandItem
									key={framework.value}
									value={framework.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										onChange && onChange(currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === framework.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{framework.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default CategoriesCB;