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
    Button,
} from '@mui/material';
import useEnrollments from '../hooks/useEnrollments';
import Enrollment from '../entities/enrollements';
import EnrollmentDialog from '../components/ApproveEnrollmentDialog';

const INITIAL_PAGE_SIZE = 10;

const EnrollmentApprovePage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(INITIAL_PAGE_SIZE);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
    const [approveDialogOpen, setApproveDialogOpen] = useState(false);

    const {
        data,
        error,
        isLoading,
    } = useEnrollments({ page, pageSize });

    const enrollments = data?.data || [];
    const totalPages = Math.ceil((data?.info.itemsCount || 0) / pageSize);

    const handleOpenApproveDialog = (enrollment: Enrollment) => {
        setSelectedEnrollment(enrollment);
        setApproveDialogOpen(true);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const renderEnrollmentTable = () => {
        if (isLoading) return <CircularProgress />;

        if (error) return (
            <Alert severity="error" sx={{ mb: 2 }}>
                Error loading enrollments: {error.message}
            </Alert>
        );

        if (!enrollments.length) return (
            <Alert severity="info">No enrollments found.</Alert>
        );

        return (
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {[
                                    'Full Name', 'Email', 'College ID',
                                    'Contact Number', 'Enrollment Year',
                                    'University ID', 'Actions'
                                ].map(header => (
                                    <TableCell key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollments.map((enrollment) => (
                                <TableRow key={enrollment.email}>
                                    <TableCell>{enrollment.fullName}</TableCell>
                                    <TableCell>{enrollment.email}</TableCell>
                                    <TableCell>{enrollment.collegeId}</TableCell>
                                    <TableCell>{enrollment.contactNo}</TableCell>
                                    <TableCell>{enrollment.enrollmentYear}</TableCell>
                                    <TableCell>{enrollment.universityId}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleOpenApproveDialog(enrollment)}
                                            >
                                                Approve
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}
            </>
        );
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Request List
            </Typography>

            {renderEnrollmentTable()}

            {selectedEnrollment && (
                <EnrollmentDialog
                    open={approveDialogOpen}
                    onClose={() => setApproveDialogOpen(false)}
                    enrollment={selectedEnrollment}
                />)}
        </Box>
    );
};

export default EnrollmentApprovePage;