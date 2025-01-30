import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import useDetailedUserRoles from "../hooks/useDetailedUserRoles";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { data: detailedRoles } = useDetailedUserRoles();

  const { mutate: login, isError, error } = useLogin(() => {
    navigate("/");
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Container
      sx={{
        height: "100vh",
        backgroundImage: "url('your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 600,
          p: 4,
          boxShadow: 5,
          borderRadius: 3,
        }}
      >
        <CardContent>
          {/* Logo */}
          <Box component="img" src="your-logo.png" alt="Logo" sx={{ width: 80, mb: 2, mx: "auto", display: "block" }} />

          {/* Title */}
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
            Create Your Account
          </Typography>

          {/* Registration Form */}
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Full Name & DOB */}
              <Grid item xs={12} sm={6}>
                <TextField {...register("name", { required: true })} label="Full Name" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...register("dob", { required: true })} label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} variant="outlined" />
              </Grid>

              {/* Address & Contact Number */}
              <Grid item xs={12} sm={6}>
                <TextField {...register("address", { required: true })} label="Address" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...register("contactNo", { required: true })} label="Contact Number" fullWidth variant="outlined" />
              </Grid>

              {/* Enrollment Year & Gender */}
              <Grid item xs={12} sm={6}>
                <TextField {...register("enrollmentYear", { required: true })} label="Enrollment Year" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Gender</InputLabel>
                  <Select {...register("gender")} label="Gender">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Preferred Role & Roll Number */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Preferred Role</InputLabel>
                  <Select {...register("roleId")} label="Preferred Role">
                    {detailedRoles?.map(({ roleId, role }) => (
                      <MenuItem key={roleId} value={roleId}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...register("rollNumber", { required: true })} label="Roll Number" fullWidth variant="outlined" />
              </Grid>

              {/* Email & Password */}
              <Grid item xs={12} sm={6}>
                <TextField {...register("email", { required: true })} label="Email" type="email" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField {...register("password", { required: true })} label="Password" type="password" fullWidth variant="outlined" />
              </Grid>
            </Grid>

            {/* Error Handling */}
            {isError && (
              <Typography variant="body1" color="red" textAlign="center" mt={2}>
                {error.response?.data.error}
              </Typography>
            )}

            {/* Register Button */}
            <Stack direction="row" justifyContent="center" mt={3}>
              <Button variant="contained" type="submit" size="large">
                Register
              </Button>
            </Stack>

            {/* Sign In Option */}
            <Typography variant="body2" textAlign="center" mt={3}>
              Already have an account?{" "}
              <Link to="/sign-in" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistrationPage;
