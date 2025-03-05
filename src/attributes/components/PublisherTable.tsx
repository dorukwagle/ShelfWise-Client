import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert, IconButton, Box, TextField, Typography, Button } from '@mui/material';
import { Edit, Delete, Save, Cancel, SearchOff, Search } from '@mui/icons-material';
import usePublishers from '../hooks/usePublishers';
import useDeletePublisher from '../hooks/useDeletePublisher';
import useUpdatePublisher from '../hooks/useUpdatePublisher';
import useSearchPublishers from '../hooks/useSearchPublishers';
import Publisher from '../entities/Publisher';

const PublisherTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: publishersData, isLoading: publishersLoading, error: publishersError } = usePublishers({ page: 1, pageSize: 15, seed: '' });
  const { data: searchResults, error: searchError, isLoading: searchLoading } = useSearchPublishers(searchTerm);
  const deletePublisherMutation = useDeletePublisher();
  const updatePublisherMutation = useUpdatePublisher();

  const [editingPublisherId, setEditingPublisherId] = useState<string | null>(null);
  const [updatedPublisher, setUpdatedPublisher] = useState<Publisher | null>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (publishersLoading || searchLoading) return <CircularProgress />;
  if (publishersError || searchError) return <Alert severity="error">An error occurred: {publishersError?.message || searchError?.message}</Alert>;

  const handleDelete = (publisherId: string) => {
    if (window.confirm("Are you sure you want to delete this publisher?")) {
      deletePublisherMutation.mutate(publisherId, {
        onError: (error) => {
          console.error("Error deleting publisher:", error);
          alert("Failed to delete the publisher.");
        },
      });
    }
  };

  const handleEdit = (publisher: Publisher) => {
    setEditingPublisherId(publisher.publisherId!);
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

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setSearchTerm("");
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const publishersToShow = searchTerm ? searchResults?.data : publishersData?.data;

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <TextField
          inputRef={searchInputRef}
          label="Search Publisher"
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
      {publishersToShow && publishersToShow.length > 0 ? (
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
            {publishersToShow.map((publisher: Publisher) => (
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
                        <IconButton onClick={handleSaveEdit} size="small" disabled={updatePublisherMutation.isPending}>
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
                        <IconButton onClick={() => handleDelete(publisher.publisherId!)} size="small" disabled={deletePublisherMutation.isPending}>
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
            Sorry, no publishers found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PublisherTable;