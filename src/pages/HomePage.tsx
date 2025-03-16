// import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
// import useMe from "../hooks/useMe";
// import LoadingProgress from "../components/LoadingProgress";
// import { useNavigate } from "react-router-dom";


// const HomePage = () => {
//   const { data: user, isLoading } = useMe();
//   const navigate = useNavigate();
  

//   const Actions = () => (
//     <>
//       <Button size="small" variant="contained" onClick={() => navigate("/sign-in")}>
//         Sign In
//       </Button>
//     </>
//   );

//   if (isLoading) return <LoadingProgress />;

//   return (
//     <Container>
//       <CardContent>
//           <Typography variant="h5">Welcome to ShelfWise</Typography>
//       </CardContent>
//       <CardActions>{!user?.userId && <Actions />}</CardActions>

//     </Container>
//   );
// };

// export default HomePage;


import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, Typography, Snackbar, Box } from "@mui/material";
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