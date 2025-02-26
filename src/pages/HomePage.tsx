import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import useMe from "../hooks/useMe";
import LoadingProgress from "../components/LoadingProgress";
import { useNavigate } from "react-router-dom";
import TagsInput from "../components/TagInputs";
import { useState } from "react";
import BookList from "../book/components/BookList";

const HomePage = () => {
  const { data: user, isLoading } = useMe();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);

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

      Tags Input Card (Separate Container)
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

      {!user?.userId && <BookList />}
    </Container>
  );
};

export default HomePage;
