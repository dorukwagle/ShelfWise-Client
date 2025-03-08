import React, { useState, useEffect } from 'react';
import useAddGenre from '../hooks/useAddGenre';
import GenreTable from './GenreTable';
import { TextField, Button, Paper, Alert, Box, Divider } from '@mui/material';

const GenreForm: React.FC = () => {
  const [genreName, setGenreName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const addGenre = useAddGenre(() => {
    setGenreName('');
    setMessage('Genre successfully added to the database!');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const genre = { genre: genreName };
    setMessage(null);

    addGenre.mutate(genre, {
      onError: (error: any) => {
        setMessage(`An error occurred: ${error.response?.data.message || error.message}`);
      },
    });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4 , gap: 2}}>
      <Box sx={{ flex: 3 }}>
        <GenreTable />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flex: 2 }}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Genre"
              variant="outlined"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Genre
            </Button>
          </form>
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        </Paper>
      </Box>
    </Box>
  );
};

export default GenreForm;