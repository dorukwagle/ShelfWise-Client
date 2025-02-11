import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, IconButton, TextField, Box, CircularProgress, Alert } from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import useTodos from "../hooks/useGenres";
import useDeleteGenre from "../hooks/useDeleteGenre";
import useUpdateGenre from "../hooks/useUpdateGenre";

const GenreTable: React.FC = () => {
  const { data, isLoading, error } = useTodos({ });
  const deleteGenreMutation = useDeleteGenre();
  const updateGenreMutation = useUpdateGenre();

  const [editingGenreId, setEditingGenreId] = useState<string | null>(null);
  const [updatedGenre, setUpdatedGenre] = useState<string>("");

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

  return (
    <Table>
      <TableHead>
            <TableRow>
              <TableCell>Genre ID</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((genre) => (
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
  );
};

export default GenreTable;





