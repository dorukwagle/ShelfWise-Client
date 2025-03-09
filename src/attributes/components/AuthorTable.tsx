import React, { useState, useRef, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Box, CircularProgress, Alert, Typography, Button } from "@mui/material";
import { Edit, Delete, Save, Cancel, SearchOff, Search } from "@mui/icons-material";
import useAuthors from "../hooks/useAuthors";
import useDeleteAuthor from "../hooks/useDeleteAuthor";
import useUpdateAuthor from "../hooks/useUpdateAuthor";
import Author from "../entities/Author";
import PaginationParams from "../../entities/PaginationParams";

const AuthorTable: React.FC = () => {
  const [authorParams, setauthorParams] = useState<PaginationParams>({ seed: '', page: 1, pageSize: 15 });
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: authorsData, isLoading, error: authorsError } = useAuthors(authorParams);
  const deleteAuthorMutation = useDeleteAuthor();
  const updateAuthorMutation = useUpdateAuthor();

  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null);
  const [updatedAuthor, setUpdatedAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  if (authorsError) return <Alert severity="error">An error occurred: {authorsError?.message}</Alert>;

  const handleEdit = (author: Author) => {
    setEditingAuthorId(author.authorId || null);
    setUpdatedAuthor({ ...author });
  };

  const handleCancelEdit = () => {
    setEditingAuthorId(null);
    setUpdatedAuthor(null);
  };

  const handleSaveEdit = () => {
    if (updatedAuthor) {
      updateAuthorMutation.mutate(updatedAuthor, {
        onSuccess: () => {
          setEditingAuthorId(null);
          setUpdatedAuthor(null);
        },
      });
    }
  };

  const handleDelete = (authorId: string) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      deleteAuthorMutation.mutate(authorId, {
        onError: (error) => {
          console.error("Error deleting author:", error);
          alert("Failed to delete the author.");
        },
      });
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setauthorParams({...authorParams, seed:searchInput});
    }
  };

  const handleSearch = () => {
    setauthorParams({...authorParams, seed:searchInput});
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <TextField
          inputRef={searchInputRef}
          label="Search Author"
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
      {!authorsData?.data.length && (
         <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
         <SearchOff fontSize="large" color="disabled" />
         <Typography variant="h6" align="center">
           Sorry, no authors found.
         </Typography>
       </Box>
      )
      }
      {authorsData && authorsData.data.length && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authorsData.data.map((author: Author) => (
              <TableRow key={author.authorId}>
                <TableCell sx={{ padding: '16px', backgroundColor: editingAuthorId === author.authorId ? 'secondary.light' : 'inherit' }}>
                  {editingAuthorId === author.authorId ? (
                    <TextField
                      fullWidth
                      value={updatedAuthor?.title || ''}
                      onChange={(e) => setUpdatedAuthor({ ...updatedAuthor!, title: e.target.value })}
                      select
                      SelectProps={{ native: true }}
                    >
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                    </TextField>
                  ) : (
                    author.title
                  )}
                </TableCell>
                <TableCell sx={{ padding: '16px', backgroundColor: editingAuthorId === author.authorId ? 'secondary.light' : 'inherit' }}>
                  {editingAuthorId === author.authorId ? (
                    <TextField
                      fullWidth
                      value={updatedAuthor?.fullName || ''}
                      onChange={(e) => setUpdatedAuthor({ ...updatedAuthor!, fullName: e.target.value })}
                    />
                  ) : (
                    author.fullName
                  )}
                </TableCell>
                <TableCell align="right" sx={{ padding: '16px', backgroundColor: editingAuthorId === author.authorId ? 'secondary.light' : 'inherit' }}>
                  <Box display="flex" justifyContent="flex-end">
                    {editingAuthorId === author.authorId ? (
                      <>
                        <IconButton onClick={handleSaveEdit} size="small" disabled={updateAuthorMutation.isPending}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} size="small">
                          <Cancel fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(author)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(author.authorId || '')} size="small" disabled={deleteAuthorMutation.isPending}>
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

export default AuthorTable;