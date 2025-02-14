
import React, { useState } from "react";
import { TextField, Grid, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, CircularProgress } from "@mui/material";
import useGenres from "../hooks/useGenres";
import useAuthors from "../hooks/useAuthors";
import usePublishers from "../hooks/usePublishers"; // Import the usePublishers hook

const CategorizationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    classNumber: "",
    bookNumber: "",
    genre: [],
    publisher: "",
    author: [],
  });

  // Fetch genres, authors, and publishers using the custom hooks
  const { data: genresData, isLoading: genresLoading, isError: genresError } = useGenres({});
  const { data: authorsData, isLoading: authorsLoading, isError: authorsError } = useAuthors({});
  const { data: publishersData, isLoading: publishersLoading, isError: publishersError } = usePublishers({});

  // Get genres, authors, and publishers from the data or default to empty arrays
  const genres = genresData?.data || [];
  const authors = authorsData?.data || [];
  const publishers = publishersData?.data || [];

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  // Add or remove selected genre or author when the cross button is clicked
  const handleChipRemove = (type: "genre" | "author", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value), 
    }));
  };

  // Show loading spinner if data is still being fetched
  if (genresLoading || authorsLoading || publishersLoading) {
    return <CircularProgress />;
  }

  // Show error message if there is an issue loading the genres, authors, or publishers
  if (genresError || authorsError || publishersError) {
    return <div>Error loading genres, authors, or publishers</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Class Number"
          name="classNumber"
          value={formData.classNumber}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Book Number"
          name="bookNumber"
          value={formData.bookNumber}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            multiple
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            input={<OutlinedInput label="Genre" />}
            renderValue={(selected) => (
              <div>
                {(selected as string[]).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleChipRemove("genre", value)} // Remove tag when cross is clicked
                  />
                ))}
              </div>
            )}
          >
            {genres.map((g) => (
              <MenuItem key={g.genreId} value={g.genre}>
                {g.genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Publisher</InputLabel>
          <Select
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            input={<OutlinedInput label="Publisher" />}
          >
            {publishers.map((publisher) => (
              <MenuItem key={publisher.publisherId} value={publisher.publisherName}>
                {publisher.publisherName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Author</InputLabel>
          <Select
            multiple
            name="author"
            value={formData.author}
            onChange={handleChange}
            input={<OutlinedInput label="Author" />}
            renderValue={(selected) => (
              <div>
                {(selected as string[]).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleChipRemove("author", value)} // Remove tag when cross is clicked
                  />
                ))}
              </div>
            )}
          >
            {authors.map((a) => (
              <MenuItem key={a.authorId} value={a.fullName}>
                {a.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CategorizationForm;
