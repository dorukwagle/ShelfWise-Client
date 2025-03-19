import { Box, Container, Typography } from "@mui/material";
import BookList from "../book/components/BookList";

const DashboardBranch = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your library's book collection
        </Typography>
      </Box>
      <BookList />
    </Container>
  );
};

export default DashboardBranch;