import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [query, setQuery] = useState( "");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?query=${query}`);
    } 
  };

  return (
    <form onSubmit={handleSearch}>
        <Input
					className="border border-black rounded-full pl-4 pr-12 py-2 w-full max-md:hidden"
					placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
				/>
    </form>
  )
}

export default SearchBar