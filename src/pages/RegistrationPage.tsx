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
import useMe from "../hooks/useMe";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {data: user} = useMe();
  
  const {
    mutate: login,
    isError,
    error,
  } = useLogin(() => {
    navigate("/");
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <TextField
                {...register("email", { required: true })}
                label="Email Address"
                type="email"
              />
            </div>
            <div>
              <TextField
                {...register("password", { required: true })}
                label="Password"
                type="password"
              />
            </div>
            <div>
              {isError && (
                <Typography variant="body1" color="red">
                  {error.response && error.response.data.error}
                </Typography>
              )}
            </div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => navigate("/registration")}
              >
                Register
              </Button>
            </Stack>
            <div>
              <Link to="/">
                <Typography color="blue">Forgot Password</Typography>
              </Link>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistrationPage;
