import React, { useState } from 'react';
import { TextField, Button, Paper, Alert, Box } from '@mui/material';
import useAddAuthor from '../hooks/useAddAuthor';
import AuthorTable from './AuthorTable';

const AuthorForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const addAuthor = useAddAuthor(() => {
    setTitle('');
    setFullName('');
    setMessage('Author successfully added to the database!');
    setError(false);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setMessage('Write full name please');
      setError(true);
      return;
    }

    setMessage(null);
    setError(false);

    const author = { title, fullName };
    addAuthor.mutate(author, {
      onError: () => {
        setMessage('An error occurred. Please try again.');
        setError(true);
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
              placeholder="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </TextField>

            <TextField
              fullWidth
              placeholder="Full Name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              sx={{ mb: 2 }}
              error={error}
              helperText={error ? 'Full name is required' : ''}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Author
            </Button>
          </form>

          {message && (
            <Alert severity={error ? "error" : "success"} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Paper>
      </Box>

      <Box>
        <AuthorTable />
      </Box>
    </>
  );
};

export default AuthorForm;

