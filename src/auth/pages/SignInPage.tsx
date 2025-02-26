import { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../../auth/hooks/useLogin";
import FlipCard from "../../components/FlipCard";
import { ColorModeContext } from "../../ThemedApp";

const SignInPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');
  const navigate = useNavigate();
  const { mutate: login, isError, error } = useLogin(() => {
    navigate("/dashboard");
  });

  const { register, handleSubmit } = useForm();
  const { mode } = useContext(ColorModeContext);

  const onSubmit = (data: any) => {
    login(data);
  };

  const handleRegisterClick = () => {
    setFlipDirection('right');
    setIsFlipped(true);
    setTimeout(() => {
      navigate("/registration");
    }, 400);
  };

  const backgroundImage = mode === 'dark' ? 'url(src/assets/backgrounimgdark.jpg)' : 'url(src/assets/backroundimglight.jpeg)';

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--mui-background-default)",
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <FlipCard
        front={
          <Card
            sx={{
              width: 450,
              p: 4,
              boxShadow: 5,
              borderRadius: 4,
              bgcolor: 'background.paper',
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                Welcome Back!
              </Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { mb: 2, width: '100%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  {...register('email', { required: true })}
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  {...register('password', { required: true })}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                {isError && (
                  <Typography variant="body2" color="error" textAlign="center" mb={2}>
                    {error.response && error.response.data.error}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ mt: 1, p: 1.5, fontSize: '1rem' }}
                >
                  Sign In
                </Button>
              </Box>
              <Stack direction="column" spacing={1} mt={2} alignItems="center">
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Button
                    variant="text"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </Button>
                </Typography>
                <Link to="/" style={{ textDecoration: 'none', color: 'primary.main' }}>
                  <Typography variant="body2">Forgot Password?</Typography>
                </Link>
              </Stack>
            </CardContent>
          </Card>
        }
        back={
          <Box
            sx={{
              width: 450,
              height: 300,
              bgcolor: "transparent",
            }}
          />
        }
        isFlipped={isFlipped}
        flipDirection={flipDirection}
      />
    </div>
  );
};

export default SignInPage;

