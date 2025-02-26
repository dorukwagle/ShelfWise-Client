import React from "react";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  debounce,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { BookSortType, FilterState } from "../entities/BookType";
import useAuthors from "../../attributes/hooks/useAuthors";
import Author from "../../attributes/entities/Author";
import useGenres from "../../attributes/hooks/useGenres";

interface FilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const BookFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const { data: authors, isLoading, error } = useAuthors({ 
    seed: filters.seed || "",
    page: 1, 
    pageSize: 15 
  });
  const { data: genres, isLoading: genresLoading, error: genresError } = useGenres({ seed: filters.seed });

  // Debounce text field changes
  const debouncedFilterChange = React.useMemo(
    () =>
      debounce((key: keyof FilterState, value: string) => {
        onFilterChange({
          ...filters,
          [key]: value,
        });
      }, 300),
    [filters, onFilterChange]
  );

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedFilterChange.clear();
    };
  }, [debouncedFilterChange]);

  const handleTextChange = (key: keyof FilterState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFilterChange(key, event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<BookSortType>) => {
    onFilterChange({
      ...filters,
      sort: event.target.value as BookSortType,
    });
  };

  const handleAuthorChange = (event: SelectChangeEvent<string>) => {
    onFilterChange({
      ...filters,
      author: event.target.value || "",
    });
  };

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    onFilterChange({
      ...filters,
      genre: event.target.value || "", // Reset when "None" is selected
    });
  };

  return (
    <Paper elevation={2}>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search"
              placeholder="Search books..."
              defaultValue={filters.seed || ""}
              onChange={handleTextChange("seed")}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
              <InputLabel>Genre</InputLabel>
              <Select
                value={filters.genre || ""}
                label="Genre"
                onChange={handleGenreChange}
                disabled={genresLoading || !!genresError}
              >
                {/* Reset Option */}
                <MenuItem value="">None</MenuItem>

                {/* Loading/Error Handling */}
                {genresLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : genresError ? (
                  <MenuItem disabled>Error loading genres</MenuItem>
                ) : (
                  genres?.data.map((genre) => (
                    <MenuItem key={genre.genreId} value={genre.genreId}>
                      {genre.genre}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Author</InputLabel>
              <Select
                value={filters.author || ""}
                label="Author"
                onChange={handleAuthorChange}
                disabled={isLoading || !!error}
              >
                {/* Reset Option */}
                <MenuItem value="">None</MenuItem>

                {/* Show loading or error state */}
                {isLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : error ? (
                  <MenuItem disabled>Error loading authors</MenuItem>
                ) : (
                  authors?.data.map((author: Author) => (
                    <MenuItem key={author.authorId} value={author.authorId}>
                      {author.fullName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select<BookSortType> value={filters.sort || ""} label="Sort By" onChange={handleSortChange}>
                <MenuItem value="ratings_desc">Rating (High to Low)</MenuItem>
                <MenuItem value="ratings_asc">Rating (Low to High)</MenuItem>
                <MenuItem value="pub_date_desc">Newest First</MenuItem>
                <MenuItem value="pub_date_asc">Oldest First</MenuItem>
                <MenuItem value="added_date_desc">Recently Added</MenuItem>
                <MenuItem value="added_date_asc">Oldest Added</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
