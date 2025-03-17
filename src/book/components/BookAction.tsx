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
  Alert,
  CircularProgress
} from '@mui/material';
import { BookInfo } from '../entities/BookType';
import { requestBook } from '../services/bookInfoService';
import useReserveBook from '../../bookflow/reservation/hooks/reserveBook';

interface BookActionsProps {
  bookInfo: BookInfo;
  userId: string;
}

export const BookActions: React.FC<BookActionsProps> = ({ bookInfo, userId }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    isPending: isSubmittingReserve,
    isSuccess: successReserve,
    isError: errorReserve,
    mutate: handleReserveSubmit,
    reset: resetReserve,
  } = useReserveBook(() => {
    // Success callback
    setSuccess('Book reserved successfully!');
    console.log("Reservation successful!");
  });

  const hasAvailableBooks = bookInfo.books.some(book => book.status === "Available");

  const handleReserveClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleRequestClick = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  const handleReserveConfirm = () => {
    console.log('Book Info ID to reserve:', bookInfo.bookInfoId);
    setError(null);

    handleReserveSubmit(bookInfo.bookInfoId, {
      onError: (err) => {
        setError('Failed to reserve book. Please try again.');
        console.error(err);
      },
      onSuccess: () => {
        handleCloseConfirmDialog();
      }
    });
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

  const handleCloseAlert = () => {
    setSuccess(null);
    resetReserve();
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Book Actions
          </Typography>
          
          {(successReserve || success) && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={handleCloseAlert}>
              {success || 'Book reserved successfully!'}
            </Alert>
          )}
          
          {(errorReserve || error) && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => { setError(null); resetReserve(); }}>
              {error || 'An error occurred during the operation.'}
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

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reserve "{bookInfo.title}"? The system will automatically assign an available copy to you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button 
            onClick={handleReserveConfirm} 
            color="primary" 
            disabled={isSubmittingReserve}
          >
            {isSubmittingReserve ? <CircularProgress size={24} /> : 'Confirm Reservation'}
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