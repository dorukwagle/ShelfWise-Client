import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Dialog, DialogContent, DialogTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from '../components/AddBookForm';

interface OnlineBooksPageProps {}

const OnlineBooksPage: React.FC<OnlineBooksPageProps> = () => {
  const [open, setOpen] = useState(false); 

  // Open the dialog to add a new book
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Book Management</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Field */}
          <TextField
            variant="outlined"
            placeholder="Search for a book..."
            sx={{
              width: 350,
              height: 40,
              '& .MuiOutlinedInput-root': {
                height: 40,
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#555' },
                '&.Mui-focused fieldset': { borderColor: '#000' },
              },
              '& .MuiInputBase-input': {
                padding: '10px 12px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Add Book Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00308F',
              color: 'primary',
              '&:hover': { backgroundColor: 'paper' },
              height: 40,
              display: 'flex',
              alignItems: 'center',
            }}
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Book
          </Button>
        </Box>
      </Box>

      {/* Dialog for Add Book Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <AddBookForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OnlineBooksPage;



