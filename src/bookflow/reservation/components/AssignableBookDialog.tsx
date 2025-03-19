import React, { useState } from 'react';
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
import { AxiosError } from 'axios';
import { BookReservation } from '../entities/BookReservation';
import UseFetchAssignables from '../hooks/getAssignable';
import IssueBookDialog from '../../issuance/components/IssueBookDialog';
import { Books } from '../../../book/entities/BookType';

interface AssignableBooksDialogProps {
  open: boolean;
  selectedBook: BookReservation | null;
  onClose: () => void;
  onSelectBook: (book: Books) => void;
}

const AssignableBooksDialog: React.FC<AssignableBooksDialogProps> = ({
  open,
  selectedBook,
  onClose,
  onSelectBook
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [barcode, setBarcode] = useState("");

  // Fetch assignable books when dialog is open and reservationId is set
  const {
    data: assignableBooks,
    error: assignableBooksError,
    isPending: assignableBooksLoading
  } = UseFetchAssignables({
    seed: '',
    page: 1,
    pageSize: 10,
    reservationId: selectedBook?.reservationId || undefined,
    status: 'Pending'
  });

  const handleIssueBook = (book: any) => {
    setBarcode(book.barcode);
    setOpenDialog(true);
  };
  const handleIssueClose = (book: any) => {
    setOpenDialog(false)
    onClose;
  };

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
        ) : !Array.isArray(assignableBooks) || assignableBooks?.length === 0 ? (
          <Alert severity="info">No assignable books found for this reservation.</Alert>
        ) : (
          <>
            <List>
              {assignableBooks.map((book) => (
                <ListItem key={book.bookId} divider>
                  <ListItemText
                    primary={`Barcode: ${book.barcode}`}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Status: {book.status || 'Unknown'}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Book ID: {book.bookId}
                        </Typography>
                      </>
                    }
                  />
                  {( book.status=='Available' &&
                    <ListItemSecondaryAction>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      // onClick={() => onSelectBook(book)}
                      onClick={() => handleIssueBook(book)}
                    >
                      Select
                    </Button> */}
                    <Button 
                    variant="outlined" 
                    color="primary"
                    size="small"
                    onClick={() => onSelectBook(book)}
                  >
                    Select
                  </Button>
                  </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {assignableBooks.length} of {assignableBooks.length} results
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
      {/* {selectedBook?.reservationId && (
        <IssueBookDialog
          open={openDialog}
          onClose={() => handleIssueClose}
          reservation={selectedBook}
          barcode={barcode}
        />
      )} */}
    </Dialog>

  );
};

export default AssignableBooksDialog;