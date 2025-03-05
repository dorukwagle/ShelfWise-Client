import React, { useState, useRef, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Box, CircularProgress, Alert, Typography, Button } from "@mui/material";
import { Edit, Delete, Save, Cancel, SearchOff, Search } from "@mui/icons-material";
import useTodos from "../hooks/useGenres";
import useDeleteGenre from "../hooks/useDeleteGenre";
import useUpdateGenre from "../hooks/useUpdateGenre";
import useSearchGenres from '../hooks/useSearchGenres';
import Genre from "../entities/Genre";
import PaginationResponse from "../../entities/PaginationResponse";

const GenreTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: genresData, isLoading: genresLoading, error: genresError } = useTodos({ seed: '' });
  const { data: searchResults, error: searchError, isLoading: searchLoading } = useSearchGenres(searchTerm);
  const deleteGenreMutation = useDeleteGenre();
  const updateGenreMutation = useUpdateGenre();

  const [editingGenreId, setEditingGenreId] = useState<string | null>(null);
  const [updatedGenre, setUpdatedGenre] = useState<string>("");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (genresLoading || searchLoading) return <CircularProgress />;
  if (genresError || searchError) return <Alert severity="error">An error occurred: {genresError?.message || searchError?.message}</Alert>;

  const handleEdit = (genreId: string, genre: string) => {
    setEditingGenreId(genreId);
    setUpdatedGenre(genre);
  };

  const handleCancelEdit = () => {
    setEditingGenreId(null);
    setUpdatedGenre("");
  };

  const handleSaveEdit = (genreId: string) => {
    if (!updatedGenre.trim()) return;

    updateGenreMutation.mutate(
      { genreId, genre: updatedGenre },
      {
        onSuccess: () => {
          setEditingGenreId(null);
          setUpdatedGenre("");
        },
      }
    );
  };

  const handleDelete = (genreId: string) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      deleteGenreMutation.mutate(genreId, {
        onError: (error) => {
          console.error("Error deleting genre:", error);
          alert("Failed to delete the genre.");
        },
      });
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setSearchTerm("");
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const genresToShow = searchTerm ? searchResults?.data : genresData?.data;

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <TextField
          inputRef={searchInputRef}
          label="Search Genre"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleSearchInputChange}
          sx={{ width: '350px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginLeft: 1 }}
          startIcon={<Search />}
        >
          Search
        </Button>
      </Box>
      {genresToShow && genresToShow.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Genre ID</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genresToShow.map((genre: Genre) => (
              <TableRow key={genre.genreId}>
                <TableCell>{genre.genreId}</TableCell>
                <TableCell>
                  {editingGenreId === genre.genreId ? (
                    <TextField
                      size="small"
                      value={updatedGenre}
                      onChange={(e) => setUpdatedGenre(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    genre.genre
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end">
                    {editingGenreId === genre.genreId ? (
                      <>
                        <IconButton onClick={() => handleSaveEdit(genre.genreId!)} size="small" disabled={updateGenreMutation.isPending}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} size="small">
                          <Cancel fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(genre.genreId!, genre.genre)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(genre.genreId!)} size="small" disabled={deleteGenreMutation.isPending}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
          <SearchOff fontSize="large" color="disabled" />
          <Typography variant="h6" align="center">
            Sorry, no genres found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GenreTable;




