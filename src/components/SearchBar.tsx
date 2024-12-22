import { Search } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="flex items-center gap-4 max-w-80 w-full h-10 border rounded-lg shadow-md">
      <Search className="text-gray-400 w-4 h-auto ml-5" />

      <input
        type="text"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="Search name, email, comment"
        className="outline-none text-xs w-full placeholder:text-gray-400 text-primary"
      />
    </div>
  );
};

export default SearchBar;
