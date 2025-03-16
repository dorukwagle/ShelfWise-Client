import React, { useContext, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, CircularProgress, CardContent, Container, Card, IconButton, InputAdornment } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../ThemedApp";
import FlipCard from "../../components/FlipCard";
import useDetailedUserRoles from "../../hooks/useDetailedUserRoles";
import useEnrollUser from "../hooks/useEnrollUser";
import Enrollment from "../entities/enrollements";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const EnrollmentRequestForm = () => {
    const [formData, setFormData] = useState<{
        fullName: string;
        dob: string | null;
        address: string;
        contactNo: string;
        enrollmentYear: string;
        gender: string;
        collegeId: string;
        universityId: string;
        password: string;
        email: string;
        roleId: string;
    }>({
        fullName: "",
        dob: null,
        address: "",
        contactNo: "",
        enrollmentYear: "",
        gender: "",
        collegeId: "",
        universityId: "",
        password: "",
        email: "",
        roleId: "",
    });

    const { data: detailedRoles, isLoading: rolesLoading } = useDetailedUserRoles();
    const enrollUser = useEnrollUser(() => {
        alert("Enrollment request submitted successfully!");
        setFormData({
            fullName: "",
            dob: null,
            address: "",
            contactNo: "",
            enrollmentYear: "",
            gender: "",
            collegeId: "",
            universityId: "",
            password: "",
            email: "",
            roleId: "",
        });
    });

    const navigate = useNavigate();
    const { mode } = useContext(ColorModeContext);
    const [isFlipped, setIsFlipped] = useState(false);
    const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('left');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name as string]: value }));
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setFormData(prev => ({ ...prev, dob: date ? date.format("YYYY-MM-DD") : null }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        enrollUser.mutate(formData as Enrollment);
    };

    const handleSignInClick = () => {
        setFlipDirection('left');
        setIsFlipped(true);
        setTimeout(() => {
            navigate("/sign-in");
        }, 400);
    };

    if (rolesLoading) return <CircularProgress />;

    const backgroundImage = mode === 'dark' ? 'url(src/assets/backgrounimgdark.jpg)' : 'url(src/assets/backroundimglight.jpeg)';

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: backgroundImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box sx={{ width: 700 }}>
                <FlipCard
                    front={
                        <Card sx={{
                            p: 4,
                            boxShadow: 5,
                            borderRadius: 2,
                            bgcolor: "background.paper",
                        }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>Enrollment Request</Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Date of Birth"
                                                    value={formData.dob ? dayjs(formData.dob) : null}
                                                    onChange={handleDateChange}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Contact No." name="contactNo" value={formData.contactNo} onChange={handleChange} fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Enrollment Year" name="enrollmentYear" value={formData.enrollmentYear} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Gender</InputLabel>
                                                <Select name="gender" value={formData.gender} onChange={handleChange as any} label="Gender">
                                                    <MenuItem value="Male">Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Email"
                                             name="email"
                                             type="email" 
                                             value={formData.email} 
                                             onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                            }}
                                         />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="College ID" 
                                            name="collegeId" 
                                            value={formData.collegeId} 
                                            onChange={handleChange} fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="University ID" 
                                            name="universityId" 
                                            value={formData.universityId} 
                                            onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth required>
                                                <InputLabel>Preferred Role</InputLabel>
                                                <Select name="roleId" value={formData.roleId} onChange={handleChange as any} label="Preferred Role">
                                                    {detailedRoles?.map(({ roleId, role }) => (
                                                        <MenuItem key={roleId} value={roleId}>{role}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <Button variant="contained" type="submit" disabled={enrollUser.isPending}>
                                            {enrollUser.isPending ? <CircularProgress size={24} /> : "Submit Enrollment"}
                                        </Button>
                                    </Box>
                                </form>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button variant="outlined" onClick={handleSignInClick}>Sign In</Button>
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

export default EnrollmentRequestForm;