import { Button, Card, CardActions, CardContent, CircularProgress, Container, Typography } from "@mui/material";
import useMe from "../hooks/useMe";
import LoadingProgress from "../components/LoadingProgress";

const HomePage = () => {
  const {data: user, isLoading} = useMe();

  const Actions = () => {
    return (
      <>
        <Button size="small" variant="contained">
          Get Started
        </Button>
        <Button size="small" variant="contained">
          Sign In
        </Button>
      </>
    );
  }

  if (isLoading) return <LoadingProgress />

  return (
    <Container>
      <Card sx={{ minWidth: 100, maxWidth: 700, mt: 5 }}>
        <CardContent>
          <Typography>
            Welcome to ShelfWise
          </Typography>
        </CardContent>
        <CardActions>
          {!user?.userId  && <Actions />}
        </CardActions>
      </Card>
    </Container>
  );
}

export default HomePage