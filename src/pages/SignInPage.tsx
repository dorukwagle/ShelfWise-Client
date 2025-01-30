import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";

const SignInPage = () => {
  const navigate = useNavigate();
  const { mutate: login, isError, error } = useLogin(() => {
    navigate("/dashboard");
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{width: 450, p: 4, boxShadow: 5, borderRadius: 4}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Welcome Back!
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { mb: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("email", { required: true })}
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...register("password", { required: true })}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            {isError && (
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                mb={2}
              >
                {error.response && error.response.data.error}
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 1, p: 1.5, fontSize: "1rem" }}
            >
              Sign In
            </Button>
          </Box>
          <Stack direction="column" spacing={1} mt={2} alignItems="center">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/registration" style={{ textDecoration: "none", color: "#1976d2" }}>
                Register
              </Link>
            </Typography>
            <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
              <Typography variant="body2">Forgot Password?</Typography>
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignInPage;
