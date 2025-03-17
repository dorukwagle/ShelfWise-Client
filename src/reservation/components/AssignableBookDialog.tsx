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
  Alert, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import fetchAssignables from '../hooks/get_assignable';
import { Reservation } from '../entities/reservations';
import { AxiosError } from 'axios';

interface AssignableBooksDialogProps {
  open: boolean;
  reservationId: string | null;
  onClose: () => void;
  onSelectBook: (book: Reservation) => void;
}

const AssignableBooksDialog: React.FC<AssignableBooksDialogProps> = ({
  open,
  reservationId,
  onClose,
  onSelectBook
}) => {
  // Fetch assignable books when dialog is open and reservationId is set
  const { 
    data: assignableBooks, 
    error: assignableBooksError, 
    isLoading: assignableBooksLoading 
  } = fetchAssignables({ 
    seed: '',
    page: 1,
    pageSize: 10,
    reservationId: reservationId || undefined,
    status: 'Pending'
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">Assignable Books</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {assignableBooksLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : assignableBooksError ? (
          <Alert severity="error">
            Error loading assignable books: {(assignableBooksError as AxiosError)?.message || 'Something went wrong'}
          </Alert>
        ) : assignableBooks?.data.length === 0 ? (
          <Alert severity="info">No assignable books found for this reservation.</Alert>
        ) : (
          <List>
            {assignableBooks?.data.map((book) => (
              <ListItem 
                key={book.bookId} 
                divider
              >
                <ListItemText 
                  primary={book.bookInfo?.title || 'Untitled'} 
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        Barcode: {book.book?.barcode || 'N/A'}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Status: {book.book?.status || 'Unknown'}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    size="small"
                    onClick={() => onSelectBook(book)}
                  >
                    Select
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignableBooksDialog;