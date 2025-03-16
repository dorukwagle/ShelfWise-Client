import { useState } from "react";

export const useSearch = (onSearch: (query: string) => void) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return { searchQuery, setSearchQuery, handleSearch };
};