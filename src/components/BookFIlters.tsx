import React from 'react';
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
  SelectChangeEvent
} from '@mui/material';
import { BookSortType, FilterState } from '../entities/BookType';

interface FilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const BookFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  // Debounce text field changes
  const debouncedFilterChange = React.useMemo(
    () => debounce((key: keyof FilterState, value: string) => {
      onFilterChange({
        ...filters,
        [key]: value
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

  const handleTextChange = (key: keyof FilterState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    debouncedFilterChange(key, event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<BookSortType>) => {
    onFilterChange({
      ...filters,
      sort: event.target.value as BookSortType
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
              defaultValue={filters.seed || ''}
              onChange={handleTextChange('seed')}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Genre"
              placeholder="Filter by genre"
              defaultValue={filters.genre || ''}
              onChange={handleTextChange('genre')}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Author"
              placeholder="Filter by author"
              defaultValue={filters.author || ''}
              onChange={handleTextChange('author')}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select<BookSortType>
                value={filters.sort || ''}
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