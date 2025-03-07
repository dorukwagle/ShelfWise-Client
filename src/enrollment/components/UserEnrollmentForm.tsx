import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, CircularProgress } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useDetailedUserRoles from "../../hooks/useDetailedUserRoles";
import useEnrollUser from "../hooks/useEnrollUser";
import Enrollment from "../entities/enrollements";

const EnrollmentRequestForm = () => {
    const [formData, setFormData] = useState<{
        fullName: string;
        dob: string | null; // Updated type to string | null
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
        dob: null, // Use null for date initially
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
    // const { data: membershipTypes, isLoading: memberTypesLoading } = useDetailedMembershipTypes();
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

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name as string]: value }));
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setFormData(prev => ({ ...prev, dob: date ? date.format("YYYY-MM-DD") : null })); // Ensure dob is either null or string
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        enrollUser.mutate(formData as Enrollment);
    };

    if (rolesLoading) return <CircularProgress />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>Enrollment Request</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required />
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
                        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Contact No." name="contactNo" value={formData.contactNo} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Enrollment Year" name="enrollmentYear" value={formData.enrollmentYear} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Gender</InputLabel>
                            <Select name="gender" value={formData.gender} onChange={handleChange as any} label="Gender">
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="College ID" name="collegeId" value={formData.collegeId} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="University ID" name="universityId" value={formData.universityId} onChange={handleChange} fullWidth required />
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
        </Box>
    );
};

export default EnrollmentRequestForm;
