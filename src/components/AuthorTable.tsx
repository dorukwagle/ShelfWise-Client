import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, IconButton, Box, TextField } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
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

  return (
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
          {data?.data.map((author) => (
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
                      <IconButton onClick={handleSaveEdit} size="small" disabled={updateAuthorMutation.isLoading}>
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
                      <IconButton onClick={() => handleDelete(author.authorId || '')} size="small" disabled={deleteAuthorMutation.isLoading}>
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

export default AuthorTable;
