import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
  Chip,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useBookList } from '../hooks/useBookList';
import { FilterState, BookInfo } from '../entities/BookType';
import TagsInput from '../../components/TagInputs';
import useGenres from '../../attributes/hooks/useGenres';
import useAuthors from '../../attributes/hooks/useAuthors';
import useUpdateGenres from '../hooks/useUpdateGenres';
import useUpdateAuthors from '../hooks/useUpdateAuthors';
import useUpdateISBNs from '../hooks/useUpdateISBNs';

const BookClassificationTable: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ pageSize: 10 });
  const { books } = useBookList(filters);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { data: genresData, isLoading: genresLoading } = useGenres({});
  const { data: authorsData, isLoading: authorsLoading } = useAuthors({ page: 1, pageSize: 15 });

  const genres = genresData?.data || [];
  const authors = authorsData?.data || [];

  const { mutate: updateGenres, isSuccess: isGenresUpdated } = useUpdateGenres();
  const { mutate: updateAuthors, isSuccess: isAuthorsUpdated } = useUpdateAuthors();
  const { mutate: updateISBNs, isSuccess: isISBNsUpdated } = useUpdateISBNs();

  const handleEditClick = (book: BookInfo) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleFormChange = (data: any) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, ...data });
    }
  };

  const handleUpdate = () => {
    if (selectedBook) {
      updateGenres({ infoId: selectedBook.bookInfoId, genres: selectedBook.bookGenres.map((genre) => genre.genreId) });
      updateAuthors({ infoId: selectedBook.bookInfoId, authors: selectedBook.bookAuthors.map((authors)=> authors.authorId) });
      updateISBNs({ infoId: selectedBook.bookInfoId, isbns: selectedBook.isbns.map((isbn) => isbn.isbn) });
    }
    handleDialogClose();
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (isGenresUpdated || isAuthorsUpdated || isISBNsUpdated) {
      setOpenSnackbar(true);
    }
  }, [isGenresUpdated, isAuthorsUpdated, isISBNsUpdated]);

  if (genresLoading || authorsLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Author</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Genre</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>ISBNs</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.bookInfoId}>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  {book.bookAuthors.map((author) => author.author.fullName).join(', ')}
                </TableCell>
                <TableCell>
                  {book.bookGenres.map((genre) => genre.genre.genre).join(', ')}
                </TableCell>
                <TableCell>
                  {book.isbns.map((isbn) => isbn.isbn).join(', ')}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(book)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      {selectedBook && (
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                margin="dense"
                label="Book ID"
                name="bookInfoId"
                value={selectedBook.bookInfoId}
                disabled
                fullWidth
              />
              <Autocomplete
                multiple
                options={genres}
                getOptionLabel={(option) => option.genre}
                value={selectedBook.bookGenres.map((genre) => genre.genre)}
                onChange={(event, newValue) => {
                  const updatedGenres = newValue.map((genre) => ({
                    genreId: genre.genreId,
                    genre,
                  }));
                  handleFormChange({ bookGenres: updatedGenres });
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.genre} {...getTagProps({ index })} key={option.genreId} />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Genres" variant="outlined" />}
              />
              <Autocomplete
                multiple
                options={authors}
                getOptionLabel={(option) => option.fullName}
                value={selectedBook.bookAuthors.map((author) => author.author)}
                onChange={(event, newValue) => {
                  const updatedAuthors = newValue.map((author) => ({
                    authorId: author.authorId,
                    author,
                  }));
                  handleFormChange({ bookAuthors: updatedAuthors });
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.fullName} {...getTagProps({ index })} key={option.authorId} />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Authors" variant="outlined" />}
              />
              <TagsInput
                placeholder="Enter ISBNs..."
                value={selectedBook.isbns.map((isbn) => isbn.isbn)}
                onChange={(newIsbns) => {
                  const updatedIsbns = newIsbns.map((isbn) => ({ isbn }));
                  handleFormChange({ isbns: updatedIsbns });
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Book updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookClassificationTable;