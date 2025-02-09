import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';

interface AddBookFormProps {
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const theme = useTheme();
  const [addedDate, setAddedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    classNumber: '',
    bookNumber: '',
    editionStatement: '',
    seriesStatement: '',
    publicationYear: '',
    numberOfPages: '',
    pricePerPiece: '',
    totalPieces: '',
    publisherId: '',
    coverPhoto: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverPhoto: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('subtitle', formData.subtitle);
    formDataToSubmit.append('classNumber', formData.classNumber);
    formDataToSubmit.append('bookNumber', formData.bookNumber);
    formDataToSubmit.append('editionStatement', formData.editionStatement);
    formDataToSubmit.append('seriesStatement', formData.seriesStatement);
    formDataToSubmit.append('publicationYear', formData.publicationYear);
    formDataToSubmit.append('numberOfPages', formData.numberOfPages);
    formDataToSubmit.append('pricePerPiece', formData.pricePerPiece);
    formDataToSubmit.append('totalPieces', formData.totalPieces);
    formDataToSubmit.append('publisherId', formData.publisherId);
    if (formData.coverPhoto) formDataToSubmit.append('coverPhoto', formData.coverPhoto);

    try {
      const response = await fetch('/api/add-book', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        alert('Book added successfully!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <Box sx={{ position: 'relative', padding: 2, borderRadius: 4 }}>
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: theme.palette.mode === 'light' ? 'black' : 'white',
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
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        }}
      >
        <BookIcon sx={{ mr: 1, color: theme.palette.mode === 'light' ? 'black' : 'white' }} /> Add New Book
      </Typography>

      {/* Form Fields */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Form Fields */}
          <Grid item xs={6}>
            <TextField
              label="Book Title"
              variant="outlined"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Subtitle"
              variant="outlined"
              fullWidth
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Class Number"
              variant="outlined"
              fullWidth
              name="classNumber"
              value={formData.classNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Book Number"
              variant="outlined"
              fullWidth
              name="bookNumber"
              value={formData.bookNumber}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Edition Statement"
              variant="outlined"
              fullWidth
              name="editionStatement"
              value={formData.editionStatement}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Series Statement"
              variant="outlined"
              fullWidth
              name="seriesStatement"
              value={formData.seriesStatement}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Publication Year"
              variant="outlined"
              fullWidth
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Number of Pages"
              variant="outlined"
              fullWidth
              name="numberOfPages"
              value={formData.numberOfPages}
              onChange={handleInputChange}
            />
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
            <TextField
              label="Price Per Piece"
              type="number"
              variant="outlined"
              fullWidth
              name="pricePerPiece"
              value={formData.pricePerPiece}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Total Pieces"
              type="number"
              variant="outlined"
              fullWidth
              name="totalPieces"
              value={formData.totalPieces}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Publisher ID"
              variant="outlined"
              fullWidth
              name="publisherId"
              value={formData.publisherId}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'gray' } }}
            >
              Upload Cover Photo
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ height: 45 }}>
              Add Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddBookForm;





