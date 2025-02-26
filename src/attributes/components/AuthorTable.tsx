import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, IconButton, Box, TextField, Typography } from '@mui/material';
import { Edit, Delete, Save, Cancel, SearchOff } from '@mui/icons-material';
import { Alert } from '@mui/material';
import useAuthors from '../hooks/useAuthors';
import useDeleteAuthor from '../hooks/useDeleteAuthor';
import useUpdateAuthor from '../hooks/useUpdateAuthor';
import Author from '../entities/Author';

const AuthorTable: React.FC = () => {
  const { data, error, isLoading } = useAuthors({ page: 1, pageSize: 15, seed: '' });
  const deleteAuthorMutation = useDeleteAuthor();
  const updateAuthorMutation = useUpdateAuthor();

  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null);
  const [updatedAuthor, setUpdatedAuthor] = useState<Author | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const handleDelete = (authorId: string) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      deleteAuthorMutation.mutate(authorId);
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthorId(author.authorId || null);
    setUpdatedAuthor({ ...author });
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

  const handleCancelEdit = () => {
    setEditingAuthorId(null);
    setUpdatedAuthor(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAuthors = data?.data.filter((author) =>
    author.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredAuthors && filteredAuthors.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAuthors.map((author) => (
              <TableRow key={author.authorId}>
                <TableCell>{author.authorId}</TableCell>
                <TableCell>
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
                <TableCell>
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
                <TableCell align="right">
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
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
          <SearchOff fontSize="large" color="disabled" />
          <Typography variant="h6" align="center">
            Sorry, no authors found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthorTable;

