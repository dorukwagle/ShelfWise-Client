import React, { useState } from "react";
import { TextField, Chip, Box, Stack } from "@mui/material";

interface TagsInputProps {
  placeholder?: string;
  onChange?: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ placeholder = "Enter tags...", onChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setInputValue("");
        onChange && onChange(newTags);
      }
    }
  };

  const handleDelete = (tagToDelete: string) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
    onChange && onChange(newTags);
  };

  return (
    <Box>
      {/* Input Field */}
      <TextField
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
      />

      {/* Tags appear BELOW the input field */}
      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} onDelete={() => handleDelete(tag)} />
        ))}
      </Stack>
    </Box>
  );
};

export default TagsInput;
