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
import CancelIcon from '@mui/icons-material/Cancel';
import useCancelReservation from '../hooks/cancelReservation';
import { AxiosError } from 'axios';

interface CancelDialogProps {
  open: boolean;
  reservationId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CancelDialog: React.FC<CancelDialogProps> = ({
  open,
  reservationId,
  onClose,
  onSuccess
}) => {
  // Mutation hook for cancelling reservation
  const cancelReservation = useCancelReservation(reservationId || '');
  
  // Handle cancelling the reservation
  const handleCancelReservation = () => {
    if (reservationId) {
      cancelReservation.mutate(undefined, {
        onSuccess: () => {
          // Refetch the data after successful cancellation
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
      <DialogTitle>Cancel Reservation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to cancel this reservation?
        </Typography>
        {cancelReservation.isPending && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {cancelReservation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {(cancelReservation.error as AxiosError)?.message || "An error occurred"}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="primary"
          disabled={cancelReservation.isPending}
        >
          Back
        </Button>
        <Button 
          onClick={handleCancelReservation} 
          color="error" 
          variant="contained"
          startIcon={<CancelIcon />}
          disabled={cancelReservation.isPending}
        >
          Cancel Reservation
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;