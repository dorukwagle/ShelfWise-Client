import { Button, Card, CardActions, CardContent, Container, Typography, Grid, Box } from "@mui/material";
import useMe from "../hooks/useMe";
import LoadingProgress from "../components/LoadingProgress";
import { useNavigate } from "react-router-dom";
import TagsInput from "../components/TagInputs";
import { useState, useEffect } from "react";
import { useBookList } from "../book/hooks/useBookList";
import { BookCover } from "../book/components/BookCover";
import { FilterState } from "../book/entities/BookType";

const HomePage = () => {
  const { data: user, isLoading: isLoadingUser } = useMe();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({ pageSize: 6 }); // Show 6 books on home page
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key

  const {
    books,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
    error: booksError,
    refetch
  } = useBookList(filters);

  // Listen for storage events and force refresh
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage event detected, refreshing books...');
      setRefreshKey(prev => prev + 1); // Force re-render
      refetch(); // Force refetch
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refetch]);

  // Force refetch when refreshKey changes
  useEffect(() => {
    refetch();
  }, [refreshKey, refetch]);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    console.log("Updated Tags:", newTags);
  };

  const Actions = () => (
    <>
      <Button size="small" variant="contained" onClick={() => navigate("/registration")}>
        Get Started
      </Button>
      <Button size="small" variant="contained" onClick={() => navigate("/sign-in")}>
        Sign In
      </Button>
    </>
  );

  if (isLoadingUser) return <LoadingProgress />;

  return (
    <Container>
      {/* Main Welcome Card */}
      <Card sx={{ minWidth: 100, maxWidth: 700, mt: 5, p: 2 }}>
        <CardContent>
          <Typography variant="h5">Welcome to ShelfWise</Typography>
        </CardContent>
        <CardActions>{!user?.userId && <Actions />}</CardActions>
      </Card>

      {/* Tags Input Card */}
      <Card sx={{ minWidth: 100, maxWidth: 700, mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">Enter Tags</Typography>
          <TagsInput
            placeholder="Enter tags..."
            value={tags}
            onChange={handleTagsChange}
          />
        </CardContent>
      </Card>

      {/* Featured Books Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Books
        </Typography>
        {isLoadingBooks ? (
          <LoadingProgress />
        ) : isErrorBooks ? (
          <Typography color="error">
            Error loading books: {booksError?.message || 'Unknown error'}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={`${book.bookInfoId}-${refreshKey}`}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                  onClick={() => navigate(`/book/${book.bookInfoId}`)}
                >
                  <Box sx={{ height: 300, p: 1 }}>
                    <BookCover bookInfo={book} />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.subTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {book.publisher.publisherName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {tags.length > 0 && (
        <Card sx={{ minWidth: 100, maxWidth: 700, mt: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">Your Tags</Typography>
            <div>
              {tags.map((tag, index) => (
                <Typography key={index} variant="body1">
                  {tag}
                </Typography>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default HomePage;
