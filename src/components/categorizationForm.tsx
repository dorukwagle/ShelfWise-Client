import React from "react";
import { TextField, Grid, Chip, CircularProgress, Autocomplete } from "@mui/material";
import useGenres from "../hooks/useGenres";
import useAuthors from "../hooks/useAuthors";
import usePublishers from "../hooks/usePublishers";

const CategorizationForm: React.FC<{ formData: any; onChange: (data: any) => void }> = ({ formData, onChange }) => {
  // Fetch data
  const { data: genresData, isLoading: genresLoading } = useGenres({});
  const { data: authorsData, isLoading: authorsLoading } = useAuthors({});
  const { data: publishersData, isLoading: publishersLoading } = usePublishers({});

  const genres = genresData?.data || [];
  const authors = authorsData?.data || [];
  const publishers = publishersData?.data || [];

  if (genresLoading || authorsLoading || publishersLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Class Number"
          value={formData.classNumber}
          onChange={(e) => onChange({ classNumber: e.target.value })}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Book Number"
          value={formData.bookNumber}
          onChange={(e) => onChange({ bookNumber: e.target.value })}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={genres}
          getOptionLabel={(option) => option.genre}
          value={genres.filter((g) => formData.genre.includes(g.genreId))} // Match IDs to objects
          onChange={(event, newValue) => onChange({ genre: newValue.map((g) => g.genreId) })}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip key={option.genreId} label={option.genre} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Genre" variant="outlined" />}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          options={publishers}
          getOptionLabel={(option) => option.publisherName}
          value={publishers.find((p) => p.publisherId === formData.publisher) || null} // Match ID
          onChange={(event, newValue) => onChange({ publisher: newValue ? newValue.publisherId : "" })}
          renderInput={(params) => <TextField {...params} label="Publisher" variant="outlined" />}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={authors}
          getOptionLabel={(option) => option.fullName}
          value={authors.filter((a) => formData.author.includes(a.authorId))} // Match IDs
          onChange={(event, newValue) => onChange({ author: newValue.map((a) => a.authorId) })}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip key={option.authorId} label={option.fullName} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Author" variant="outlined" />}
        />
      </Grid>
    </Grid>
  );
};

export default CategorizationForm;
