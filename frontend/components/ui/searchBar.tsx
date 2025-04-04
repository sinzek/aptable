"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

export interface SearchBarProps
    extends React.ButtonHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    ({ placeholder, className, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        return (
            <div
                className={`flex flex-row w-full border bg-gray-300/25 text-white text-xl font-aleo font-semibold gap-2 h-10 py-2 rounded-full shadow-md items-center border-white/50 hover:border-white/75 hover:focus-within:border-white focus-within:border-white focus-within:shadow-white/10 focus-within:shadow-lg transition-all duration-100 ease-in-out ${className}`}
            >
                <SearchIcon
                    strokeWidth={3}
                    className={`ml-2 ${
                        isFocused ? "stroke-white" : "stroke-white/50"
                    } transition-colors duration-100 ease-in-out`}
                />
                <input
                    name="searchInput"
                    className="w-full bg-transparent outline-none border-none"
                    placeholder={placeholder}
                    autoComplete="off"
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                ></input>
            </div>
        );
    }
);

SearchBar.displayName = "Search Bar";

export { SearchBar };
