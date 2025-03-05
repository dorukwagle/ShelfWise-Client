import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    TextField, 
    Grid, 
    Avatar, 
    DialogActions, 
    Button, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Enrollment from '../entities/enrollements';
import { EnrollmentApproveData } from '../services/approveEnrollmentService';
import useApproveEnrollment from '../hooks/useApproveEnrollment';

interface EnrollmentDialogProps {
    open: boolean;
    onClose: () => void;
    enrollment: Enrollment;
}

const formatDateToYYYYMMDD = (date: Date | string | null): string => {
    if (!date) return '';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().split('T')[0];
};

const EnrollmentDialog: React.FC<EnrollmentDialogProps> = ({ 
    open, 
    onClose, 
    enrollment
}) => {
    const { control, handleSubmit, register, formState: { errors } } = useForm<EnrollmentApproveData>({
        defaultValues: {
            ...enrollment,
            dob: formatDateToYYYYMMDD(enrollment.dob),
            startDate: new Date(),
            expiryDate: new Date(),
        }
    });

    const approveEnrollment = useApproveEnrollment();

    const handleFormSubmit = (data: EnrollmentApproveData) => {
        const enrollmentData: EnrollmentApproveData = {
            ...enrollment,
            ...data,
            userId: enrollment.userId,
            fullName: data.fullName,
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : null,
            startDate: new Date(data.startDate),
            expiryDate: new Date(data.expiryDate),
        };

        approveEnrollment.mutate(enrollmentData, {
            onSuccess: () => {
                console.log('Enrollment approved successfully');
                onClose(); 
            },
            onError: (error) => {
                console.error('Error approving enrollment:', error);
            },
        });
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
        >
            <DialogTitle>Approve and Edit Enrollment</DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent>
                    {/* Profile Picture */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            marginBottom: 2 
                        }}>
                            <Avatar
                                alt={enrollment.fullName}
                                src={enrollment.profilePicUrl}
                                sx={{ width: 120, height: 120 }}
                            />
                        </Grid>

                        {/* Personal Information */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                {...register('fullName', { required: 'Full Name is required' })}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                {...register('contactNo', { 
                                    required: 'Contact Number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Contact number must be 10 digits"
                                    }
                                })}
                                error={!!errors.contactNo}
                                helperText={errors.contactNo?.message}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Roll Number"
                                {...register('rollNumber', { required: 'Roll Number is required' })}
                                error={!!errors.rollNumber}
                                helperText={errors.rollNumber?.message}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="College ID"
                                {...register('collegeId', { required: 'College ID is required' })}
                                error={!!errors.collegeId}
                                helperText={errors.collegeId?.message}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="University ID"
                                {...register('universityId', { required: 'University ID is required' })}
                                error={!!errors.universityId}
                                helperText={errors.universityId?.message}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                {...register('dob', { required: 'Date of Birth is required' })}
                                error={!!errors.dob}
                                helperText={errors.dob?.message}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                InputProps={{
                                    inputProps: { 
                                        max: formatDateToYYYYMMDD(new Date()) 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" error={!!errors.gender}>
                                <InputLabel>Gender</InputLabel>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: 'Gender is required' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Gender"
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.gender && <span style={{color: 'red', fontSize: '0.75rem'}}>{errors.gender.message}</span>}
                            </FormControl>
                        </Grid>

                        {/* Enrollment Information */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Enrollment Year"
                                {...register('enrollmentYear', { required: 'Enrollment Year is required' })}
                                error={!!errors.enrollmentYear}
                                helperText={errors.enrollmentYear?.message}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" error={!!errors.accountStatus}>
                                <InputLabel>Account Status</InputLabel>
                                <Controller
                                    name="accountStatus"
                                    control={control}
                                    rules={{ required: 'Account Status is required' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Account Status"
                                        >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Rejected">Rejected</MenuItem>
                                            <MenuItem value="InActive">InActive</MenuItem>
                                            <MenuItem value="Suspended">Suspended</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.accountStatus && <span style={{color: 'red', fontSize: '0.75rem'}}>{errors.accountStatus.message}</span>}
                            </FormControl>
                        </Grid>

                        {/* Membership Information */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Membership Start Date"
                                type="date"
                                {...register('startDate', { required: 'Start Date is required' })}
                                error={!!errors.startDate}
                                helperText={errors.startDate?.message}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                InputProps={{
                                    inputProps: { 
                                        min: formatDateToYYYYMMDD(new Date()) 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Membership Expiry Date"
                                type="date"
                                {...register('expiryDate', { 
                                    required: 'Expiry Date is required',
                                    validate: (value, formValues) => {
                                        const startDate = new Date(formValues.startDate);
                                        const expiryDate = new Date(value);
                                        return expiryDate > startDate || 'Expiry date must be after start date';
                                    }
                                })}
                                error={!!errors.expiryDate}
                                helperText={errors.expiryDate?.message}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                InputProps={{
                                    inputProps: { 
                                        min: formatDateToYYYYMMDD(new Date()) 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Membership Type ID"
                                {...register('membershipTypeId', { required: 'Membership Type ID is required' })}
                                error={!!errors.membershipTypeId}
                                helperText={errors.membershipTypeId?.message}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Address */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                {...register('address', { required: 'Address is required' })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                variant="outlined"
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained"
                        disabled={approveEnrollment.isPending}
                    >
                        {approveEnrollment.isPending ? <CircularProgress size={24} /> : 'Approve and Update'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EnrollmentDialog;