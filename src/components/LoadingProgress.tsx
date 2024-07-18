import { CircularProgress, Container } from "@mui/material";

const LoadingProgress = () => {
  return (
    <Container>
      <CircularProgress variant="indeterminate" />
    </Container>
  );
}

export default LoadingProgress;