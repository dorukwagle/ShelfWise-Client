import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Container,
  Alert,
  Skeleton,
  CardMedia
} from '@mui/material';
import { FilterState } from '../entities/BookType';
import { useBookList } from '../hooks/useBookList';
import { BookFilters } from './BookFIlters';
import { RES_URL } from '../../entities/constants';
import { useNavigate } from 'react-router-dom';

interface BookListProps {
  onBookClick?: (id: string) => void;
}

const LoadingSkeleton = () => (
  <Box display="flex" flexWrap="wrap" gap={3}>
    {[...Array(6)].map((_, index) => (
      <Box key={index} width={{ xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(25% - 24px)' }}>
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
      </Box>
    ))}
  </Box>
);

const BookList = ({onBookClick}: BookListProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    pageSize: 10,
    seed: "",
    genreSeed: "",
    authorSeed: "",
  });

  const {
    books,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching
  } = useBookList(filters);
console.log(books);

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

  const handleBookClick = (bookInfoId: string) => {
    onBookClick && onBookClick(bookInfoId);
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <BookFilters filters={filters} onFilterChange={setFilters} />

        <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {books.length > 0 ? `Found ${books.length} books` : 'No books found'}
          </Typography>
          {isRefetching && (
            <CircularProgress size={20} />
          )}
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3}>
          {books.map((book) => (
            <Box key={book.bookInfoId} width={{ xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(25% - 24px)' }}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
                  backdropFilter: 'blur(5px)', // Glass effect
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  },
                  cursor: 'pointer'
                }}
                onClick={() => handleBookClick(book.bookInfoId)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    backgroundColor: 'rgba(245, 245, 245, 0.5)', // Semi-transparent fallback
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  image={`${RES_URL}${book.coverPhoto}`}
                  alt={book.title}
                />
                <CardContent 
                  sx={{ 
                    flexGrow: 1,
                    color: 'text.primary', // Ensure text is readable
                    backgroundColor: 'transparent',
                    padding: '8px' // Reduce padding to shorten the height of book details
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.2,
                      minHeight: '2.5rem', // Reduce minHeight to shorten the height of book details
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {book.title}
                  </Typography>
                  {book.subTitle && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{
                        fontStyle: 'italic',
                        mb: 1, // Reduce margin bottom to shorten the height of book details
                        opacity: 0.9
                      }}
                    >
                      {book.subTitle}
                    </Typography>
                  )}
                  <Box sx={{ mt: 1 }}>
                    {book.bookGenres.length > 1 ? (
                      <Typography 
                        variant="body2"
                        sx={{ mb: 0.5, opacity: 0.95 }}
                      >
                        <strong>Genres:</strong> {book.bookGenres.map((genre) => genre.genre.genre).join(', ')}
                      </Typography>
                    ) : (
                      <Typography 
                        variant="body2"
                        sx={{ mb: 0.5, opacity: 0.95 }}
                      >
                        <strong>Genre:</strong> {book.bookGenres[0].genre.genre}
                      </Typography>
                    )}
                    <Typography 
                      variant="body2"
                      sx={{ opacity: 0.95 }}
                    >
                      <strong>Score:</strong> 98
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {hasNextPage && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              sx={{
                borderRadius: 20,
                px: 4,
                py: 1,
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
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