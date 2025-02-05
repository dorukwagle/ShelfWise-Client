import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from '../components/AddBookForm'; 

const OnlineBooksPage = () => {
  const [open, setOpen] = useState(false); 

  // Function to open the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Book Management</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00308F',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#333333' },
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
          <AddBookForm />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default OnlineBooksPage;



