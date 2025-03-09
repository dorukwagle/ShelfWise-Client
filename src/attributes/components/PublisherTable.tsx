import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Alert, IconButton, Box, TextField, Typography, Button } from '@mui/material';
import { Edit, Delete, Save, Cancel, SearchOff, Search } from '@mui/icons-material';
import usePublishers from '../hooks/usePublishers';
import useDeletePublisher from '../hooks/useDeletePublisher';
import useUpdatePublisher from '../hooks/useUpdatePublisher';
import Publisher from '../entities/Publisher';
import PaginationParams from '../../entities/PaginationParams';

const PublisherTable: React.FC = () => {
  const [publisherParams, setpublisherParams] = useState<PaginationParams>({ seed: '', page: 1, pageSize: 15 });
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: publishersData, isLoading, error: publishersError } = usePublishers(publisherParams);
  const deletePublisherMutation = useDeletePublisher();
  const updatePublisherMutation = useUpdatePublisher();

  const [editingPublisherId, setEditingPublisherId] = useState<string | null>(null);
  const [updatedPublisher, setUpdatedPublisher] = useState<Publisher | null>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  if (publishersError) return <Alert severity="error">An error occurred: {publishersError?.message}</Alert>;

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
      setpublisherParams({...publisherParams, seed:searchInput});
    }
  };

  const handleSearch = () => {
    setpublisherParams({...publisherParams, seed:searchInput});
  };


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
      {!publishersData?.data.length && (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
        <SearchOff fontSize="large" color="disabled" />
        <Typography variant="h6" align="center">
          Sorry, no publishers found.
        </Typography>
      </Box>
      )
      }
      {publishersData && publishersData.data.length && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell align="right" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishersData.data.map((publisher: Publisher) => (
              <TableRow key={publisher.publisherId}>
                <TableCell sx={{ padding: '16px', backgroundColor: editingPublisherId === publisher.publisherId ? 'secondary.light' : 'inherit' }}>
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
                <TableCell sx={{ padding: '16px', backgroundColor: editingPublisherId === publisher.publisherId ? 'secondary.light' : 'inherit' }}>
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
                <TableCell align="right" sx={{ padding: '16px', backgroundColor: editingPublisherId === publisher.publisherId ? 'secondary.light' : 'inherit' }}>
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
      )}
    </Box>
  );
};

export default PublisherTable;