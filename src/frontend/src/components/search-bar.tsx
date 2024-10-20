import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

    };

    return (
        <Popover >
            <PopoverTrigger asChild>
                <div>
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search..."
                        className="border border-black rounded-full pl-4 pr-12 py-2 w-full max-md:hidden"
                    />
                </div>
            </PopoverTrigger>

            <PopoverContent>
                <p>Search results or suggestions will appear here...</p>
            </PopoverContent>

        </Popover>
    );
};

export default SearchBar;
