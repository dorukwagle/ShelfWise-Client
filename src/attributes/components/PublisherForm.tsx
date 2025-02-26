import React, { useState } from 'react';
import { TextField, Button, Paper, Alert, Box } from '@mui/material';
import useAddPublisher from '../hooks/useAddPublisher';
import PublisherTable from './PublisherTable';

const PublisherForm: React.FC = () => {
  const [publisherName, setPublisherName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const addPublisher = useAddPublisher(() => {
    setPublisherName('');
    setAddress('');
    setMessage('Publisher successfully added to the database!');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const publisher = { publisherName, address };

    setMessage(null);

    addPublisher.mutate(publisher, {
      onError: (error: any) => {
        setMessage(`An error occurred: ${error.response?.data.message || error.message}`);
      },
    });
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder='Publisher Name'
              variant="outlined"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              placeholder='Address'
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Publisher
            </Button>
          </form>
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        </Paper>
      </Box>

      <Box>
        <PublisherTable />
      </Box>


    </>
  );
};

export default PublisherForm;



