import { Button, Card, CardActions, CardContent, Container, Typography, Box } from "@mui/material";
import useMe from "../hooks/useMe";
import LoadingProgress from "../components/LoadingProgress";
import { useNavigate } from "react-router-dom";
import TagsInput from "../components/TagInputs"; // Import TagsInput
import { useState } from "react";
import { FilterState } from "../entities/BookType";

const HomePage = () => {
  const { data: user, isLoading } = useMe();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);

  const initialFilter: FilterState = {
    page: 1,
    pageSize: 10,
    seed: '',
    genre: '',
    author: '',
    publisher: '',
    sort: undefined,
  };

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

  if (isLoading) return <LoadingProgress />;

  return (
    <Container>
      {/* Main Welcome Card */}
      <Card sx={{ minWidth: 100, maxWidth: 700, mt: 5, p: 2 }}>
        <CardContent>
          <Typography variant="h5">Welcome to ShelfWise</Typography>
        </CardContent>
        <CardActions>{!user?.userId && <Actions />}</CardActions>
      </Card>

      {/* Tags Input Card (Separate Container) */}
      <Card sx={{ minWidth: 100, maxWidth: 700, mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">Enter Tags</Typography>
          <TagsInput placeholder="Enter tags..." onChange={handleTagsChange} />
        </CardContent>
      </Card>

    </Container>
  );
};

export default HomePage;
