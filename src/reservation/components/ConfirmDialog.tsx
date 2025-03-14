import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useConfirmReservation from '../hooks/confirmReservation';
import { AxiosError } from 'axios';

interface ConfirmDialogProps {
  open: boolean;
  reservationId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  reservationId,
  onClose,
  onSuccess
}) => {
  // Mutation hook for confirming reservation
  const confirmReservation = useConfirmReservation(reservationId || '');
  
  // Handle confirming the reservation
  const handleConfirmReservation = () => {
    if (reservationId) {
      confirmReservation.mutate(undefined, {
        onSuccess: () => {
          // Refetch the data after successful confirmation
          onSuccess();
          onClose();
        }
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Confirm Reservation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to confirm this reservation?
        </Typography>
        {confirmReservation.isPending && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {confirmReservation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {(confirmReservation.error as AxiosError)?.message || "An error occurred"}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="primary"
          disabled={confirmReservation.isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirmReservation} 
          color="primary" 
          variant="contained"
          startIcon={<CheckCircleIcon />}
          disabled={confirmReservation.isPending}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;