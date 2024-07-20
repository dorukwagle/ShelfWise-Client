import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import useDetailedUserRoles from "../hooks/useDetailedUserRoles";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {data: detailedRoles} = useDetailedUserRoles();
  
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
                {...register("fullName", { required: true })}
                label="Full Name"
                type="text"
              />
            </div>
            <div>
              <TextField
                {...register("dob", { required: true })}
                label="DOB"
                type="date"
              />
            </div>
            <div>
              <TextField
                {...register("address", { required: true })}
                label="Address"
                type="text"
              />
            </div>
            <div>
              <TextField
                {...register("contactNo", { required: true })}
                label="Contact Number"
                type="text"
              />
            </div>
            <div>
              <TextField
                {...register("enrollmentYear", { required: true })}
                label="Enrollment Year"
                type="text"
              />
            </div>
            <div>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="select-gender"
                label="Gender"
                {...register("gender")}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel id="role-label">Preferred Role</InputLabel>
              <Select {...register("roleId")} label="Preferred Role" labelId="role-label">
                {detailedRoles?.map(({ roleId, role }) => (
                  <MenuItem key={roleId} value={roleId}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <TextField
                {...register("rollNumber", { required: true })}
                label="Roll Number"
                type="text"
              />
            </div>
            <div>
              <TextField
                {...register("email", { required: true })}
                label="Email"
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
              <TextField
                {...register("confirm_password", { required: true })}
                label="Confirm Password"
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
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegistrationPage;
