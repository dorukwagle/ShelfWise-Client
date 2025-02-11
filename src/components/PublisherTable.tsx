import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert, IconButton, Box, TextField } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import usePublishers from '../hooks/usePublishers';
import useDeletePublisher from '../hooks/useDeletePublisher';
import useUpdatePublisher from '../hooks/useUpdatePublisher';
import Publisher from '../entities/Publisher';

const PublisherTable: React.FC = () => {
  const { data, isLoading, error } = usePublishers({ page: 1, pageSize: 15 }); 
  const deletePublisherMutation = useDeletePublisher();
  const updatePublisherMutation = useUpdatePublisher();

  const [editingPublisherId, setEditingPublisherId] = useState<string | null>(null);
  const [updatedPublisher, setUpdatedPublisher] = useState<Publisher | null>(null);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">An error occurred: {error.message}</Alert>;

  const handleDelete = (publisherId: string) => {
    if (window.confirm("Are you sure you want to delete this publisher?")) {
      deletePublisherMutation.mutate(publisherId);
    }
  };

  const handleEdit = (publisher: Publisher) => {
    setEditingPublisherId(publisher.publisherId);
    setUpdatedPublisher({ ...publisher });
  };

  const handleSaveEdit = () => {
    if (updatedPublisher) {
      updatePublisherMutation.mutate(updatedPublisher, {
        onSuccess: () => {
          setEditingPublisherId(null);
          setUpdatedPublisher(null);
        },
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingPublisherId(null);
    setUpdatedPublisher(null);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Publisher ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Address</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.data.map((publisher) => (
          <TableRow key={publisher.publisherId}>
            <TableCell>{publisher.publisherId}</TableCell>
            <TableCell>
              {editingPublisherId === publisher.publisherId ? (
                <TextField
                  fullWidth
                  value={updatedPublisher?.publisherName}
                  onChange={(e) => setUpdatedPublisher({ ...updatedPublisher!, publisherName: e.target.value })}
                />
              ) : (
                publisher.publisherName
              )}
            </TableCell>
            <TableCell>
              {editingPublisherId === publisher.publisherId ? (
                <TextField
                  fullWidth
                  value={updatedPublisher?.address}
                  onChange={(e) => setUpdatedPublisher({ ...updatedPublisher!, address: e.target.value })}
                />
              ) : (
                publisher.address
              )}
            </TableCell>
            <TableCell align="right">
              <Box display="flex" justifyContent="flex-end">
                {editingPublisherId === publisher.publisherId ? (
                  <>
                    <IconButton onClick={handleSaveEdit} size="small" disabled={updatePublisherMutation.isLoading}>
                      <Save fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit} size="small">
                      <Cancel fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => handleEdit(publisher)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(publisher.publisherId)} size="small" disabled={deletePublisherMutation.isLoading}>
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

export default PublisherTable;

