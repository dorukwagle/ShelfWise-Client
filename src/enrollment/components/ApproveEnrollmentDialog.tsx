import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';

interface ApproveEnrollmentDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    loading: boolean;
    error: string | null;
}

const ApproveEnrollmentDialog: React.FC<ApproveEnrollmentDialogProps> = ({ open, onClose, onSubmit, loading, error }) => {
    const { register, handleSubmit } = useForm();

    const handleFormSubmit = (data: any) => {
        console.log(data);

        onSubmit(data);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Approve Enrollment</DialogTitle>
            <DialogContent>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField
                        {...register('accountStatus')}
                        label="Account Status"
                        fullWidth
                        required
                    />
                    <TextField
                        {...register('startDate')}
                        label="Membership Start Date"
                        type="date"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        {...register('expiryDate')}
                        label="Membership Expiry Date"
                        type="date"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        {...register('membershipTypeId')}
                        label="Membership Type ID"
                        fullWidth
                        required
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Approve'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ApproveEnrollmentDialog;