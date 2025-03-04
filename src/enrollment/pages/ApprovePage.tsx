import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Pagination,
    CircularProgress,
    Alert,
    Button
} from '@mui/material';
import useEnrollments from '../hooks/useEnrollments';
import ApproveEnrollmentDialog from '../components/ApproveEnrollmentDialog';
import useApproveEnrollment from '../hooks/useApproveEnrollment';
import Enrollment from '../entities/enrollements';

const EnrollmentListPage: React.FC = () => {
    // Pagination state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch enrollments using the provided hook
    const { data: enrollments, isLoading, error } = useEnrollments(page, pageSize);

    const {
        open,
        handleOpen,
        handleClose,
        handleSubmit,
        loading,
        approveError,
    } = useApproveEnrollment();

    const handleApproveClick = (enrollment: Enrollment) => {
        handleOpen({
            userId: enrollment.userId,
            accountStatus: enrollment.accountStatus,
            startDate: new Date(),
            expiryDate: new Date(),
            membershipTypeId: '',
        });
    };

    // Handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Enrollment List
            </Typography>

            {isLoading && <CircularProgress />}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading enrollments: {error.message}
                </Alert>
            )}

            {enrollments && enrollments.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Roll Number</TableCell>
                                    <TableCell>Contact Number</TableCell>
                                    <TableCell>Enrollment Year</TableCell>
                                    <TableCell>Account Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {enrollments.map((enrollment) => (
                                    <TableRow key={enrollment.email}>
                                        <TableCell>{enrollment.fullName}</TableCell>
                                        <TableCell>{enrollment.email}</TableCell>
                                        <TableCell>{enrollment.rollNumber}</TableCell>
                                        <TableCell>{enrollment.contactNo}</TableCell>
                                        <TableCell>{enrollment.enrollmentYear}</TableCell>
                                        <TableCell>{enrollment.accountStatus}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleApproveClick(enrollment)}
                                            >
                                                Approve
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ApproveEnrollmentDialog
                        open={open}
                        onClose={handleClose}
                        onSubmit={handleSubmit}
                        loading={loading}
                        error={approveError}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={10}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            ) : !isLoading && (
                <Alert severity="info">No enrollments found.</Alert>
            )}
        </Box>
    );
};

export default EnrollmentListPage;