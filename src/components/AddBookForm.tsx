import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface AddBookFormProps {
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const [addedDate, setAddedDate] = useState(dayjs());

  return (
    <Box
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          mb: 2,
          color: 'white'
        }}
      >
        <BookIcon sx={{ mr: 1, color: 'white' }} /> Add New Book
      </Typography>

      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Book Title" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Subtitle" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Class Number" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Book Number" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Edition Statement" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Series Statement" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Publication Year" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Number of Pages" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Added Date"
              value={addedDate}
              onChange={(newValue) => setAddedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <TextField label="Price Per Piece" type="number" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Total Pieces" type="number" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Publisher ID" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'gray' } }}
          >
            Upload Cover Photo
            <input type="file" accept="image/*" hidden />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ height: 45 }}>
            Add Book
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBookForm;




