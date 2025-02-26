import React, { useState } from "react";
import { TextField, Chip, Box, InputAdornment } from "@mui/material";

interface TagsInputProps {
  placeholder?: string;
  value: string[];
  maxTagLength?: number; // Optional prop to control the max length of tags
  onChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({
  placeholder = "Enter tags...",
  maxTagLength = 4,
  value, onChange,
}) => {

  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!value.includes(inputValue.trim())) {
        const newTags = [...value, inputValue.trim()];
        onChange(newTags);
        setInputValue("");
      }
    }
  };

  const handleDelete = (tagToDelete: string) => {
    const newTags = value.filter((tag) => tag !== tagToDelete);
    onChange(newTags);
  };

  // Function to truncate tag text if it exceeds maxTagLength
  const truncateTag = (tag: string) => {
    return tag.length > maxTagLength ? `${tag.slice(0, maxTagLength)}...` : tag;
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        multiline
        minRows={1} // Ensures it starts as a single row input field
        maxRows={4} // Set a max number of rows before the field stops growing
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                sx={{
                  display: "flex",
                  overflow: "auto", // Allow horizontal scrolling
                  gap: "4px",
                  paddingBottom: "4px",
                  width: "100%", // Ensures the tags input field uses the full width
                }}
              >
                {value.map((tag, index) => (
                  <Chip
                    key={index}
                    label={truncateTag(tag)} // Truncate long tags
                    onDelete={() => handleDelete(tag)}
                    size="small"
                    sx={{
                      margin: "0 4px",
                      whiteSpace: "nowrap", // Prevent tags from breaking mid-word
                    }}
                  />
                ))}
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TagsInput;
