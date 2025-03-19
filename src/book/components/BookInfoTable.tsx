import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import { Edit, Update, Delete } from '@mui/icons-material';
import { useBookList } from '../hooks/useBookList';
import { FilterState } from '../entities/BookType';
import useUpdateBookInfo from '../hooks/useUpdateBookInfo';
import useUpdateCoverPhoto from '../hooks/useUpdateCoverPhoto';
import useDeleteBook from '../hooks/useDeleteBook';

const BookInfoTable: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ pageSize: 10 });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  
  const { mutate: updateCoverPhoto, isPending: isUpdatingCover } = useUpdateCoverPhoto(
    () => {
      setSnackbarMessage('Cover photo updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleUpdateDialogClose();
    }
  );

  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook(
    () => {
      setSnackbarMessage('Book deleted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleDeleteDialogClose();
    }
  );

  const {
    books,
    isLoading,
    isError, 
    error,
  } = useBookList(filters);

  const { mutate: updateBook, isSuccess } = useUpdateBookInfo();

  const handleEditClick = (book: any) => {
    setSelectedBook(book);
    setOpenEditDialog(true);
  };

  const handleUpdateClick = (book: any) => {
    setSelectedBook(book);
    setOpenUpdateDialog(true);
  };

  const handleDeleteClick = (book: any) => {
    setSelectedBook(book);
    setOpenDeleteDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedBook(null);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setSelectedBook(null);
    setCoverPhoto(null);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedBook(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedBook((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    updateBook(selectedBook);
    handleEditDialogClose();
  };

  const handleUpload = async () => {
    if (!coverPhoto || !selectedBook) {
      setSnackbarMessage('Please select a cover photo to upload.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (coverPhoto.size > maxSize) {
      setSnackbarMessage('File size must be less than 5MB.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Validate file type
    if (!coverPhoto.type.startsWith('image/')) {
      setSnackbarMessage('Please select an image file.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('coverPhoto', coverPhoto);
      
      updateCoverPhoto({
        infoId: selectedBook.bookInfoId,
        data: formData
      }, {
        onError: (error) => {
          console.error('Upload error:', error);
          setSnackbarMessage(error.message || 'Failed to update cover photo. Please try again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      setSnackbarMessage('Failed to update cover photo. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleDelete = () => {
    if (!selectedBook) return;
    
    try {
      console.log('Attempting to delete book:', selectedBook.bookInfoId);
      deleteBook(selectedBook.bookInfoId, {
        onError: (error) => {
          console.error('Delete error:', error);
          setSnackbarMessage(error.message || 'Failed to delete book. Please try again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      });
    } catch (error) {
      console.error('Delete error:', error);
      setSnackbarMessage('Failed to delete book. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenSnackbar(true);
    }
  }, [isSuccess]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading data: {error?.message || 'Unknown error'}</Typography>;

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>SubTitle</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Edition Statement</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Book Number</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Number of Pages</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Publication Year</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Series Statement</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Publisher</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Class Number</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.bookInfoId}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.subTitle}</TableCell>
              <TableCell>{book.editionStatement}</TableCell>
              <TableCell>{book.bookNumber}</TableCell>
              <TableCell>{book.numberOfPages}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell>{book.seriesStatement}</TableCell>
              <TableCell>{book.publisher.publisherName}</TableCell>
              <TableCell>{book.classNumber}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton onClick={() => handleEditClick(book)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleUpdateClick(book)} color="primary">
                    <Update />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteClick(book)} 
                    color="error"
                    sx={{ 
                      '&:hover': {
                        backgroundColor: 'error.light',
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
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
                label="Sub Title"
                name="subTitle"
                value={selectedBook.subTitle}
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
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle>Upload Cover Photo</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Book: {selectedBook?.title}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                style={{ display: 'none' }}
                id="cover-photo-input"
              />
              <label htmlFor="cover-photo-input">
                <Button
                  variant="outlined"
                  component="span"
                  disabled={isUpdatingCover}
                >
                  Choose File
                </Button>
              </label>
            </Box>
            {coverPhoto && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected file: {coverPhoto.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Size: {(coverPhoto.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Type: {coverPhoto.type}
                </Typography>
              </Box>
            )}
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>
              Maximum file size: 5MB
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              Supported formats: JPG, PNG, GIF
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} disabled={isUpdatingCover}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            color="primary" 
            disabled={!coverPhoto || isUpdatingCover}
            variant="contained"
          >
            {isUpdatingCover ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Are you sure you want to delete this book?
            </Typography>
            <Typography variant="body2" color="error">
              Book Title: {selectedBook?.title}
            </Typography>
            <Typography variant="body2" color="error">
              Book ID: {selectedBook?.bookInfoId}
            </Typography>
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              This action cannot be undone. All copies of this book will be deleted.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            disabled={isDeleting}
            variant="contained"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookInfoTable;