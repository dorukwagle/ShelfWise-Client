import { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Dialog, DialogContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from '../components/AddBookForm';
import PublisherForm from '../pages/PublisherForm';

const OnlineBooksPage = () => {
  const [openBookDialog, setOpenBookDialog] = useState(false);
  const [openPublisherDialog, setOpenPublisherDialog] = useState(false);

  // Function to open book dialog
  const handleOpenBookDialog = () => {
    setOpenBookDialog(true);
  };

  // Function to close book dialog
  const handleCloseBookDialog = () => {
    setOpenBookDialog(false);
  };

  // Function to open publisher dialog
  const handleOpenPublisherDialog = () => {
    setOpenPublisherDialog(true);
  };

  // Function to close publisher dialog
  const handleClosePublisherDialog = () => {
    setOpenPublisherDialog(false);
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
            onClick={handleOpenBookDialog}
          >
            Add Book
          </Button>
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
            onClick={handleOpenPublisherDialog} // Open the publisher popup
          >
            Add Publisher
          </Button>
        </Box>
      </Box>

      {/* Dialog for Add Book Form */}
      <Dialog open={openBookDialog} onClose={handleCloseBookDialog}>
        <DialogContent>
          <AddBookForm onClose={handleCloseBookDialog} />
        </DialogContent>
      </Dialog>

      {/* Dialog for Publisher Form */}
      <Dialog open={openPublisherDialog} onClose={handleClosePublisherDialog}>
        <DialogContent>
          <PublisherForm onClose={handleClosePublisherDialog} /> {/* Pass close function */}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OnlineBooksPage;
