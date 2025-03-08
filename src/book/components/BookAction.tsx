import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  CircularProgress
} from '@mui/material';
import { BookInfo } from '../entities/BookType';
import { requestBook, reserveBook } from '../services/bookInfoService';

interface BookActionsProps {
  bookInfo: BookInfo;
  userId: string;
}

export const BookActions: React.FC<BookActionsProps> = ({ bookInfo, userId }) => {
  const [selectedBookId, setSelectedBookId] = useState<string>('');
  const [openReserveDialog, setOpenReserveDialog] = useState(false);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableBooks = bookInfo.books.filter(book => book.status === "Available");
  const hasAvailableBooks = availableBooks.length > 0;

  const handleBookSelect = (event: SelectChangeEvent) => {
    setSelectedBookId(event.target.value);
  };

  const handleReserveClick = () => {
    setOpenReserveDialog(true);
  };

  const handleRequestClick = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseReserveDialog = () => {
    setOpenReserveDialog(false);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  const handleReserveSubmit = async () => {
    if (!selectedBookId) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      await reserveBook(selectedBookId, userId);
      setSuccess('Book reserved successfully!');
      handleCloseReserveDialog();
    } catch (err) {
      setError('Failed to reserve book. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await requestBook(bookInfo.bookInfoId, userId);
      setSuccess('Book requested successfully!');
      handleCloseRequestDialog();
    } catch (err) {
      setError('Failed to request book. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Book Actions
          </Typography>
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!hasAvailableBooks}
              onClick={handleReserveClick}
            >
              Reserve Book
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleRequestClick}
            >
              Request Book
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Reserve Dialog */}
      <Dialog open={openReserveDialog} onClose={handleCloseReserveDialog}>
        <DialogTitle>Reserve Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select one of the available copies to reserve:
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel id="book-select-label">Available Copy</InputLabel>
            <Select
              labelId="book-select-label"
              value={selectedBookId}
              label="Available Copy"
              onChange={handleBookSelect}
            >
              {availableBooks.map((book) => (
                <MenuItem key={book.bookId} value={book.bookId}>
                  Barcode: {book.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReserveDialog}>Cancel</Button>
          <Button 
            onClick={handleReserveSubmit} 
            color="primary" 
            disabled={!selectedBookId || isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Reserve'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Dialog */}
      <Dialog open={openRequestDialog} onClose={handleCloseRequestDialog}>
        <DialogTitle>Request Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If all copies are currently unavailable, you can request this book. The library will notify you when a copy becomes available.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRequestDialog}>Cancel</Button>
          <Button 
            onClick={handleRequestSubmit} 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Request'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};