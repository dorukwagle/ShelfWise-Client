import React from "react";
import { TextField, Button } from "@mui/material";

interface SearchBarProps {
    value: string;
    onChange: (query: string) => void; // Updates the local query state
    onSearch: () => void; // Triggers the search action
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
                label="Search by User Name, Book Title, or Reservation ID"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={onSearch}>
                Search
            </Button>
        </div>
    );
};

export default SearchBar;