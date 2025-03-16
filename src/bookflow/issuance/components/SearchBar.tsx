import React from "react";
import { TextField, Button } from "@mui/material";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
                label="Search by Member Name or Book Title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={onSearch}>
                Search
            </Button>
        </div>
    );
};