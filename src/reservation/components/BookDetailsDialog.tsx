import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Button, 
  Chip, 
  Divider 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Reservation } from '../entities/reservations';

interface BookDetailsDialogProps {
  open: boolean;
  selectedBook: Reservation | null;
  onClose: () => void;
  onAssign: () => void;
  isStaff: boolean;
}

const BookDetailsDialog: React.FC<BookDetailsDialogProps> = ({
  open,
  selectedBook,
  onClose,
  onAssign,
  isStaff
}) => {
  if (!selectedBook) return null;
  
  const { bookInfo, book } = selectedBook;
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">Book Details</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 2, flex: 1 }}>
            {bookInfo && bookInfo.coverPhoto ? (
              <img 
                src={`/api/images/${bookInfo.coverPhoto}`} 
                alt={bookInfo.title}
                style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }}
              />
            ) : (
              <Paper 
                sx={{ 
                  height: 200, 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: 'grey.200'
                }}
              >
                <MenuBookIcon sx={{ fontSize: 80, color: 'grey.400' }} />
              </Paper>
            )}
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip 
                label={book?.status || 'Unknown'} 
                color={book?.status === 'Available' ? 'success' : 'error'} 
                size="small"
                sx={{ mt: 1 }}
              />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Barcode</Typography>
              <Typography variant="body1">{book?.barcode || 'N/A'}</Typography>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" gutterBottom>{bookInfo?.title || 'Untitled'}</Typography>
            {bookInfo?.subTitle && (
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {bookInfo.subTitle}
              </Typography>
            )}
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Authors</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {bookInfo?.bookAuthors && bookInfo.bookAuthors.map((bookAuthor) => (
                  <Chip 
                    key={bookAuthor.authorId} 
                    label={`${bookAuthor.author.title} ${bookAuthor.author.fullName}`} 
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Genres</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {bookInfo?.bookGenres && bookInfo.bookGenres.map((bookGenre) => (
                  <Chip 
                    key={bookGenre.genreId} 
                    label={bookGenre.genre.genre} 
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Edition</Typography>
                <Typography variant="body2">{bookInfo?.editionStatement || 'N/A'}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Publication Year</Typography>
                <Typography variant="body2">{bookInfo?.publicationYear || 'N/A'}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Pages</Typography>
                <Typography variant="body2">{bookInfo?.numberOfPages || 'N/A'}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Series</Typography>
                <Typography variant="body2">{bookInfo?.seriesStatement || 'N/A'}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Class Number</Typography>
                <Typography variant="body2">{bookInfo?.classNumber || 'N/A'}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Book Number</Typography>
                <Typography variant="body2">{bookInfo?.bookNumber || 'N/A'}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* Only show Assign Book button if reservation is Pending, book is Available, and user is staff */}
        {isStaff && selectedBook.status === 'Pending' && book?.status === 'Pending' && (
          <Button 
            onClick={onAssign} 
            color="success" 
            variant="contained"
            startIcon={<LibraryBooksIcon />}
          >
            Assign Book
          </Button>
        )}
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDetailsDialog;