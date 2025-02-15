import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  CircularProgress,
  Container,
  Alert,
  Skeleton
} from '@mui/material';
import { FilterState } from '../entities/BookType';
import { useBooks } from '../hooks/useBook';
import { BookFilters } from './BookFIlters';

const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {[...Array(6)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="60%" />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const BookList = () => {
  const [filters, setFilters] = useState<FilterState>({
    pageSize: 10
  });

  const {
    books,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    totalItems,
    isRefetching
  } = useBooks(filters);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box py={4}>
          <BookFilters filters={filters} onFilterChange={setFilters} />
          <Box mt={3}>
            <LoadingSkeleton />
          </Box>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Box py={4}>
          <BookFilters filters={filters} onFilterChange={setFilters} />
          <Box mt={3}>
            <Alert severity="error">
              Error: {error?.message || 'Failed to load books'}
            </Alert>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <BookFilters filters={filters} onFilterChange={setFilters} />
        
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {totalItems > 0 ? `Found ${totalItems} books` : 'No books found'}
          </Typography>
          {isRefetching && (
            <CircularProgress size={20} />
          )}
        </Box>

        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  {book.subTitle && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {book.subTitle}
                    </Typography>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Authors: {book.bookAuthors.map(ba => ba.author.name).join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      Genres: {book.bookGenres.map(bg => bg.genre.name).join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      Publisher: {book.publisher.name}
                    </Typography>
                    <Typography variant="body2">
                      Score: {book.score}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {hasNextPage && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Loading more...
                </Box>
              ) : (
                'Load More'
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BookList;