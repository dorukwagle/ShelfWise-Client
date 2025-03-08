import React from "react";
import {
  Paper,
  Grid,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { debounce } from "@mui/material";
import { BookSortType, FilterState } from "../entities/BookType";
import useAuthors from "../../attributes/hooks/useAuthors";
import useGenres from "../../attributes/hooks/useGenres";

interface FilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const BookFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const { data: authors, isLoading: authorsLoading, error: authorsError } = useAuthors({
    seed: filters.authorSeed || "",
    page: 1,
    pageSize: 15
  });
  const { data: genres, isLoading: genresLoading, error: genresError } = useGenres({
    seed: filters.genreSeed || ""
  });

  // Debounce functions for each field
  const debouncedSeedChange = React.useMemo(
    () => debounce((value: string) => {
      onFilterChange({ ...filters, seed: value });
    }, 300),
    [filters, onFilterChange]
  );

  const debouncedGenreSeedChange = React.useMemo(
    () => debounce((value: string) => {
      onFilterChange({ ...filters, genreSeed: value, genre: "" });
    }, 300),
    [filters, onFilterChange]
  );

  const debouncedAuthorSeedChange = React.useMemo(
    () => debounce((value: string) => {
      onFilterChange({ ...filters, authorSeed: value, author: "" });
    }, 300),
    [filters, onFilterChange]
  );

  // Cleanup debounces on unmount
  React.useEffect(() => {
    return () => {
      debouncedSeedChange.clear();
      debouncedGenreSeedChange.clear();
      debouncedAuthorSeedChange.clear();
    };
  }, [debouncedSeedChange, debouncedGenreSeedChange, debouncedAuthorSeedChange]);

  const handleSortChange = (event: SelectChangeEvent<BookSortType>) => {
    onFilterChange({
      ...filters,
      sort: event.target.value as BookSortType,
    });
  };

  // Find the selected genre/author objects based on ID
  const selectedGenre = genres?.data.find(g => g.genreId === filters.genre) || null;
  const selectedAuthor = authors?.data.find(a => a.authorId === filters.author) || null;

  // Ensure unique options for Autocomplete components
  const uniqueGenres = React.useMemo(() => {
    if (!genres?.data) return [];
    const seen = new Set();
    return genres.data.filter(genre => {
      const duplicate = seen.has(genre.genreId);
      seen.add(genre.genreId);
      return !duplicate;
    });
  }, [genres?.data]);

  const uniqueAuthors = React.useMemo(() => {
    if (!authors?.data) return [];
    const seen = new Set();
    return authors.data.filter(author => {
      const duplicate = seen.has(author.authorId);
      seen.add(author.authorId);
      return !duplicate;
    });
  }, [authors?.data]);

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
              onChange={(e) => debouncedSeedChange(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              fullWidth
              freeSolo
              options={uniqueGenres}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option.genre;
              }}
              isOptionEqualToValue={(option, value) => {
                return option.genreId === value.genreId;
              }}
              value={selectedGenre}
              onChange={(_event, newValue) => {
                if (newValue && typeof newValue !== 'string' && newValue.genreId) {
                  onFilterChange({
                    ...filters,
                    genre: newValue.genreId,
                  });
                } else {
                  onFilterChange({
                    ...filters,
                    genre: "",
                  });
                }
              }}
              onInputChange={(_event, newInputValue) => {
                debouncedGenreSeedChange(newInputValue);
              }}
              loading={genresLoading}
              renderOption={(props, option) => (
                <li {...props} key={`genre-${option.genreId}`}>
                  {option.genre}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Genre"
                  variant="outlined"
                  size="small"
                  placeholder="Type to search genres..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {genresLoading && <CircularProgress size={20} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  error={!!genresError}
                  helperText={genresError ? "Error loading genres" : ""}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              fullWidth
              freeSolo
              options={uniqueAuthors}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option.fullName;
              }}
              isOptionEqualToValue={(option, value) => {
                return option.authorId === value.authorId;
              }}
              value={selectedAuthor}
              onChange={(_event, newValue) => {
                if (newValue && typeof newValue !== 'string' && newValue.authorId) {
                  onFilterChange({
                    ...filters,
                    author: newValue.authorId,
                  });
                } else {
                  onFilterChange({
                    ...filters,
                    author: "",
                  });
                }
              }}
              onInputChange={(_event, newInputValue) => {
                debouncedAuthorSeedChange(newInputValue);
              }}
              loading={authorsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Author"
                  variant="outlined"
                  size="small"
                  placeholder="Type to search authors..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {authorsLoading && <CircularProgress size={20} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  error={!!authorsError}
                  helperText={authorsError ? "Error loading authors" : ""}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select<BookSortType>
                value={filters.sort || ""}
                label="Sort By"
                onChange={handleSortChange}
              >
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