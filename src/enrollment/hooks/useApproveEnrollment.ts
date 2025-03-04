import { useState } from 'react';
import { approveEnrollment, EnrollmentData } from '../services/enrollmentService';
import { useForm } from 'react-hook-form';

const useApproveEnrollment = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { register, setValue, handleSubmit, reset } = useForm<EnrollmentData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [approveError, setError] = useState<string | null>(null);

    const handleOpen = (data: EnrollmentData) => {
        reset();
        setValue('userId', data.userId);
        setValue('accountStatus', data.accountStatus);
        setValue('startDate', data.startDate);
        setValue('expiryDate', data.expiryDate);
        setValue('membershipTypeId', data.membershipTypeId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        setError(null);
    };

    const onSubmit = async (formData: EnrollmentData) => {
        setLoading(true);
        try {
            const response = await approveEnrollment(formData.userId, formData);
            handleClose();
            return response;
        } catch (err: any) {
            setError(err.response?.data || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return {
        open,
        register,
        handleClose,
        handleSubmit: handleSubmit(onSubmit),
        handleOpen,
        loading,
        approveError,
    };
};

export default useApproveEnrollment;