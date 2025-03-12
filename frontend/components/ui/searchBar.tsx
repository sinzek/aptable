import { SearchIcon } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex flex-row w-[90%] border-2 bg-gray-300/25 text-white text-xl font-aleo font-semibold gap-2 h-10 rounded-full items-center">
            <SearchIcon strokeWidth={3} className="ml-2" />
            <input name="searchInput" className="w-full bg-transparent outline-none border-none" autoFocus placeholder="">

            </input>

        </div>
    );
};

export { SearchBar }