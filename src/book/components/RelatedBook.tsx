import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Box,
  LinearProgress,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RelatedBook } from '../entities/BookType';
import { RES_URL } from '../../entities/constants';

interface RelatedBooksListProps {
  books: RelatedBook[];
  isLoading: boolean;
}

export const RelatedBooksList: React.FC<RelatedBooksListProps> = ({ books, isLoading }) => {
  const navigate = useNavigate();
  
  const handleBookClick = (bookInfoId: string) => {
    navigate(`/books/${bookInfoId}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Related Books
          </Typography>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }

  if (books.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Related Books
          </Typography>
          <Typography variant="body2" color="textSecondary">
            No related books found.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Related Books
        </Typography>
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.bookInfoId}>
              <CardActionArea onClick={() => handleBookClick(book.bookInfoId)}>
                <Paper elevation={2} sx={{ height: '100%' }}>
                  {book.coverPhoto ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${RES_URL}${book.coverPhoto}`}
                      alt={book.title}
                    />
                  ) : (
                    <Box sx={{ height: 140, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" align="center" sx={{ p: 2 }}>No Cover</Typography>
                    </Box>
                  )}
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" noWrap>{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {book.authors.join(', ')} • {book.publicationYear}
                    </Typography>
                  </Box>
                </Paper>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};