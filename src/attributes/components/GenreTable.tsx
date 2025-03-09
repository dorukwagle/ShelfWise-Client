import React, { useState, useRef, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Box, CircularProgress, Alert, Typography, Button } from "@mui/material";
import { Edit, Delete, Save, Cancel, SearchOff, Search } from "@mui/icons-material";

import useDeleteGenre from "../hooks/useDeleteGenre";
import useUpdateGenre from "../hooks/useUpdateGenre";
import Genre from "../entities/Genre";
import useGenres from "../hooks/useGenres";
import PaginationParams from "../../entities/PaginationParams";

const GenreTable: React.FC = () => {
  const [genreParams, setgenreParams] = useState<PaginationParams>({seed: "", page: 1, pageSize: 15});
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: genresData, isLoading, error: genresError } = useGenres(genreParams);
  const deleteGenreMutation = useDeleteGenre();
  const updateGenreMutation = useUpdateGenre();

  const [editingGenreId, setEditingGenreId] = useState<string | null>(null);
  const [updatedGenre, setUpdatedGenre] = useState<string>("");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  if (genresError) return <Alert severity="error">An error occurred: {genresError?.message}</Alert>;

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
      setgenreParams({...genreParams, seed: ''});
    }
  };

  const handleSearch = () => {
    setgenreParams({...genreParams, seed:searchInput});
  };

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
      {!genresData?.data.length && (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
          <SearchOff fontSize="large" color="disabled" />
          <Typography variant="h6" align="center">
            Sorry, no genres found.
          </Typography>
        </Box>
      )}
      {genresData && genresData.data.length && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Genre</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genresData.data.map((genre: Genre) => (
              <TableRow key={genre.genreId}>
                <TableCell sx={{ padding: '16px', backgroundColor: editingGenreId === genre.genreId ? 'secondary.light' : 'inherit' }}>
                  {editingGenreId === genre.genreId ? (
                    <TextField
                      size="small"
                      value={updatedGenre}
                      onChange={(e) => setUpdatedGenre(e.target.value)}
                      autoFocus
                      sx={{ typography: 'body2' }}
                    />
                  ) : (
                    genre.genre
                  )}
                </TableCell>
                <TableCell align="right" sx={{ padding: '16px', backgroundColor: editingGenreId === genre.genreId ? 'secondary.light' : 'inherit' }}>
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
      )}
    </Box>
  );
};

export default GenreTable;

