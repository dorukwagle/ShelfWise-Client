import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useApproveEnrollment from '../hooks/useApproveEnrollment';
import ApproveEnrollmentDialog from '../components/ApproveEnrollmentDialog';

interface Enrollment {
    userId: string;
    accountStatus: string;
}

interface EnrollmentPageProps {
    enrollments: Enrollment[];
}

const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ enrollments }) => {
    const {
        open,
        handleOpen,
        handleClose,
        handleSubmit,
        loading,
        error,
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

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Account Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {enrollments.map((enrollment) => (
                            <TableRow key={enrollment.userId}>
                                <TableCell>{enrollment.userId}</TableCell>
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
                error={error}
            />
        </div>
    );
};

export default EnrollmentPage;