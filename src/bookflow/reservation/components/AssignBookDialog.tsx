import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { AxiosError } from 'axios';
import { BookReservation } from '../entities/BookReservation';
import useAssignReservation from '../hooks/assginReservation';
import { Books } from '../../../book/entities/BookType';

interface AssignBookDialogProps {
  open: boolean;
  selectedBook: Books | null;
  reservation: BookReservation | null;
  onClose: () => void;
  onSuccess: () => void;
}

const AssignBookDialog: React.FC<AssignBookDialogProps> = ({
  open,
  selectedBook,
  reservation,
  onClose,
  onSuccess
}) => {
  // Mutation hook for assigning book
  const assignReservation = useAssignReservation(onSuccess);
  
  // Handle assigning the book
  const handleAssignBook = () => {
    if (reservation) {
      // Create assignment data with required fields
      const assignmentData: BookReservation = {
        ...reservation,
        reservationId: reservation.reservationId,
        bookId: selectedBook?.bookId,
        reservationDate: reservation.reservationDate
      };
      
      // Call the mutation
      console.log(selectedBook);
      
      
      console.log(assignmentData);

      console.log('asdf');
      console.log(reservation);
      
      
      assignReservation.mutate(assignmentData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Assign Book</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to assign this book to the user?
        </Typography>
        {assignReservation.isPending && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {assignReservation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {(assignReservation.error as AxiosError)?.message || "An error occurred"}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="primary"
          disabled={assignReservation.isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleAssignBook} 
          color="success" 
          variant="contained"
          startIcon={<LibraryBooksIcon />}
          disabled={assignReservation.isPending}
        >
          Assign Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignBookDialog;