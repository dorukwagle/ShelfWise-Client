import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Box, CircularProgress, Alert, Typography } from "@mui/material";
import { Edit, Delete, Save, Cancel, SearchOff } from "@mui/icons-material";
import useTodos from "../hooks/useGenres";
import useDeleteGenre from "../hooks/useDeleteGenre";
import useUpdateGenre from "../hooks/useUpdateGenre";

const GenreTable: React.FC = () => {
  const { data, isLoading, error } = useTodos({});
  const deleteGenreMutation = useDeleteGenre();
  const updateGenreMutation = useUpdateGenre();

  const [editingGenreId, setEditingGenreId] = useState<string | null>(null);
  const [updatedGenre, setUpdatedGenre] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">An error occurred: {error.message}</Alert>;

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
      deleteGenreMutation.mutate(genreId);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredGenres = data?.data.filter((genre) =>
    genre.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <TextField
          label="Search Author"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '350px' }} 
        />
      </Box>
      {filteredGenres && filteredGenres.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Genre ID</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGenres.map((genre) => (
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
                        <IconButton onClick={() => handleSaveEdit(genre.genreId)} size="small" disabled={updateGenreMutation.isLoading}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} size="small">
                          <Cancel fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(genre.genreId, genre.genre)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(genre.genreId)} size="small" disabled={deleteGenreMutation.isLoading}>
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








