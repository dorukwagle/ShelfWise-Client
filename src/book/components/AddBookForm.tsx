import React, { useState } from 'react';
import { 
    Box, TextField, Button, Typography, Grid, IconButton
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import useAddBook from '../hooks/useAddBooks';

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
    bookAuthors: [] as string[],  
    isbns: [] as string[],        
    bookGenres: [] as string[],   
    barcodes: [] as string[],     
    coverPhoto: null as File | null,
  });

  const { mutate: addBook } = useAddBook(() => {});

  /** Handles standard input changes */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ['bookAuthors', 'isbns', 'bookGenres', 'barcodes'].includes(name)
        ? value ? value.split(',').map((item) => item.trim()) : [] // Ensure array format
        : value
    }));
  };

  /** Handles date change */
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setAddedDate(date);
    if (date) {
      setFormData((prev) => ({ ...prev, addedDate: date.format('YYYY-MM-DD') }));
    }
  };

  /** Handles file selection */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverPhoto: file }));
    }
  };

  /** Handles form submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Final Form Data:', formData);

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => formDataToSubmit.append(`${key}[]`, item)); // Append correctly for arrays
        } else {
          formDataToSubmit.append(key, value.toString());
        }
      }
    });

    if (formData.coverPhoto) formDataToSubmit.append('coverPhoto', formData.coverPhoto);

    try {
      addBook(formDataToSubmit);
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
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 2 }}>
        <BookIcon sx={{ mr: 1 }} /> Add New Book
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/** Book Details */}
          <Grid item xs={6}><TextField label="Book Title" fullWidth name="title" value={formData.title} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Subtitle" fullWidth name="subtitle" value={formData.subtitle} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Class Number" fullWidth name="classNumber" value={formData.classNumber} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Book Number" fullWidth name="bookNumber" value={formData.bookNumber} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Edition Statement" fullWidth name="editionStatement" value={formData.editionStatement} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Series Statement" fullWidth name="seriesStatement" value={formData.seriesStatement} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Publication Year" fullWidth name="publicationYear" value={formData.publicationYear} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Number of Pages" fullWidth name="numberOfPages" value={formData.numberOfPages} onChange={handleInputChange} /></Grid>

          {/** Date Picker */}
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Added Date" value={addedDate} onChange={handleDateChange} renderInput={(params) => <TextField {...params} fullWidth />} />
            </LocalizationProvider>
          </Grid>

          {/** Numeric Inputs */}
          <Grid item xs={6}><TextField label="Price Per Piece" type="number" fullWidth name="pricePerPiece" value={formData.pricePerPiece} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Total Pieces" type="number" fullWidth name="totalPieces" value={formData.totalPieces} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Publisher ID" fullWidth name="publisherId" value={formData.publisherId} onChange={handleInputChange} /></Grid>

          {/** Multi-Value Inputs */}
          <Grid item xs={6}><TextField label="Author IDs (comma-separated)" fullWidth name="bookAuthors" value={formData.bookAuthors.join(', ')} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="ISBNs (comma-separated)" fullWidth name="isbns" value={formData.isbns.join(', ')} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Genres (comma-separated)" fullWidth name="bookGenres" value={formData.bookGenres.join(', ')} onChange={handleInputChange} /></Grid>
          <Grid item xs={6}><TextField label="Barcodes (comma-separated)" fullWidth name="barcodes" value={formData.barcodes.join(', ')} onChange={handleInputChange} /></Grid>

          {/** File Upload */}
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Cover Photo
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Grid>

          {/** Submit Button */}
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
