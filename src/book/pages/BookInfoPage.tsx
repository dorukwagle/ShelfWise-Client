import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Breadcrumbs,
  Link,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useBookInfo } from '../hooks/useBookInfo';
import { Home, NavigateNext } from '@mui/icons-material';
// import { useRelatedBooks } from '../hooks/useRelatedBook';
import { BookCover } from '../components/BookCover';
import { BookActions } from '../components/BookAction';
import { BookDetailsCard } from '../components/BookDetailCard';
// import { RelatedBooksList } from '../components/RelatedBook';

export const BookInfoPage: React.FC = () => {
  // In a real app, you would get this from your auth context
  const userId = "user123"; 
  
  const { bookInfoId } = useParams<{ bookInfoId: string }>();
  const { data: bookInfo, isLoading: bookInfoLoading, error: bookInfoError } = useBookInfo(bookInfoId || '');
  console.log(bookInfo);
  
//   const { data: relatedBooks, isLoading: relatedBooksLoading } = useRelatedBooks(bookInfoId || '');

  if (bookInfoLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (bookInfoError || !bookInfo) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {bookInfoError?.message || "Failed to load book information"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link
          color="inherit"
          component={RouterLink}
          to="/dashboard"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">{bookInfo.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Book Cover */}
        <Grid item xs={12} md={4}>
          <Box mb={3}>
            <BookCover bookInfo={bookInfo} />
          </Box>
          
          {/* Book Actions */}
          <BookActions bookInfo={bookInfo} userId={userId} />
        </Grid>

        {/* Book Details */}
        <Grid item xs={12} md={8}>
          <BookDetailsCard bookInfo={bookInfo} />
        </Grid>

        {/* Related Books */}
        {/* <Grid item xs={12} sx={{ mt: 4 }}>
          <RelatedBooksList books={relatedBooks} isLoading={relatedBooksLoading} />
        </Grid> */}
      </Grid>
    </Container>
  );
};