import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useBookList } from '../hooks/useBookList';
import { FilterState } from '../entities/BookType';
import useUpdateBookInfo from '../hooks/useUpdateBookInfo';

const BookInfoTable: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ pageSize: 10 });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    books,
    isLoading,
    isError,
    error,
  } = useBookList(filters);

  const { mutate: updateBook, isSuccess } = useUpdateBookInfo();

  const handleEditClick = (book: any) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedBook((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    updateBook(selectedBook);
    handleDialogClose();
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setOpenSnackbar(true);
    }
  }, [isSuccess]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading data: {error?.message || 'Unknown error'}</Typography>;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Class Number</TableCell>
              <TableCell>Book Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>SubTitle</TableCell>
              <TableCell>Edition Statement</TableCell>
              <TableCell>Number of Pages</TableCell>
              <TableCell>Publication Year</TableCell>
              <TableCell>Series Statement</TableCell>
              <TableCell>Publisher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.bookInfoId}>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(book)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>{book.classNumber}</TableCell>
                <TableCell>{book.bookNumber}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.subTitle}</TableCell>
                <TableCell>{book.editionStatement}</TableCell>
                <TableCell>{book.numberOfPages}</TableCell>
                <TableCell>{book.publicationYear}</TableCell>
                <TableCell>{book.seriesStatement}</TableCell>
                <TableCell>{book.publisher.publisherName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          {selectedBook && (
            <>
              <TextField
                margin="dense"
                label="Book ID"
                name="bookInfoId"
                value={selectedBook.bookInfoId}
                disabled
                fullWidth
              />
              <TextField
                margin="dense"
                label="Class Number"
                name="classNumber"
                value={selectedBook.classNumber}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Book Number"
                name="bookNumber"
                value={selectedBook.bookNumber}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Title"
                name="title"
                value={selectedBook.title}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Edition Statement"
                name="editionStatement"
                value={selectedBook.editionStatement}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Number of Pages"
                name="numberOfPages"
                value={selectedBook.numberOfPages}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Publication Year"
                name="publicationYear"
                value={selectedBook.publicationYear}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Series Statement"
                name="seriesStatement"
                value={selectedBook.seriesStatement}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Publisher"
                name="publisher"
                value={selectedBook.publisher.publisherName}
                onChange={handleInputChange}
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Book updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookInfoTable;