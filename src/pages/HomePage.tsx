import { useState } from 'react';
import { Container, Snackbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookList from "../book/components/BookList";
import useMe from '../hooks/useMe';

const HomePage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useMe();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBookClick = (bookInfoId: string) => {
    if (user?.userId) 
      return navigate(`/book/${bookInfoId}`);
    setOpenSnackbar(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Box>
        <BookList onBookClick={handleBookClick} />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="You must log in first to view the book details."
      />
    </Container>
  );
};

export default HomePage;