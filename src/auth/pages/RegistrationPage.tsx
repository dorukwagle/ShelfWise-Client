import { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ColorModeContext } from "../../ThemedApp";
import FlipCard from "../../components/FlipCard";
import useRegistration from "../../auth/hooks/useRegistration";
import useDetailedUserRoles from "../../hooks/useDetailedUserRoles";

const RegistrationPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('left');
  const navigate = useNavigate();
  const { data: detailedRoles } = useDetailedUserRoles();
  const { mutate: registration, isError, error } = useRegistration(() => {
    navigate("/sign-in");
  });

  const { register, handleSubmit } = useForm();
  const { mode } = useContext(ColorModeContext);

  const onSubmit = (data: any) => {
    registration(data);
  };

  const handleSignInClick = () => {
    setFlipDirection('left');
    setIsFlipped(true);
    setTimeout(() => {
      navigate("/sign-in");
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
      <Box sx={{ width: 700 }}>
        <FlipCard
          front={
            <Card
              sx={{
                p: 4,
                boxShadow: 5,
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                  Create Your Account
                </Typography>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField {...register("fullName", { required: true })} label="Full Name" fullWidth variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...register("dob", { required: true })} label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...register("address", { required: true })} label="Address" fullWidth variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...register("contactNo", { required: true })} label="Contact Number" fullWidth variant="outlined" />
                    </Grid>
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
                    <Grid item xs={12} sm={6}>
                      <TextField {...register("email", { required: true })} label="Email" type="email" fullWidth variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...register("password", { required: true })} label="Password" type="password" fullWidth variant="outlined" />
                    </Grid>
                  </Grid>
                  {isError && (
                    <Typography variant="body1" color="error" textAlign="center" mt={2}>
                      {error.response?.data.error}
                    </Typography>
                  )}
                  <Stack direction="row" justifyContent="center" mt={3}>
                    <Button variant="contained" type="submit" size="large">
                      Register
                    </Button>
                  </Stack>
                  <Typography variant="body2" textAlign="center" mt={3}>
                    Already have an account?{" "}
                    <Button variant="text" onClick={handleSignInClick}>
                      Sign In
                    </Button>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          }
          back={<div></div>}
          isFlipped={isFlipped}
          flipDirection={flipDirection}
        />
      </Box>
    </div>
  );
};

export default RegistrationPage;